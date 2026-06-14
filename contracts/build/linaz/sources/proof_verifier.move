module linaz::proof_verifier {
    use sui::clock::{Self, Clock};

    const ENotVerifier: u64 = 0;

    public struct Proof has key {
        id:         UID,
        intent_id:  address,
        proof_type: u8,
        verified:   bool,
        timestamp:  u64,
        verifier:   address,
    }

    public fun submit_proof(
        intent_id:  address,
        proof_type: u8,
        clock:      &Clock,
        ctx:        &mut TxContext
    ) {
        let proof = Proof {
            id:         object::new(ctx),
            intent_id,
            proof_type,
            verified:   false,
            timestamp:  clock::timestamp_ms(clock),
            verifier:   tx_context::sender(ctx),
        };
        transfer::share_object(proof);
    }

    public fun verify(proof: &mut Proof, ctx: &mut TxContext): bool {
        assert!(tx_context::sender(ctx) == proof.verifier, ENotVerifier);
        proof.verified = true;
        true
    }
}
