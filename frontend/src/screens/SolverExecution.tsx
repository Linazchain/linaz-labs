import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CompiledIntent } from '../../../backend/src/compiler/intentCompiler'
import { SolverResult }   from '../App'
import ChallengeTimer     from '../components/ChallengeTimer'

interface Props {
  intent:   CompiledIntent
  onResult: (result: SolverResult) => void
}

export default function SolverExecution({ intent, onResult }: Props) {
  const [progress,  setProgress]  = useState(0)
  const [result,    setResult]    = useState<SolverResult | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 4
      })
    }, 80)

    setTimeout(async () => {
      const res = await fetch('http://localhost:3001/solve', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ intent })
      })
      const data = await res.json()
      setResult(data)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  function handleConfirm() {
    setConfirmed(true)
    if (result) onResult(result)
  }

  function handleReverse() {
    if (result) onResult({ ...result, success: false })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-lg">
        <p className="text-zinc-500 uppercase tracking-widest text-xs mb-8">Solver Activated</p>
        <p className="text-zinc-400 mb-8">Racing to find optimal path...</p>

        {/* Progress bar */}
        <div className="w-full h-px bg-zinc-800 mb-2">
          <motion.div
            className="h-px bg-white"
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
        <div className="flex justify-between text-zinc-600 text-xs mb-10">
          <span>Origin</span>
          <span>Destination</span>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="border border-zinc-800 p-4 space-y-2">
              <p className="text-zinc-500 text-xs uppercase tracking-widest">Transaction</p>
              <p className="text-white text-sm">{result.transactionHash}</p>
              
                href={`https://suiexplorer.com/txblock/${result.transactionHash}?network=testnet`}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-500 text-xs hover:text-white"
              >
                View on Sui Explorer ↗
              </a>
            </div>

            <ChallengeTimer closesAt={result.challengeWindow.closesAt} />

            <div className="flex gap-4">
              <button
                onClick={handleConfirm}
                disabled={confirmed}
                className="flex-1 py-3 border border-zinc-600 text-zinc-300 uppercase tracking-widest text-xs hover:border-white hover:text-white transition-colors disabled:opacity-30"
              >
                Confirm Receipt
              </button>
              <button
                onClick={handleReverse}
                className="flex-1 py-3 border border-zinc-800 text-zinc-600 uppercase tracking-widest text-xs hover:border-red-900 hover:text-red-400 transition-colors"
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
