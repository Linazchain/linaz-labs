import { useCurrentAccount, useConnectWallet, useDisconnectWallet } from '@mysten/dapp-kit'

export function useSuiWallet() {
  const account    = useCurrentAccount()
  const { mutate: connect }    = useConnectWallet()
  const { mutate: disconnect } = useDisconnectWallet()
  return { account, address: account?.address ?? null, connect, disconnect }
}
