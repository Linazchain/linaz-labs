import { ConnectButton } from '@mysten/dapp-kit'
import { motion } from 'framer-motion'

export default function WalletConnect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="absolute top-5 right-5"
    >
      <ConnectButton />
    </motion.div>
  )
}
