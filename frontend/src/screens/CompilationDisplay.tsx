import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CompiledIntent } from '../App'
import IntentSchema from '../components/IntentSchema'

interface Props {
  intent: CompiledIntent
  onContinue: () => void
}

export default function CompilationDisplay({ intent, onContinue }: Props) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1600),
      setTimeout(() => setStep(4), 2200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="min-h-screen bg-cream flex flex-col px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md mx-auto"
      >
        <p className="text-textMuted text-xs uppercase tracking-widest mb-2 font-mono">
          Compiling intent
        </p>
        <div className="bg-surface rounded-card shadow-card p-5 mb-6">
          <p className="text-textSec text-base leading-relaxed">
            "{intent.rawText}"
          </p>
        </div>

        <IntentSchema intent={intent} step={step} />

        <AnimatePresence>
          {step >= 4 && (
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={onContinue}
              className="w-full py-4 bg-terra text-white font-sans font-medium rounded-btn shadow-warm mt-6 text-base"
              style={{ minHeight: '56px' }}
            >
              Activate Solver
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
