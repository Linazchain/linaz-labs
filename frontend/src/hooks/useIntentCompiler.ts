import { useState } from 'react'
import { CompiledIntent } from '../../../backend/src/compiler/intentCompiler'

export function useIntentCompiler() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function compile(rawText: string, originatorAddress: string): Promise<CompiledIntent | null> {
    setLoading(true); setError(null)
    try {
      const res = await fetch('http://localhost:3001/compile', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, originatorAddress })
      })
      return await res.json()
    } catch (e: any) {
      setError(e.message); return null
    } finally {
      setLoading(false)
    }
  }

  return { compile, loading, error }
}
