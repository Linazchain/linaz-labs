import { ConnectButton } from '@mysten/dapp-kit'
import { motion }        from 'framer-motion'

export default function WalletConnect() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-6 right-6"
    >
      <ConnectButton />
    </motion.div>
  )
}
