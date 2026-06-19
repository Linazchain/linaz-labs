import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc';
import { Transaction } from '@mysten/sui/transactions'
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'

export const suiClient = new SuiJsonRpcClient({ 
  url: getJsonRpcFullnodeUrl('testnet'),
  network: 'testnet' // Required in v2 SDK
});

export const escrowKeypair = Ed25519Keypair.deriveKeypair(
  import.meta.env.VITE_ESCROW_MNEMONIC
)
export const escrowAddress = escrowKeypair.getPublicKey().toSuiAddress()

// Originator's wallet sends `amount` SUI to escrow — locking it during the challenge window
export async function lockFunds(
  signAndExecute: any,
  amountSui: number
): Promise<string> {
  const tx = new Transaction()
  const [coin] = tx.splitCoins(tx.gas, [Math.floor(amountSui * 1_000_000_000)])
  tx.transferObjects([coin], escrowAddress)

  const result = await signAndExecute({ transaction: tx })
  return result.digest
}

// Escrow sends the SUI back to the originator — the reversal
export async function reverseFunds(
  originatorAddress: string,
  amountSui: number
): Promise<string> {
  const tx = new Transaction()
  const [coin] = tx.splitCoins(tx.gas, [Math.floor(amountSui * 1_000_000_000)])
  tx.transferObjects([coin], originatorAddress)
  tx.setSender(escrowAddress)

  const built = await tx.build({ client: suiClient })
  const { signature } = await escrowKeypair.signTransaction(built)
  const result = await suiClient.executeTransactionBlock({
    transactionBlock: built,
    signature,
    options: { showEffects: true }
  })
  return result.digest
}
