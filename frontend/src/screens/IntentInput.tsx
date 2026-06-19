import { useState } from 'react'
import { motion } from 'framer-motion'
import { CompiledIntent } from '../App'

interface Props {
  onCompiled: (intent: CompiledIntent) => void
}

// Lightweight local parser — no external API, zero latency, demo-safe
function parseIntent(text: string): CompiledIntent {
  const amountMatch = text.match(/(\d+(\.\d+)?)\s*(SUI|sui)?/)
  const amount = amountMatch ? parseFloat(amountMatch[1]) : 10

  const toMatch = text.match(/to\s+([A-Za-z][A-Za-z\s]*?)(?:\.|,|$)/i)
  const recipient = toMatch ? toMatch[1].trim() : 'recipient'

  const timeMatch = text.match(/(\d+)\s*(minute|min|hour|hr|second|sec)/i)
  let seconds = 600
  if (timeMatch) {
    const n = parseInt(timeMatch[1])
    const unit = timeMatch[2].toLowerCase()
    if (unit.startsWith('hour') || unit === 'hr') seconds = n * 3600
    else if (unit.startsWith('min')) seconds = n * 60
    else seconds = n
  }

  return {
    originator: '0x8a497c379914e6704e5dc613afba9df190c99e79eb0ec0ef50f11eeedc1d6f66',
    recipient,
    amount,
    currency: 'SUI',
    conditions: [
      { type: 'confirmation', value: recipient },
      { type: 'time', value: seconds }
    ],
    objective: { primary: 'safety', secondary: 'speed' },
    expiry: Math.floor(Date.now() / 1000) + 3600,
    rawText: text
  }
}

export default function IntentInput({ onCompiled }: Props) {
  const [text, setText]       = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    if (!text.trim()) return
    setLoading(true)
    // Small delay so the compiling animation feels real
    setTimeout(() => {
      const intent = parseIntent(text)
      setLoading(false)
      onCompiled(intent)
    }, 900)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h1 className="font-display text-4xl font-bold text-textPri mb-2 tracking-tight">
            Linaz
          </h1>
          <p className="text-textSec text-sm mb-12">
            Tell us what you want to happen.
          </p>

          <div className="bg-surface rounded-card shadow-card p-6 mb-4">
            <textarea
              className="w-full bg-transparent text-textPri text-xl font-sans font-light resize-none focus:outline-none placeholder-textMuted leading-relaxed"
              style={{ minHeight: '120px' }}
              placeholder="Send 10 SUI to Mum. Return it if she doesn't confirm in 10 minutes."
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
            className="w-full py-4 bg-terra text-white font-sans font-medium rounded-btn shadow-warm transition-all disabled:opacity-40 text-base"
            style={{ minHeight: '56px' }}
          >
            {loading ? 'Compiling intent...' : 'Execute Intent'}
          </motion.button>

          <p className="text-textMuted text-xs text-center mt-6 leading-relaxed">
            Your intent is compiled on-chain.
            <br />
            Funds return automatically if conditions are not met.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
