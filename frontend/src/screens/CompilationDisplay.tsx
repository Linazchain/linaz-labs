import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CompiledIntent } from '../../../backend/src/compiler/intentCompiler'
import IntentSchema from '../components/IntentSchema'

interface Props {
  intent:     CompiledIntent
  onContinue: () => void
}

export default function CompilationDisplay({ intent, onContinue }: Props) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 2400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="min-h-screen flex">
      {/* Left — raw text */}
      <div className="w-1/2 flex items-center justify-center p-12 border-r border-zinc-900">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-zinc-400 text-lg leading-relaxed"
        >
          "{intent.rawText}"
        </motion.p>
      </div>

      {/* Right — compiled schema */}
      <div className="w-1/2 flex items-start justify-start p-12 pt-20">
        <div className="w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-zinc-500 uppercase tracking-widest text-xs mb-8"
          >
            Intent Compiling...
          </motion.p>
          <IntentSchema intent={intent} step={step} />
          <AnimatePresence>
            {step >= 4 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onContinue}
                className="mt-10 px-6 py-2 border border-zinc-600 text-zinc-300 uppercase tracking-widest text-xs hover:border-white hover:text-white transition-colors"
              >
                Activate Solver →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
