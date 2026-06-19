import 'dotenv/config'
import express from 'express'
import cors    from 'cors'
import { compileIntent } from './compiler/intentCompiler'
import { solveIntent }   from './solver/solverEngine'

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())

app.post('/compile', async (req, res) => {
  try {
    const { rawText, originatorAddress } = req.body
    const intent = await compileIntent(rawText, originatorAddress)
    res.json(intent)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/solve', async (req, res) => {
  try {
    const { intent } = req.body
    const result = await solveIntent(intent, null)
    res.json(result)
  } catch (e: any) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(3001, () => console.log('Linaz backend running on :3001'))
