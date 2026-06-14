import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SolverResult } from '../App'

interface Props {
  result:  SolverResult
  onReset: () => void
}

export default function ReversalMoment({ result, onReset }: Props) {
  const [phase, setPhase] = useState<'pause' | 'label' | 'arc' | 'complete'>('pause')
  const reversed = !result.success

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('label'),    1000)
    const t2 = setTimeout(() => setPhase('arc'),      2500)
    const t3 = setTimeout(() => setPhase('complete'), 4500)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <AnimatePresence mode="wait">

        {phase === 'pause' && (
          <motion.div key="pause" exit={{ opacity: 0 }} className="w-2 h-2 bg-zinc-700 rounded-full" />
        )}

        {phase !== 'pause' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8 max-w-md"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`uppercase tracking-widest text-sm ${reversed ? 'text-red-400' : 'text-green-400'}`}
            >
              {reversed ? 'Conditions Not Met' : 'Conditions Met'}
            </motion.p>

            {phase === 'arc' || phase === 'complete' ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-zinc-400"
              >
                {reversed ? '10 SUI returning to origin...' : 'Funds released to recipient.'}
              </motion.p>
            ) : null}

            {(phase === 'arc' || phase === 'complete') && reversed && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="w-full h-px bg-gradient-to-r from-red-900 via-red-400 to-transparent origin-right"
              />
            )}

            {phase === 'complete' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-white text-lg">Complete</p>
                <p className="text-zinc-500 text-sm">
                  {reversed
                    ? `10 SUI returned to ${result.transactionHash.slice(0, 8)}...`
                    : `Funds delivered. ${result.transactionHash.slice(0, 8)}...`}
                </p>
                
                  href={`https://suiexplorer.com/txblock/${result.transactionHash}?network=testnet`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-zinc-600 text-xs hover:text-white"
                >
                  View on Sui Explorer ↗
                </a>
                <p className="text-zinc-600 text-xs mt-8 leading-relaxed">
                  No loss. No intervention. No customer service.<br />
                  Just the terms you set.
                </p>
                <button
                  onClick={onReset}
                  className="mt-6 px-6 py-2 border border-zinc-800 text-zinc-600 uppercase tracking-widest text-xs hover:border-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  New Intent
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}
