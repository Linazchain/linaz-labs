import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrentAccount } from '@mysten/dapp-kit'
import type { SolverResult } from '../App'
import { reverseFunds } from '../lib/chain'

interface Props {
  result: SolverResult
  onReversed: () => void
  onReset: () => void
}

export default function ReversalMoment({ result, onReversed, onReset }: Props) {
  const account = useCurrentAccount()
  const [phase, setPhase] = useState<'pause' | 'label' | 'arc' | 'complete'>('pause')
  const [reverseHash, setReverseHash] = useState<string | null>(null)
  const [error, setError] = useState('')

  const reversed = !result.success

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('label'), 1000)
    const t2 = setTimeout(async () => {
      setPhase('arc')
      if (reversed && account?.address) {
        try {
          const digest = await reverseFunds(account.address, 0.5)
          setReverseHash(digest)
          onReversed()
        } catch (e: any) {
          setError(e?.message || 'Reversal failed')
        }
      } else if (reversed) {
        onReversed()
      }
    }, 2500)
    const t3 = setTimeout(() => setPhase('complete'), 5000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [account, reversed, onReversed])

  const finalHash = reverseHash || result.transactionHash
  const explorerUrl = 'https://suiscan.xyz/testnet/tx/' + finalHash

  return (
    <div className="w-full max-w-md mx-auto px-6 pt-8 pb-12 flex flex-col items-center justify-center text-center">
      <AnimatePresence mode="wait">
        {phase === 'pause' && (
          <motion.div
            key="pause"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="w-3 h-3 rounded-full bg-textMuted"
          />
        )}

        {phase !== 'pause' && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm space-y-8"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={
                'font-mono text-xs uppercase tracking-widest ' +
                (reversed ? 'text-red-400' : 'text-success')
              }
            >
              {reversed ? 'Conditions Not Met' : 'Conditions Met'}
            </motion.p>

            {phase === 'arc' || phase === 'complete' ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="font-display text-3xl font-bold text-textPri"
              >
                {reversed ? 'SUI returning on-chain.' : 'Funds released.'}
              </motion.p>
            ) : null}

            {error ? (
              <p className="text-red-400 text-xs font-mono break-all">{error}</p>
            ) : null}

            {(phase === 'arc' || phase === 'complete') && reversed ? (
              <div className="relative h-16 flex items-center justify-center">
                <motion.div
                  initial={{ scaleX: 0, originX: 1 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  className="w-full h-0.5 bg-gradient-to-l from-red-400 to-transparent"
                />
                <motion.div
                  initial={{ x: 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  className="absolute right-0 w-3 h-3 rounded-full bg-red-400"
                />
              </div>
            ) : null}

            {phase === 'complete' ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="bg-surface rounded-card shadow-card p-5 text-left">
                  <p className="text-textMuted text-xs uppercase tracking-widest mb-2 font-mono">
                    {reversed ? 'Reversal Transaction' : 'Complete'}
                  </p>
                  <p className="text-textSec text-sm font-mono break-all mb-3">
                    {finalHash.slice(0, 24)}...
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

                <p className="text-textMuted text-sm leading-relaxed">
                  No loss. No intervention. No customer service.
                  <br />
                  <span className="text-textSec font-medium">Just the terms you set.</span>
                </p>

                <button
                  onClick={onReset}
                  className="w-full py-4 bg-surface border border-border text-textSec font-medium rounded-btn text-sm hover:border-terra hover:text-terra transition-colors"
                  style={{ minHeight: '56px' }}
                >
                  New Intent
                </button>
              </motion.div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
