import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui/client'
import IntentInput        from './screens/IntentInput'
import CompilationDisplay from './screens/CompilationDisplay'
import SolverExecution    from './screens/SolverExecution'
import ReversalMoment     from './screens/ReversalMoment'
import { CompiledIntent } from '../../backend/src/compiler/intentCompiler'

export type Screen = 'input' | 'compile' | 'execute' | 'reversal'

export interface SolverResult {
  success:         boolean
  transactionHash: string
  executionTime:   number
  gasUsed:         number
  challengeWindow: { windowId: string; opensAt: number; closesAt: number; duration: number }
}

const queryClient = new QueryClient()
const networks = { testnet: { url: getFullnodeUrl('testnet') } }

export default function App() {
  const [screen,  setScreen]  = useState<Screen>('input')
  const [intent,  setIntent]  = useState<CompiledIntent | null>(null)
  const [result,  setResult]  = useState<SolverResult | null>(null)

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <div className="min-h-screen bg-black text-white font-mono">
            {screen === 'input'   && (
              <IntentInput onCompiled={(i) => { setIntent(i); setScreen('compile') }} />
            )}
            {screen === 'compile' && intent && (
              <CompilationDisplay intent={intent} onContinue={() => setScreen('execute')} />
            )}
            {screen === 'execute' && intent && (
              <SolverExecution intent={intent} onResult={(r) => { setResult(r); setScreen('reversal') }} />
            )}
            {screen === 'reversal' && result && (
              <ReversalMoment result={result} onReset={() => setScreen('input')} />
            )}
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}
