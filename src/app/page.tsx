import { RugPredictor } from "@/components/dashboard/RugPredictor";
import { WalletScanner } from "@/components/dashboard/WalletScanner";
import { ExecutionTerminal } from "@/components/dashboard/ExecutionTerminal";
import { Terminal, Shield, Activity, Wallet } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      {/* Topbar */}
      <header className="border-b border-primary/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-mono font-bold text-xl tracking-wider drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">GTX<span className="text-primary">.SYS</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6 font-mono text-sm text-primary/70">
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Activity className="h-4 w-4"/> AI SECURITY</a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Shield className="h-4 w-4"/> WALLET DNA</a>
            <a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><Wallet className="h-4 w-4"/> PORTFOLIO</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-xs text-primary font-mono">SYSTEM STATUS</span>
              <span className="text-[10px] text-primary/50 font-mono">SECURE / OPERATIONAL</span>
            </div>
            <button className="px-4 py-2 border border-primary/50 text-primary font-mono text-sm hover:bg-primary hover:text-black transition-all rounded shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              CONNECT WALLET
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
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
      
      {/* Cyberpunk background glow effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />
    </div>
  );
}
