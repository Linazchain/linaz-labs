import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import IntentInput        from './screens/IntentInput'
import CompilationDisplay from './screens/CompilationDisplay'
import SolverExecution    from './screens/SolverExecution'
import ReversalMoment     from './screens/ReversalMoment'
import BalanceCard        from './components/BalanceCard'

export type Screen = 'input' | 'compile' | 'execute' | 'reversal'

export interface CompiledIntent {
  originator: string
  recipient:  string
  amount:     number
  currency:   string
  conditions: { type: string; value: string | number }[]
  objective:  { primary: string; secondary: string }
  expiry:     number
  rawText:    string
}

export interface SolverResult {
  success:         boolean
  transactionHash: string
  executionTime:   number
  gasUsed:         number
  challengeWindow: { windowId: string; opensAt: number; closesAt: number; duration: number }
}

const queryClient = new QueryClient()
const networks    = { testnet: { url: 'https://fullnode.testnet.sui.io' } }

export default function App() {
  const [screen, setScreen]         = useState<Screen>('input')
  const [intent, setIntent]         = useState<CompiledIntent | null>(null)
  const [result, setResult]         = useState<SolverResult | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  function bumpBalance() {
    // small delay lets the testnet finalize the tx before we refetch
    setTimeout(() => setRefreshKey((k) => k + 1), 1500)
  }

  function reset() {
    setScreen('input')
    setIntent(null)
    setResult(null)
    setRefreshKey((k) => k + 1)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="testnet">
        <WalletProvider>
          <div className="min-h-screen bg-cream">
            <div className="px-6 pt-6 max-w-md mx-auto">
              <BalanceCard refreshKey={refreshKey} />
            </div>

            {screen === 'input' && (
              <IntentInput onCompiled={(i) => { setIntent(i); setScreen('compile') }} />
            )}
            {screen === 'compile' && intent && (
              <CompilationDisplay intent={intent} onContinue={() => setScreen('execute')} />
            )}
            {screen === 'execute' && intent && (
              <SolverExecution
                intent={intent}
                onResult={(r) => {
                  bumpBalance()
                  setResult(r)
                  setScreen('reversal')
                }}
              />
            )}
            {screen === 'reversal' && result && (
              <ReversalMoment
                result={result}
                onReversed={bumpBalance}
                onReset={reset}
              />
            )}
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}
