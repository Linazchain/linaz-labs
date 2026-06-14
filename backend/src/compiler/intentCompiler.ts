import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model  = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export interface Condition {
  type:  'confirmation' | 'time' | 'proof'
  value: string | number
}

export interface Objective {
  primary:   'speed' | 'cost' | 'safety'
  secondary: 'speed' | 'cost' | 'safety'
}

export interface CompiledIntent {
  originator: string
  recipient:  string
  amount:     number
  currency:   string
  conditions: Condition[]
  objective:  Objective
  expiry:     number
  rawText:    string
}

export async function compileIntent(
  rawText:           string,
  originatorAddress: string
): Promise<CompiledIntent> {
  const prompt = `
    You are an intent compiler for a financial execution network.
    Convert this plain language intent into a structured JSON schema.
    Return ONLY valid JSON. No explanation. No markdown. No backticks.

    Input: "${rawText}"
    Originator address: "${originatorAddress}"

    Return this exact structure:
    {
      "originator": "address",
      "recipient":  "contact_name_or_address",
      "amount":     number,
      "currency":   "SUI",
      "conditions": [
        { "type": "confirmation", "value": "recipient_name" },
        { "type": "time",         "value": seconds_as_number }
      ],
      "objective": {
        "primary":   "safety",
        "secondary": "speed"
      },
      "expiry":  unix_timestamp,
      "rawText": "original input"
    }
  `

  const result = await model.generateContent(prompt)
  const text   = result.response.text().trim()

  try {
    return JSON.parse(text) as CompiledIntent
  } catch {
    throw new Error(`Intent compilation failed: ${text}`)
  }
}
