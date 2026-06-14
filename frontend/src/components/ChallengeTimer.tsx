import { useEffect, useState } from 'react'
import { motion }              from 'framer-motion'

interface Props { closesAt: number }

export default function ChallengeTimer({ closesAt }: Props) {
  const [remaining, setRemaining] = useState(closesAt - Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, closesAt - Date.now()))
    }, 1000)
    return () => clearInterval(interval)
  }, [closesAt])

  const total   = 600000
  const pct     = Math.max(0, remaining / total)
  const mins    = String(Math.floor(remaining / 60000)).padStart(2, '0')
  const secs    = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0')

  return (
    <div className="border border-zinc-800 p-4">
      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">Challenge Window Open</p>
      <p className="text-white text-2xl mb-3">{mins}:{secs}</p>
      <div className="w-full h-px bg-zinc-800">
        <motion.div
          className="h-px bg-zinc-400"
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />
      </div>
    </div>
  )
}
