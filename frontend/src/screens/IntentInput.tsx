import { useState } from 'react'
import { motion }   from 'framer-motion'
import { CompiledIntent } from '../../../backend/src/compiler/intentCompiler'
import WalletConnect from '../components/WalletConnect'

interface Props {
  onCompiled: (intent: CompiledIntent) => void
}

export default function IntentInput({ onCompiled }: Props) {
  const [text,    setText]    = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/compile', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ rawText: text, originatorAddress: '0x0000' })
      })
      const intent = await res.json()
      onCompiled(intent)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <WalletConnect />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl mt-20"
      >
        <h1 className="text-2xl tracking-widest mb-12 text-center text-zinc-400 uppercase">
          Linaz
        </h1>
        <textarea
          className="w-full bg-transparent border border-zinc-800 rounded-none p-4 text-white text-lg resize-none focus:outline-none focus:border-zinc-500 placeholder-zinc-700 h-36"
          placeholder="Tell Linaz what you want..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="w-full mt-4 py-3 border border-zinc-600 text-zinc-300 uppercase tracking-widest text-sm hover:border-white hover:text-white transition-colors disabled:opacity-30"
        >
          {loading ? 'Compiling...' : 'Execute Intent'}
        </motion.button>
      </motion.div>
    </div>
  )
}
