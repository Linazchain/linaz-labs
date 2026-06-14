import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc'
import { Transaction } from '@mysten/sui/transactions'
import { CompiledIntent } from '../compiler/intentCompiler'

const client = new SuiJsonRpcClient({ url: getJsonRpcFullnodeUrl('testnet'), network: 'testnet' })

export interface ChallengeWindowData {
  windowId: string
  opensAt:  number
  closesAt: number
  duration: number
}

export interface SolverResult {
  success:         boolean
  transactionHash: string
  executionTime:   number
  gasUsed:         number
  challengeWindow: ChallengeWindowData
}

export async function solveIntent(
  intent: CompiledIntent,
  signer: any
): Promise<SolverResult> {
  const startTime = Date.now()
  const tx        = new Transaction()

  tx.moveCall({
    target:    `${process.env.PACKAGE_ID}::challenge_window::open_window`,
    arguments: [
      tx.pure.address(intent.originator),
      tx.pure.u64(intent.amount),
      tx.pure.address(intent.originator),
      tx.pure.address(intent.recipient),
      tx.pure.u64(600),
    ]
  })

  tx.moveCall({
    target:    `${process.env.PACKAGE_ID}::intent_registry::create_intent`,
    arguments: [
      tx.pure.address(intent.originator),
      tx.pure.u64(intent.amount),
      tx.pure.address(intent.recipient),
      tx.pure.u64(intent.expiry),
    ]
  })

  const result = await client.executeTransactionBlock({
    transactionBlock: await tx.build({ client: client as any }),
    signature:        [],
    options:          { showEffects: true, showEvents: true }
  })

  return {
    success:         result.effects?.status.status === 'success',
    transactionHash: result.digest,
    executionTime:   Date.now() - startTime,
    gasUsed:         Number(result.effects?.gasUsed?.computationCost ?? 0),
    challengeWindow: {
      windowId: result.digest,
      opensAt:  Date.now(),
      closesAt: Date.now() + 600000,
      duration: 600,
    }
  }
}
