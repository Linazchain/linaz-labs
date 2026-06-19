import { motion } from 'framer-motion'
import { CompiledIntent } from '../App'

interface Props { intent: CompiledIntent; step: number }

function SchemaCard({ label, value, visible }: { label: string; value: string; visible: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.5 }}
      className="bg-surface rounded-card shadow-card p-4 flex items-center gap-4 border-l-4 border-terra"
    >
      <div>
        <p className="text-textMuted text-xs uppercase tracking-widest font-mono mb-1">{label}</p>
        <p className="text-textPri text-sm font-medium">{value}</p>
      </div>
    </motion.div>
  )
}

export default function IntentSchema({ intent, step }: Props) {
  const timeCondition = intent.conditions.find(c => c.type === 'time')
  return (
    <div className="space-y-3">
      <SchemaCard label="Asset"       value={intent.amount + ' ' + intent.currency}              visible={step >= 2} />
      <SchemaCard label="Recipient"   value={intent.recipient}                                   visible={step >= 2} />
      <SchemaCard label="Window"      value={(timeCondition?.value ?? 600) + 's challenge window'} visible={step >= 3} />
      <SchemaCard label="Objective"   value={intent.objective.primary + ' first'}                visible={step >= 3} />
      <SchemaCard label="Proof type"  value="Recipient confirmation"                             visible={step >= 4} />
    </div>
  )
}
