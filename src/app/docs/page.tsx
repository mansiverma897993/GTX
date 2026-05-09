import { Shield, BookOpen, Cpu, Zap, Activity } from "lucide-react";

export default function DocsPage() {
  return (
    <main className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-primary/20 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-sm">
            <BookOpen className="h-4 w-4" /> WHITEPAPER V1.0
          </div>
          <h1 className="text-4xl md:text-6xl font-mono font-bold tracking-tighter uppercase text-white drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">
            GTX<span className="text-primary">.SYS</span>
          </h1>
          <p className="text-xl text-muted-foreground font-mono max-w-2xl leading-relaxed">
            AI Security + Smart Execution Infrastructure for Solana Traders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 space-y-2 border border-primary/10 p-4 rounded-lg bg-black/40 backdrop-blur-md">
            <h4 className="font-mono text-primary text-xs uppercase tracking-widest mb-4">Contents</h4>
            <a href="#vision" className="block text-sm font-mono text-muted-foreground hover:text-primary py-1">Project Vision</a>
            <a href="#core-problem" className="block text-sm font-mono text-muted-foreground hover:text-primary py-1">Core Problem to Solve</a>
            <a href="#core-features" className="block text-sm font-mono text-muted-foreground hover:text-primary py-1">Core Features</a>
            <a href="#tech-stack" className="block text-sm font-mono text-muted-foreground hover:text-primary py-1">Tech Stack</a>
            <a href="#positioning" className="block text-sm font-mono text-muted-foreground hover:text-primary py-1">Product Positioning</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-16 text-muted-foreground font-mono leading-relaxed">
          
          <section id="vision" className="space-y-6">
            <h2 className="text-3xl text-white font-bold border-b border-primary/20 pb-2 inline-block">Project Vision</h2>
            <p className="text-lg text-primary/90">
              GTX is not just a trading terminal.
            </p>
            <p>
              It is an <strong>AI Security + Smart Execution Infrastructure for Solana Traders</strong> that helps users avoid rug pulls, scam tokens, sniper traps, fake volume manipulation, whale dumps, and emotional trading mistakes before they trade.
            </p>
            <div className="p-6 border border-primary/30 rounded-lg bg-primary/5 text-center my-8">
              <p className="text-xl text-white font-bold tracking-wider">
                ChatGPT + Arkham + Photon + Jito + DexScreener = <span className="text-primary">GTX</span>
              </p>
            </div>
            <p>
              GTX should feel like a futuristic institutional-grade trading platform for retail traders.
            </p>
          </section>

          <section id="core-problem" className="space-y-6">
            <h2 className="text-3xl text-white font-bold flex items-center gap-3"><Shield className="text-destructive h-8 w-8" /> Core Problem to Solve</h2>
            <p>Most Solana traders lose money because of:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {['Rug pulls', 'Honeypot tokens', 'Fake liquidity', 'Whale manipulation', 'Insider wallets', 'Sniper bot activity', 'Wash trading', 'Fake social sentiment', 'Delayed trade execution', 'Poor copy trading decisions'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 border border-destructive/20 bg-destructive/5 p-3 rounded text-sm text-white">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive" /> {item}
                </li>
              ))}
            </ul>
            <p className="text-primary mt-6 text-lg font-bold">GTX solves this using AI + on-chain intelligence + smart execution.</p>
          </section>

          <section id="core-features" className="space-y-12">
            <h2 className="text-3xl text-white font-bold border-b border-primary/20 pb-2 inline-block">Core Features</h2>
            
            <div className="space-y-4">
              <h3 className="text-2xl text-primary font-bold flex items-center gap-2"><Cpu className="h-6 w-6"/> 1. AI Rug Pull Predictor</h3>
              <p>Before buying any token, GTX analyzes liquidity, holder concentration, dev wallets, fake volume, and social sentiment.</p>
              <div className="bg-black/60 border border-primary/20 p-4 rounded-lg">
                <p className="text-white">Output Example:</p>
                <div className="mt-2 space-y-2">
                  <p className="text-primary font-bold">SAFE SCORE: 82/100</p>
                  <p className="text-destructive">78% chance of rug pull within 48 hours</p>
                  <ul className="text-sm space-y-1 mt-2">
                    <li className="text-destructive">❌ Dev owns 41% supply</li>
                    <li className="text-destructive">❌ Liquidity unlocks in 9 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl text-primary font-bold flex items-center gap-2"><Activity className="h-6 w-6"/> 2. Wallet DNA Scanner</h3>
              <p>User pastes any wallet address. AI analyzes for sniper, insider, whale, or smart money behavior.</p>
              <div className="bg-black/60 border border-primary/20 p-4 rounded-lg">
                 <p className="text-white font-bold">Wallet Personality Report</p>
                 <p className="mt-2">This wallet behaves like an insider accumulation wallet with high dump probability.</p>
                 <p className="text-primary mt-2">Confidence: 89%</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl text-primary font-bold flex items-center gap-2"><Zap className="h-6 w-6"/> 3. Smart Jito Execution Engine</h3>
              <p>If token is safe, allow fast execution using Jito bundles, MEV protection, priority fee optimization, and smart routing.</p>
              <p className="text-white italic">Execution should happen in sub-500ms style UX.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold">4. Auto Escape Mode</h3>
              <p>If rug probability increases after user buys, system automatically sends alerts, recommends exits, or triggers stop-loss protection.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl text-white font-bold">5. Smart Copy Trading Filter</h3>
              <p>Only copy profitable verified wallets and trusted smart money. Avoid scam whales and fake PnL wallets.</p>
            </div>
          </section>

          <section id="positioning" className="space-y-6 pt-12 border-t border-primary/20">
            <h2 className="text-3xl text-white font-bold">Final Product Positioning</h2>
            <p>Pitch GTX as:</p>
            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-lg shadow-[0_0_20px_rgba(34,197,94,0.1)]">
              <h3 className="text-2xl text-primary font-bold mb-2">AI Security Infrastructure for Solana Retail Traders</h3>
              <p className="text-white/70 italic text-sm">(NOT just a trading terminal)</p>
            </div>
            <p className="text-xl pt-4">
              The final product should feel like the <strong className="text-white">Bloomberg Terminal for Solana Degens</strong> with AI protection and execution intelligence.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
