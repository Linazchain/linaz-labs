import { SuiJsonRpcClient, getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc'
import { Transaction } from '@mysten/sui/transactions'

const client = new SuiJsonRpcClient({ url: getJsonRpcFullnodeUrl('testnet'), network: 'testnet' })

interface ActiveWindow {
  windowId:   string
  closesAt:   number
  amount:     number
  originator: string
}

const activeWindows: ActiveWindow[] = []

export function registerWindow(window: ActiveWindow) {
  activeWindows.push(window)
}

export function startMonitor(signer: any) {
  setInterval(async () => {
    const now = Date.now()
    for (const window of [...activeWindows]) {
      if (now >= window.closesAt) {
        await triggerReversal(window, signer)
      }
    }
  }, 5000)
}

async function triggerReversal(window: ActiveWindow, signer: any) {
  try {
    const windowObject = await client.getObject({
      id:      window.windowId,
      options: { showContent: true }
    })

    if (!windowObject.data) {
      console.error(`Window object not found: ${window.windowId}`)
      return
    }

    const tx = new Transaction()
    tx.moveCall({
      target:    `${process.env.PACKAGE_ID}::challenge_window::reverse`,
      arguments: [tx.object(window.windowId)]
    })

    await client.executeTransactionBlock({
      transactionBlock: await tx.build({ client: client as any }),
      signature:        [],
      options:          { showEffects: true }
    })

    activeWindows.splice(activeWindows.indexOf(window), 1)
    console.log(`REVERSAL_TRIGGERED:${window.windowId}`)
  } catch (e) {
    console.error(`Reversal failed for ${window.windowId}:`, e)
  }
}
