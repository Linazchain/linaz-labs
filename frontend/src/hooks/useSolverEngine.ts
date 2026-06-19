import { useState } from 'react'
import { CompiledIntent } from '../App'
import { SolverResult }   from '../App'

export function useSolverEngine() {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function solve(intent: CompiledIntent): Promise<SolverResult | null> {
    setLoading(true); setError(null)
    try {
      const res = await fetch('http://localhost:3001/solve', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intent })
      })
      return await res.json()
    } catch (e: any) {
      setError(e.message); return null
    } finally {
      setLoading(false)
    }
  }

  return { solve, loading, error }
}
