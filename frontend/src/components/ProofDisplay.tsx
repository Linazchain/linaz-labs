import { motion } from 'framer-motion'

interface Props {
  transactionHash: string
  verified:        boolean
}

export default function ProofDisplay({ transactionHash, verified }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border border-zinc-800 p-4 space-y-2"
    >
      <p className="text-zinc-500 text-xs uppercase tracking-widest">On-Chain Proof</p>
      <p className="text-white text-sm break-all">{transactionHash}</p>
      <p className={`text-xs uppercase tracking-widest ${verified ? 'text-green-400' : 'text-zinc-600'}`}>
        {verified ? '✦ Verified' : 'Pending verification...'}
      </p>
    </motion.div>
  )
}
