"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Network, Fingerprint, AlertOctagon, Activity, ShieldAlert, History, TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MOCK_TARGETS = [
  { address: "7xTx1y...3P2b", type: "Insider Dump", risk: "High" },
  { address: "JUP9zK...mB41", type: "Sybil Network", risk: "Critical" },
  { address: "MEV4xx...9aPz", type: "Sniper Bot", risk: "Medium" }
];

interface WalletResult {
  address: string;
  balanceSol: string;
  txCount: number;
  riskLevel: string;
  riskScore: number;
  personality: string;
  explanation: string;
  metrics: { profit: string; winRate: string; avgHoldTime: string };
  interactedContracts: { name: string; action: string }[];
}

export function WalletScanner() {
  const [address, setAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(false);
  const [resultData, setResultData] = useState<WalletResult | null>(null);

  const handleScan = async (scanAddress: string = address) => {
    if(!scanAddress) return;
    setAddress(scanAddress);
    setScanning(true);
    setResult(false);
    setResultData(null);
    
    try {
      const response = await fetch('/api/wallet-dna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: scanAddress }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResultData(data);
        setResult(true);
      } else {
        alert(data.error || "Failed to scan wallet");
      }
    } catch (error) {
      console.error("Scan error:", error);
      alert("Network error connecting to AI engine.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <Card className="border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.1)] bg-black/40 backdrop-blur-md">
      <CardHeader className="border-b border-primary/20 pb-4">
        <CardTitle className="text-primary font-mono flex items-center gap-2">
          <Fingerprint className="h-5 w-5" />
          WALLET DNA SCANNER
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex gap-2">
          <Input 
            className="font-mono bg-black/50 border-primary/30 focus-visible:ring-primary/50 text-white placeholder:text-muted-foreground/50" 
            placeholder="Paste Solana Wallet Address..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
          />
          <Button onClick={() => handleScan()} disabled={scanning} className="bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-black transition-all font-mono tracking-wider">
            {scanning ? "SCANNING..." : <><Search className="h-4 w-4 mr-2"/> SCAN</>}
          </Button>
        </div>

        {scanning && (
          <div className="flex flex-col items-center justify-center py-16 space-y-6 border border-primary/10 rounded-lg bg-black/20">
            <div className="relative">
              <Network className="h-16 w-16 text-primary animate-pulse relative z-10" />
              <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-[-10px] border border-primary/20 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
            </div>
            <div className="space-y-2 text-center">
              <p className="text-primary font-mono text-lg animate-pulse tracking-widest">ANALYZING ON-CHAIN DNA</p>
              <p className="text-muted-foreground font-mono text-xs">Cross-referencing 42,000+ known malicious signatures...</p>
            </div>
          </div>
        )}

        {result && resultData && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={`p-5 border ${resultData.riskScore > 80 ? 'border-destructive/40 bg-destructive/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : resultData.riskScore > 40 ? 'border-yellow-500/40 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.1)]' : 'border-primary/40 bg-primary/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]'} rounded-lg flex items-start gap-4`}>
              <div className={`p-3 rounded-full shrink-0 ${resultData.riskScore > 80 ? 'bg-destructive/20' : resultData.riskScore > 40 ? 'bg-yellow-500/20' : 'bg-primary/20'}`}>
                <AlertOctagon className={`h-6 w-6 ${resultData.riskScore > 80 ? 'text-destructive' : resultData.riskScore > 40 ? 'text-yellow-500' : 'text-primary'}`} />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-start mb-2">
                   <h4 className={`${resultData.riskScore > 80 ? 'text-destructive' : resultData.riskScore > 40 ? 'text-yellow-500' : 'text-primary'} font-mono text-lg font-bold uppercase`}>
                     {resultData.riskLevel} RISK DETECTED
                   </h4>
                   <Badge variant="outline" className={`${resultData.riskScore > 80 ? 'border-destructive text-destructive bg-destructive/10' : resultData.riskScore > 40 ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 'border-primary text-primary bg-primary/10'} font-mono`}>
                     RISK SCORE: {resultData.riskScore}/100
                   </Badge>
                </div>
                <p className="text-muted-foreground text-sm font-mono leading-relaxed mb-4">
                  {resultData.explanation} <span className={`${resultData.riskScore > 80 ? 'text-destructive' : resultData.riskScore > 40 ? 'text-yellow-500' : 'text-primary'} font-bold`}>{resultData.personality}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs">
                    <Fingerprint className="h-3 w-3 mr-1"/> LIVE DEVNET DATA
                  </Badge>
                  <Badge variant="outline" className="border-primary/30 text-white font-mono text-xs">
                     Bal: {resultData.balanceSol} SOL
                  </Badge>
                  <Badge variant="outline" className="border-primary/30 text-white font-mono text-xs">
                     {resultData.txCount} Recent Txs
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
               <div className="border border-primary/20 p-4 rounded-lg bg-black/40 flex flex-col justify-center">
                 <p className="text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider">Estimated Profit (30D)</p>
                 <p className={`text-xl font-mono font-bold ${resultData.metrics.profit.startsWith('-') ? 'text-destructive' : 'text-primary'}`}>
                   {resultData.metrics.profit}
                 </p>
               </div>
               <div className="border border-primary/20 p-4 rounded-lg bg-black/40 flex flex-col justify-center">
                 <p className="text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider">Win Rate</p>
                 <p className={`text-xl font-mono font-bold ${resultData.riskScore > 80 ? 'text-destructive' : 'text-primary'}`}>{resultData.metrics.winRate}</p>
               </div>
               <div className="border border-primary/20 p-4 rounded-lg bg-black/40 flex flex-col justify-center">
                 <p className="text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider">Avg Hold Time</p>
                 <p className="text-xl text-white font-mono font-bold">{resultData.metrics.avgHoldTime}</p>
               </div>
               <div className="border border-primary/20 p-4 rounded-lg bg-black/40 flex flex-col justify-center">
                 <p className="text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider">Tx Count (Devnet)</p>
                 <p className="text-xl text-white font-mono font-bold">{resultData.txCount}</p>
               </div>
            </div>

            <div className="border border-primary/20 rounded-lg bg-black/40 p-4">
              <div className="flex justify-between items-center mb-4">
                 <h4 className="text-primary font-mono text-sm flex items-center gap-2"><History className="h-4 w-4"/> RECENT INTERACTED CONTRACTS</h4>
                 <Button 
                   size="sm" 
                   onClick={() => alert(`Anchor Contract integration is ready! \n\nProgram ID: GTXRegYF9q3DkY2pZxwZpP9SxFQp5CjM2c2YdKw\n\nTo make this fully functional, please deploy the Rust code located in the 'contract' folder to Solana Playground and connect the IDL.`)}
                   className="bg-primary hover:bg-primary/80 text-black font-mono text-xs h-7"
                 >
                   Record Scan On-Chain
                 </Button>
              </div>
              <div className="space-y-3 font-mono text-xs">
                 {resultData.interactedContracts.map((c: any, idx: number) => (
                   <div key={idx} className="flex justify-between items-center pb-2 border-b border-primary/10 last:border-0 last:pb-0">
                      <span className="text-muted-foreground">{c.name}</span>
                      <span className={c.action.includes('Deploy') || c.action.includes('Dump') ? 'text-destructive' : 'text-primary'}>{c.action}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>
        )}
        
        {!scanning && !result && (
          <div className="space-y-8 py-4">
             {/* Capabilities Grid */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-primary/10 bg-primary/5 p-4 rounded-lg text-center space-y-2 hover:bg-primary/10 transition-colors">
                   <div className="flex justify-center"><Network className="h-6 w-6 text-primary" /></div>
                   <h4 className="font-mono text-sm text-primary font-bold">SYBIL DETECTION</h4>
                   <p className="text-[10px] text-muted-foreground font-mono">Uncover hidden wallet clusters and coordinated wash trading rings.</p>
                </div>
                <div className="border border-primary/10 bg-primary/5 p-4 rounded-lg text-center space-y-2 hover:bg-primary/10 transition-colors">
                   <div className="flex justify-center"><Activity className="h-6 w-6 text-yellow-400" /></div>
                   <h4 className="font-mono text-sm text-yellow-400 font-bold">PROFIT PROFILING</h4>
                   <p className="text-[10px] text-muted-foreground font-mono">Analyze historical win rates, avg hold times, and PnL metrics.</p>
                </div>
                <div className="border border-primary/10 bg-primary/5 p-4 rounded-lg text-center space-y-2 hover:bg-primary/10 transition-colors">
                   <div className="flex justify-center"><ShieldAlert className="h-6 w-6 text-destructive" /></div>
                   <h4 className="font-mono text-sm text-destructive font-bold">RISK SCORING</h4>
                   <p className="text-[10px] text-muted-foreground font-mono">Instant identification of sniper bots, insiders, and rug-pullers.</p>
                </div>
             </div>

             {/* Live Feed */}
             <div className="border border-primary/20 rounded-lg p-5 bg-black/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
               <div className="flex items-center justify-between mb-4 border-b border-primary/10 pb-2">
                 <h4 className="font-mono text-sm text-primary flex items-center gap-2"><TrendingUp className="h-4 w-4"/> LIVE THREAT FEED</h4>
                 <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground"><span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> MONITORING NETWORK</div>
               </div>
               
               <div className="space-y-2">
                 {MOCK_TARGETS.map((target, idx) => (
                   <div 
                      key={idx} 
                      onClick={() => handleScan(target.address)}
                      className="flex items-center justify-between p-3 border border-primary/10 rounded bg-primary/5 hover:bg-primary/20 hover:border-primary/50 cursor-pointer transition-all group"
                   >
                     <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-mono text-sm text-white">{target.address}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground hidden sm:block">{target.type}</span>
                        <Badge variant="outline" className={`font-mono text-[10px] ${target.risk === 'Critical' ? 'border-destructive text-destructive' : target.risk === 'High' ? 'border-orange-500 text-orange-500' : 'border-yellow-500 text-yellow-500'}`}>
                           {target.risk} RISK
                        </Badge>
                     </div>
                   </div>
                 ))}
               </div>
               <p className="text-center text-[10px] font-mono text-muted-foreground mt-4 italic">Click any address to test the scanner.</p>
             </div>

             {/* Global Network Stats */}
             <div className="grid grid-cols-2 gap-4">
                <div className="border border-primary/20 bg-primary/5 p-3 rounded flex flex-col justify-center items-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <p className="text-[10px] text-muted-foreground font-mono mb-1 relative z-10">24H SCANS PERFORMED</p>
                  <p className="text-lg text-primary font-mono font-bold relative z-10 animate-pulse">1,402,891</p>
                </div>
                <div className="border border-destructive/20 bg-destructive/5 p-3 rounded flex flex-col justify-center items-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-destructive/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <p className="text-[10px] text-muted-foreground font-mono mb-1 relative z-10">THREATS PREVENTED</p>
                  <p className="text-lg text-destructive font-mono font-bold relative z-10">42,104</p>
                </div>
             </div>
          </div>
        )}

        {!scanning && !result && (
          <div className="pt-2">
             <div className="bg-primary/5 border border-primary/20 rounded p-4">
                <h4 className="text-primary font-mono text-xs font-bold mb-2 uppercase tracking-widest">Terminal Instructions</h4>
                <ul className="text-[10px] text-muted-foreground font-mono space-y-2 list-disc list-inside">
                   <li>Paste any Solana wallet address (e.g., from Solscan or Photon) into the input above.</li>
                   <li>The AI will cross-reference the address against our proprietary database of known snipers, insider wallets, and rug-pullers.</li>
                   <li>For a quick test, click any of the addresses in the Live Threat Feed.</li>
                   <li><strong className="text-primary">Note:</strong> All audits can be permanently recorded on the Solana blockchain using the GTX Registry Smart Contract.</li>
                </ul>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
