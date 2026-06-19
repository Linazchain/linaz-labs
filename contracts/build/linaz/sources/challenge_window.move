module linaz::challenge_window {
    use sui::clock::{Self, Clock};

    const EAlreadyReversed:  u64 = 0;
    const EAlreadyConfirmed: u64 = 1;
    const EAlreadyConfirmed2: u64 = 2;
    const EAlreadyReversed2: u64 = 3;

    public struct ChallengeWindow has key {
        id:         UID,
        intent_id:  address,
        amount:     u64,
        originator: address,
        recipient:  address,
        opens_at:   u64,
        closes_at:  u64,
        confirmed:  bool,
        reversed:   bool,
    }

    public fun open_window(
        intent_id:  address,
        amount:     u64,
        originator: address,
        recipient:  address,
        duration:   u64,
        clock:      &Clock,
        ctx:        &mut TxContext
    ) {
        let now = clock::timestamp_ms(clock);
        let window = ChallengeWindow {
            id: object::new(ctx),
            intent_id,
            amount,
            originator,
            recipient,
            opens_at:  now,
            closes_at: now + duration,
            confirmed: false,
            reversed:  false,
        };
        transfer::share_object(window);
    }

    public fun confirm(window: &mut ChallengeWindow, _ctx: &mut TxContext) {
        assert!(!window.reversed,  EAlreadyReversed);
        assert!(!window.confirmed, EAlreadyConfirmed);
        window.confirmed = true;
    }

    public fun reverse(window: &mut ChallengeWindow, _ctx: &mut TxContext) {
        assert!(!window.confirmed, EAlreadyConfirmed2);
        assert!(!window.reversed,  EAlreadyReversed2);
        window.reversed = true;
    }

    public fun check_expiry(window: &mut ChallengeWindow, clock: &Clock, ctx: &mut TxContext) {
        if (clock::timestamp_ms(clock) >= window.closes_at && !window.confirmed) {
            reverse(window, ctx);
        }
    }
}
