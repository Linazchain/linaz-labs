import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import type { CompiledIntent, SolverResult } from '../App'
import ChallengeTimer from '../components/ChallengeTimer'
import { lockFunds } from '../lib/chain'

interface Props {
  intent: CompiledIntent
  onResult: (result: SolverResult) => void
}

export default function SolverExecution({ intent, onResult }: Props) {
  const account = useCurrentAccount()
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction()
  const [progress, setProgress] = useState(0)
  const [result, setResult]     = useState<SolverResult | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 95 ? p : p + 3))
    }, 80)

    async function run() {
      try {
        if (!account) {
          throw new Error('Connect a wallet first to execute on testnet')
        }

        const digest = await lockFunds(signAndExecute, intent.amount)
        setProgress(100)

        setResult({
          success: true,
          transactionHash: digest,
          executionTime: 2800,
          gasUsed: 1240000,
          challengeWindow: {
            windowId: digest,
            opensAt: Date.now(),
            closesAt: Date.now() + 600000,
            duration: 600,
          },
        })
      } catch (e: any) {
        clearInterval(interval)
        setError(e?.message || 'Transaction failed')
      }
    }

    run()

    return () => clearInterval(interval)
  }, [account, intent.amount, signAndExecute])

  const explorerUrl = result
    ? 'https://suiscan.xyz/testnet/tx/' + result.transactionHash
    : ''

  return (
    <div className="w-full max-w-md mx-auto px-6 pt-8 pb-12 flex flex-col">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <p className="text-textMuted text-xs uppercase tracking-widest mb-2 font-mono">
          Solver activated
        </p>
        <p className="text-textPri text-xl font-display font-bold mb-8">
          Locking funds on testnet...
        </p>

        <div className="bg-surface rounded-card shadow-card p-5 mb-6">
          <div className="flex justify-between text-textMuted text-xs font-mono mb-3">
            <span>Origin</span>
            <span>Challenge Window</span>
          </div>
          <div className="w-full h-1 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-terra rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>
          <p className="text-textMuted text-xs font-mono mt-3 text-right">
            {progress}%
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-xs font-mono break-all mb-4">{error}</p>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-surface rounded-card shadow-card p-5">
              <p className="text-textMuted text-xs uppercase tracking-widest mb-2">
                Transaction
              </p>
              <p className="font-mono text-xs text-textSec break-all mb-2">
                {result.transactionHash}
              </p>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noreferrer"
                className="text-terra text-xs font-medium"
              >
                View on Sui Explorer
              </a>
            </div>

            <ChallengeTimer closesAt={result.challengeWindow.closesAt} />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setConfirmed(true)
                  onResult(result)
                }}
                disabled={confirmed}
                className="flex-1 py-4 bg-terra text-white font-medium rounded-btn shadow-warm text-sm disabled:opacity-40"
                style={{ minHeight: '56px' }}
              >
                Confirm Receipt
              </button>
              <button
                onClick={() => onResult({ ...result, success: false })}
                className="flex-1 py-4 bg-surface text-textSec font-medium rounded-btn border border-border text-sm hover:border-red-300 hover:text-red-500 transition-colors"
                style={{ minHeight: '56px' }}
              >
                Reverse
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
