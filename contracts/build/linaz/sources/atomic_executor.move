module linaz::atomic_executor {
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;

    public struct ExecutionStep has store {
        step_type: u8,
        target:    address,
        amount:    u64,
        completed: bool,
    }

    public struct StateSnapshot has store {
        block_number:   u64,
        originator_bal: u64,
        recipient_bal:  u64,
    }

    public struct ExecutionBundle has key {
        id:        UID,
        intent_id: address,
        steps:     vector<ExecutionStep>,
        snapshot:  StateSnapshot,
        status:    u8,
    }

    public fun execute(
        bundle:    &mut ExecutionBundle,
        coin:      Coin<SUI>,
        recipient: address,
        _ctx:      &mut TxContext
    ): bool {
        let amount = coin::value(&coin);
        if (amount == 0) {
            coin::destroy_zero(coin);
            bundle.status = 3;
            return false
        };
        transfer::public_transfer(coin, recipient);
        bundle.status = 1;
        true
    }

    public fun rollback(
        bundle:     &mut ExecutionBundle,
        coin:       Coin<SUI>,
        originator: address,
        _ctx:       &mut TxContext
    ) {
        transfer::public_transfer(coin, originator);
        bundle.status = 3;
    }
}
