import { motion } from 'framer-motion'

export default function LandingPage() {
  const statusItems = [
    { name: 'Intent specification language', status: 'done' },
    { name: 'Core data model', status: 'done' },
    { name: 'Constraint taxonomy', status: 'done' },
    { name: 'Objective function model', status: 'done' },
    { name: 'Solver network architecture', status: 'done' },
    { name: 'Programmable asset states', status: 'done' },
    { name: 'Truth and proof system', status: 'done' },
    { name: 'Meta-intent layer', status: 'done' },
    { name: 'Governance model', status: 'done' },
    { name: 'Smart contracts', status: 'pending' },
    { name: 'Testnet deployment', status: 'pending' },
  ]

  const comparisons = [
    { feature: 'General outcome execution', linaz: true, uni: false, cow: false, anoma: false },
    { feature: 'Programmable asset behavior', linaz: true, uni: false, cow: false, anoma: false },
    { feature: 'Natural language intents', linaz: true, uni: false, cow: false, anoma: false },
    { feature: 'Reversible transfers', linaz: true, uni: false, cow: false, anoma: false },
    { feature: 'Cross-chain without bridge', linaz: true, uni: false, cow: false, anoma: false },
    { feature: 'Built for non-crypto users', linaz: true, uni: false, cow: false, anoma: false },
  ]

  return (
    <div className="min-h-screen bg-cream text-textPri selection:bg-terra selection:text-white antialiased">
      {/* Top Banner Navigation */}
      <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="font-mono font-bold text-lg tracking-wider text-textPri">
          LINAZ<span className="text-terra">.</span>
        </div>
        <div className="flex items-center gap-2 bg-surface px-3 py-1.5 rounded-full border border-border shadow-sm">
          <span className="w-2 h-2 rounded-full bg-terra animate-pulse" />
          <span className="font-mono text-xs text-textSec font-medium uppercase tracking-wider">Pre-Testnet Phase</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs text-terra uppercase tracking-widest font-bold bg-terra/10 px-3 py-1 rounded-full">
            The Declarative Paradigm Shift
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-display font-extrabold text-textPri tracking-tight leading-[1.1]">
            Value that knows what it&apos;s <br />
            <span className="text-terra">supposed to do.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-textSec max-w-2xl mx-auto font-sans leading-relaxed">
            The first network where you tell it what you want to happen with your money — and it makes it happen completely and safely, or not at all.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#cta" className="px-6 py-3.5 bg-terra text-white font-medium rounded-btn shadow-warm text-sm hover:opacity-90 transition-opacity">
              Build the Future
            </a>
            <a href="#how-it-works" className="px-6 py-3.5 bg-surface text-textSec font-medium rounded-btn border border-border text-sm hover:bg-white transition-colors">
              Read Architecture
            </a>
          </div>
        </motion.div>
      </header>

      {/* Narrative Section (The Problem) */}
      <section className="bg-surface border-y border-border py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra sticky top-6">
                01 / The Core Deficit
              </h2>
              <p className="font-display text-2xl font-bold mt-2 text-textPri">Crypto failed the ones who needed it most.</p>
            </div>
            <div className="md:col-span-8 space-y-6 text-textSec leading-relaxed text-base sm:text-lg">
              <p>
                Every day a nurse in Manila sends money home to her children. She walks into a Western Union and hands over $300 — two weeks of 12 hour shifts. <strong>$35 disappears in fees</strong> before it crosses a single border. That is four hours of her life. Taken. Before her mother sees a cent.
              </p>
              <p>
                She heard crypto was different. Borderless. Instant. Free. She tried it. One wrong character in a 42-digit address and $300 was gone in four seconds. No reversal. No recourse. No one to call.
              </p>
              <p className="text-textPri font-medium">
                She went back to Western Union.
              </p>
              <p>
                She is not one woman. She is <strong>800 million people</strong> moving <strong>$700 billion dollars</strong> across borders every year. $42 billion of it evaporates in fees. The ones who tried crypto lost even more.
              </p>
              <p>
                Crypto failed them. Not because the technology was wrong. Because nobody finished building it. Every protocol ever built tells you <em>how</em> to move money. Not one of them guarantees where it arrives. Not one of them gives you your money back if something goes wrong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra sticky top-6">
                02 / The Solution
              </h2>
              <p className="font-display text-2xl font-bold mt-2 text-textPri">Outcome-Driven Execution.</p>
            </div>
            <div className="md:col-span-8 space-y-6">
              <p className="text-textSec text-lg leading-relaxed">
                Linaz is an intent and outcome execution network. You do not interact with protocols. You do not set gas. You do not select chains. You do not manage raw wallet addresses.
              </p>
              
              {/* Intent UI Card Mockup */}
              <div className="bg-surface rounded-card border border-border p-6 shadow-card font-mono mt-8">
                <div className="text-xs text-textMuted uppercase tracking-wider mb-2">Intent input string</div>
                <div className="text-textPri text-md sm:text-lg font-medium p-3 bg-cream rounded-md border border-border/60">
                  &ldquo;Send $300 to Mom. Keep it safe. Bring it back if she doesn&apos;t confirm.&rdquo;
                </div>
                <div className="mt-4 flex gap-2 items-center text-xs text-textMuted">
                  <span className="w-2 h-2 rounded-full bg-success inline-block" />
                  <span>Parsed &amp; compiled to programmatic constraint block</span>
                </div>
              </div>

              <p className="text-textSec text-lg leading-relaxed pt-4">
                Linaz reads that intent, compiling it into a structured execution plan. A network of specialized solvers picks it up in milliseconds, competing to find the absolute safest, fastest, and cheapest path. 
              </p>
              <p className="text-textSec text-lg leading-relaxed">
                The winner executes it atomically. Either every single step completes perfectly and safely, or the entire thing reverses completely. <strong>There is no middle state where you lose money to a human mistake.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Technical Blocks) */}
      <section id="how-it-works" className="bg-surface border-t border-border py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra">03 / Core Pillars</h2>
            <p className="font-display text-3xl font-bold mt-3 text-textPri">Four layers of unbreakable truth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-cream/50 rounded-card border border-border/80">
              <div className="font-mono text-xs font-bold text-terra mb-2">01 / INTENT LAYER</div>
              <h3 className="font-display font-bold text-lg text-textPri mb-2">Natural Language Translation</h3>
              <p className="text-sm text-textSec leading-relaxed">
                Users express goals in plain language. A natural language compiler translates them into structured intents with hard constraints and soft objectives. Constraints define what must be true; objectives define what must be optimized.
              </p>
            </div>

            <div className="p-6 bg-cream/50 rounded-card border border-border/80">
              <div className="font-mono text-xs font-bold text-terra mb-2">02 / SOLVER NETWORK</div>
              <h3 className="font-display font-bold text-lg text-textPri mb-2">Competitive Outcome Sourcing</h3>
              <p className="text-sm text-textSec leading-relaxed">
                Specialized automated systems compete to execute intents, functioning like miners but for outcomes. Every execution path is wrapped atomically—resulting in either 100% success or a full 100% reversal.
              </p>
            </div>

            <div className="p-6 bg-cream/50 rounded-card border border-border/80">
              <div className="font-mono text-xs font-bold text-terra mb-2">03 / PROGRAMMABLE ASSET LAYER</div>
              <h3 className="font-display font-bold text-lg text-textPri mb-2">Self-Enforcing Token Architectures</h3>
              <p className="text-sm text-textSec leading-relaxed">
                The ecosystem token has state behavior baked directly into its design. It knows its purpose, enforces its own conditions, can reverse itself, and can safely burn and mint across chains without native bridge risks.
              </p>
            </div>

            <div className="p-6 bg-cream/50 rounded-card border border-border/80">
              <div className="font-mono text-xs font-bold text-terra mb-2">04 / TRUTH &amp; PROOF SYSTEM</div>
              <h3 className="font-display font-bold text-lg text-textPri mb-2">Cryptographic Outcome Verification</h3>
              <p className="text-sm text-textSec leading-relaxed">
                Every condition, outcome, and state transition requires definitive on-chain proof (ZK proof, oracle consensus, institutional attestation). Nothing is assumed. Everything is verified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What This Enables */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra">04 / Capabilities</h2>
            <p className="font-display text-3xl font-bold mt-3 text-textPri">Unlocking the previously impossible.</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              "Send $300 to my mother. Return it if she doesn't confirm in 24 hours.",
              "Keep my loan healthy through this volatile period. Do whatever it takes.",
              "Move my savings to wherever it earns the best yield. Pull it back if the rate drops below 8%.",
              "Rebalance my portfolio to 60/40 by end of day. I don't care how.",
              "Lend this money for protocol development only. It cannot be used for anything else until the work is proven delivered."
            ].map((text, idx) => (
              <div key={idx} className="bg-surface rounded-card border border-border p-5 flex items-start gap-4 shadow-sm">
                <span className="font-mono text-xs font-bold bg-cream px-2 py-1 rounded border border-border/60 text-terra mt-0.5">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <p className="font-mono text-sm text-textPri font-medium leading-relaxed">&ldquo;{text}&rdquo;</p>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-textSec text-sm mt-8">
            These are not standard primitive transactions. These are absolute outcomes.
          </p>
        </div>
      </section>

      {/* Why Now & Market Grid */}
      <section className="bg-surface border-y border-border py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Why Now */}
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra">05 / Timing Catalyst</h2>
              <h3 className="font-display text-2xl font-bold text-textPri">Why Now?</h3>
              <div className="space-y-4 font-sans text-sm text-textSec leading-relaxed">
                <p>
                  <strong>1. ZK Infrastructure Maturity:</strong> Zero-knowledge proofs have reached the execution speeds necessary to verify complex outcomes trustlessly at scale.
                </p>
                <p>
                  <strong>2. Validated Intent Primitives:</strong> Systems like UniswapX and CoW Protocol proved market validation for localized intents—but nobody generalized it for full financial state systems.
                </p>
                <p>
                  <strong>3. Cross-Chain Progression:</strong> Cross-chain systems have finally reached technical adequacy where atomic multi-chain execution can exist without standard bridge vulnerability.
                </p>
              </div>
            </div>

            {/* Market Target */}
            <div className="lg:col-span-6 space-y-6 lg:border-l lg:border-border lg:pl-12">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra">06 / Market Scale</h2>
              <h3 className="font-display text-2xl font-bold text-textPri">The Global Landscape</h3>
              <div className="grid grid-cols-2 gap-4 font-mono">
                <div className="bg-cream/40 p-4 rounded-md border border-border/60">
                  <div className="text-xl font-bold text-textPri">$700B</div>
                  <div className="text-xs text-textMuted mt-1">Annual Remittance</div>
                </div>
                <div className="bg-cream/40 p-4 rounded-md border border-border/60">
                  <div className="text-xl font-bold text-textPri">800M</div>
                  <div className="text-xs text-textMuted mt-1">Cross-border Users</div>
                </div>
                <div className="bg-cream/40 p-4 rounded-md border border-border/60">
                  <div className="text-xl font-bold text-textPri">$42B</div>
                  <div className="text-xs text-textMuted mt-1">Lost to Fees Yearly</div>
                </div>
                <div className="bg-cream/40 p-4 rounded-md border border-border/60">
                  <div className="text-xl font-bold text-textPri">1.4B</div>
                  <div className="text-xs text-textMuted mt-1">Unbanked Globally</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Competitive Matrix */}
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra">07 / System Comparisons</h2>
          <p className="font-display text-3xl font-bold mt-3 text-textPri">Uncompromising feature parity.</p>
        </div>

        <div className="overflow-x-auto rounded-card border border-border bg-surface shadow-card">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-border bg-cream/40">
                <th className="p-4 font-bold text-textPri">Capability</th>
                <th className="p-4 font-bold text-terra text-center bg-terra/5">Linaz</th>
                <th className="p-4 font-bold text-textMuted text-center">Uniswap</th>
                <th className="p-4 font-bold text-textMuted text-center">CoW Protocol</th>
                <th className="p-4 font-bold text-textMuted text-center">Anoma</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, idx) => (
                <tr key={idx} className="border-b border-border/60 last:border-none hover:bg-cream/20 transition-colors">
                  <td className="p-4 font-medium text-textPri">{row.feature}</td>
                  <td className="p-4 text-center bg-terra/5 text-terra font-bold">{row.linaz ? '✓' : '—'}</td>
                  <td className="p-4 text-center text-textMuted">{row.uni ? '✓' : '—'}</td>
                  <td className="p-4 text-center text-textMuted">{row.cow ? '✓' : '—'}</td>
                  <td className="p-4 text-center text-textMuted">{row.anoma ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Architecture Status & Principles Grid */}
      <section className="bg-surface border-t border-border py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Status checklist */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra">08 / Build Matrix</h2>
            <h3 className="font-display text-2xl font-bold text-textPri">Architecture Status</h3>
            <div className="space-y-2 font-mono text-xs">
              {statusItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-border/40 last:border-none">
                  <span className="text-textSec">{item.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase ${item.status === 'done' ? 'bg-success/10 text-success' : 'bg-terra/10 text-terra animate-pulse'}`}>
                    {item.status === 'done' ? 'Designed' : 'In Development'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Principles */}
          <div className="md:col-span-7 space-y-6 md:border-l md:border-border md:pl-12">
            <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-terra">09 / Immutable Pillars</h2>
            <h3 className="font-display text-2xl font-bold text-textPri">Protocol Guarantees</h3>
            <div className="space-y-4 font-sans text-sm text-textSec leading-relaxed">
              <p>
                <strong>Truth and Proof:</strong> Every outcome or state transition must be verifiable. We make lying maximally expensive, not just technically difficult.
              </p>
              <p>
                <strong>Outcomes, Not Instructions:</strong> Users express destination criteria; the network manages the mechanics. Complexity lives strictly in the infrastructure.
              </p>
              <p>
                <strong>Atomic or Nothing:</strong> Complete success or full transactional execution rollback. No loose states, no middle leakage.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer & CTA Section */}
      <footer id="cta" className="py-24 border-t border-border text-center">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <span className="font-mono text-xs text-terra font-bold uppercase tracking-widest">
            Origin Status: Lusaka, Zambia
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-textPri tracking-tight">
            Built from the continent that <br />needs this solution more than anywhere on earth.
          </h2>
          <p className="text-textSec max-w-lg mx-auto text-sm leading-relaxed">
            Actively scaling testnet infrastructure. Seeking specialized Solidity/Smart Contract architecture engineers and protocol platform partners.
          </p>

          {/* Contact Details Layout Block */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto font-mono text-xs">
            <a href="mailto:gabychancer357@gmail.com" className="p-4 bg-surface rounded-card border border-border shadow-sm hover:border-terra transition-colors block text-center">
              <div className="text-textMuted uppercase mb-1">Email</div>
              <div className="text-textPri font-medium truncate">gabychancer357@gmail.com</div>
            </a>
            <a href="https://wa.me/260974383918" target="_blank" rel="noreferrer" className="p-4 bg-surface rounded-card border border-border shadow-sm hover:border-terra transition-colors block text-center">
              <div className="text-textMuted uppercase mb-1">WhatsApp</div>
              <div className="text-textPri font-medium">+260 974 383 918</div>
            </a>
            <a href="https://t.me/Shukoevic357" target="_blank" rel="noreferrer" className="p-4 bg-surface rounded-card border border-border shadow-sm hover:border-terra transition-colors block text-center">
              <div className="text-textMuted uppercase mb-1">Telegram</div>
              <div className="text-textPri font-medium">@Shukoevic357</div>
            </a>
          </div>

          <div className="pt-12 text-xs font-mono text-textMuted">
            &copy; {new Date().getFullYear()} Linaz Protocol. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}