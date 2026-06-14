module linaz::intent_registry {
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};
    use sui::clock::{Self, Clock};
    use sui::transfer;
    const EInvalidAmount: u64 = 0;
    const EInvalidExpiry: u64 = 1;
    public struct Condition has store {
        condition_type: u8,      // 0=confirmation 1=time 2=proof
        value:          u64,
        satisfied:      bool,
    }
    public struct Objective has store {
        primary:    u8,          // 0=speed 1=cost 2=safety
        secondary:  u8,
    }
    public struct Intent has key, store {
        id:           UID,
        originator:   address,
        amount:       u64,
        recipient:    address,
        conditions:   vector<Condition>,
        objective:    Objective,
        status:       u8,        // 0=pending 1=active 2=complete 3=reversed
        expiry:       u64,
        created_at:   u64,
    }
    public fun create_intent(
        originator:  address,
        amount:      u64,
        recipient:   address,
        expiry:      u64,
        conditions:  vector<Condition>,
        objective:   Objective,
        clock:       &Clock,
        ctx:         &mut TxContext
    ) {
        let current_time = clock::timestamp_ms(clock);
        assert!(amount > 0, EInvalidAmount);
        assert!(expiry > current_time, EInvalidExpiry);
        let intent = Intent {
            id: object::new(ctx),
            originator,
            amount,
            recipient,
            conditions,
            objective,
            status: 0,
            expiry,
            created_at: current_time,
        };
        transfer::share_object(intent);
    }
    public fun get_intent_status(intent: &Intent): u8 {
        intent.status
    }
    public fun update_status(intent: &mut Intent, status: u8) {
        intent.status = status;
    }
}
