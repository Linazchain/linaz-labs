import { motion } from 'framer-motion'
import { CompiledIntent } from '../../../backend/src/compiler/intentCompiler'

interface Props { intent: CompiledIntent; step: number }

const Row = ({ label, value, visible }: { label: string; value: string; visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -10 }}
    className="flex gap-4 text-sm mb-2"
  >
    <span className="text-zinc-600 w-24 shrink-0">{label}</span>
    <span className="text-white">{value} <span className="text-zinc-600">✦</span></span>
  </motion.div>
)

export default function IntentSchema({ intent, step }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-zinc-700 text-xs uppercase tracking-widest mb-3">constraints {'{'}</p>
        <div className="pl-4">
          <Row label="asset"    value={`${intent.amount} ${intent.currency}`} visible={step >= 2} />
          <Row label="temporal" value={intent.conditions.find(c => c.type === 'time')?.value + 's' ?? '—'} visible={step >= 2} />
          <Row label="risk"     value="escrow + reversal"                     visible={step >= 3} />
        </div>
        <p className="text-zinc-700 text-xs mt-1">{'}'}</p>
      </div>
      <div>
        <p className="text-zinc-700 text-xs uppercase tracking-widest mb-3">objective {'{'}</p>
        <div className="pl-4">
          <Row label="rank 1" value={intent.objective.primary.toUpperCase()}   visible={step >= 3} />
          <Row label="rank 2" value={intent.objective.secondary.toUpperCase()} visible={step >= 3} />
        </div>
        <p className="text-zinc-700 text-xs mt-1">{'}'}</p>
      </div>
      <div>
        <p className="text-zinc-700 text-xs uppercase tracking-widest mb-3">proof {'{'}</p>
        <div className="pl-4">
          <Row label="type"   value="CONFIRMATION" visible={step >= 4} />
          <Row label="window" value="600s"         visible={step >= 4} />
        </div>
        <p className="text-zinc-700 text-xs mt-1">{'}'}</p>
      </div>
    </div>
  )
}
