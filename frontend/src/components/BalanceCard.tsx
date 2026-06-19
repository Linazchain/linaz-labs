import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit'

interface Props {
  refreshKey: number
}

export default function BalanceCard({ refreshKey }: Props) {
  const account = useCurrentAccount()
  const client  = useSuiClient()
  const [balance, setBalance]   = useState<number | null>(null)
  const [loading, setLoading]   = useState(false)

  async function fetchBalance() {
    if (!account?.address) return
    setLoading(true)
    try {
      const res = await client.getBalance({ owner: account.address })
      setBalance(Number(res.totalBalance) / 1_000_000_000)
    } catch (e) {
      console.error('balance fetch failed', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBalance()
  }, [account?.address, refreshKey])

  if (!account) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-surface rounded-card shadow-card px-5 py-4"
      >
        <p className="text-textMuted text-xs uppercase tracking-widest font-mono mb-1">
          Wallet Balance
        </p>
        <p className="text-textSec text-sm">Connect a wallet to see live balance</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-surface rounded-card shadow-card px-5 py-4 flex items-center justify-between"
    >
      <div>
        <p className="text-textMuted text-xs uppercase tracking-widest font-mono mb-1">
          Wallet Balance — Testnet
        </p>
        <motion.p
          key={balance ?? 0}
          initial={{ opacity: 0.4, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-2xl font-medium text-textPri"
        >
          {loading || balance === null ? '...' : balance.toFixed(4)}{' '}
          <span className="text-textMuted text-sm">SUI</span>
        </motion.p>
      </div>
      <button
        onClick={fetchBalance}
        className="w-2 h-2 rounded-full bg-success"
        aria-label="refresh balance"
      />
    </motion.div>
  )
}
