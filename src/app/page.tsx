import { RugPredictor } from "@/components/dashboard/RugPredictor";
import { WalletScanner } from "@/components/dashboard/WalletScanner";
import { ExecutionTerminal } from "@/components/dashboard/ExecutionTerminal";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-4xl font-mono font-bold mb-2 uppercase tracking-wide">Command Center</h1>
          <p className="text-muted-foreground font-mono text-sm">INSTITUTIONAL-GRADE SOLANA INTELLIGENCE TERMINAL</p>
        </div>
        <div className="mt-4 md:mt-0 bg-primary/10 border border-primary/30 p-3 rounded font-mono text-xs flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>LIVE: MONITORING 14,204 POOLS</span>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Intelligence */}
        <div className="lg:col-span-8 space-y-8">
          <RugPredictor />
          <WalletScanner />
        </div>

        {/* Right Column - Execution */}
        <div className="lg:col-span-4 space-y-8">
          <ExecutionTerminal />
          
          {/* Live Feed Widget */}
          <div className="border border-primary/20 rounded-lg p-4 bg-black/40 font-mono text-xs space-y-3">
            <h3 className="text-primary font-bold border-b border-primary/20 pb-2 mb-3">AI AUTO-ESCAPE ALERTS</h3>
            <div className="space-y-3 opacity-70">
              <div className="flex items-start gap-2">
                <span className="text-destructive mt-0.5">!!</span>
                <p><span className="text-white">Whale 7xT...3P2</span> removing liquidity from <span className="text-destructive">PEPE</span>. Sell recommended.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">&gt;</span>
                <p>Smart money accumulating <span className="text-primary">JUP</span> over last 4H.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">*</span>
                <p>New suspicious token pair detected: <span className="text-white">DOGE/SOL</span> (High rug risk).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
