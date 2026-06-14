# Linaz

Intent and outcome execution on Sui. Express a goal in plain language. The system compiles it, executes it atomically, and reverses it automatically if conditions are not met.

## Stack
- Frontend: React + TypeScript + Tailwind + Framer Motion
- Contracts: Move on Sui testnet
- Backend: Node.js + TypeScript + Claude API

## Quick Start

### Contracts
\`\`\`bash
cd contracts && sui move build && sui move publish
\`\`\`

### Backend
\`\`\`bash
cd backend && npm install && npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend && npm install && npm run dev
\`\`\`

## The One Rule
Every decision goes through one filter: **does this make the reversal moment more powerful?**
