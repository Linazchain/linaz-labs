import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props { closesAt: number }

export default function ChallengeTimer({ closesAt }: Props) {
  const total = 600000
  const [remaining, setRemaining] = useState(Math.max(0, closesAt - Date.now()))

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.max(0, closesAt - Date.now()))
    }, 1000)
    return () => clearInterval(interval)
  }, [closesAt])

  const pct  = remaining / total
  const mins = String(Math.floor(remaining / 60000)).padStart(2, '0')
  const secs = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0')
  const circumference = 2 * Math.PI * 40

  return (
    <div className="bg-surface rounded-card shadow-card p-5 flex items-center gap-6">
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" fill="none" stroke="#E8E4DC" strokeWidth="6" />
          <motion.circle
            cx="48" cy="48" r="40"
            fill="none"
            stroke={remaining > 60000 ? '#C97B4B' : '#ef4444'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference * (1 - pct) }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-lg font-medium text-textPri">{mins}:{secs}</span>
        </div>
      </div>
      <div>
        <p className="text-textMuted text-xs uppercase tracking-widest font-mono mb-1">Challenge Window</p>
        <p className="text-textSec text-sm">
          {remaining > 0 ? 'Waiting for confirmation...' : 'Window closed'}
        </p>
      </div>
    </div>
  )
}
