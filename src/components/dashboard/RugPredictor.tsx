"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ShieldCheck, Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface RugResult {
  safeScore: number;
  rugProbability: number;
  metrics: { liquidity: string; holderCount: string };
  reasons: string[];
}

export function RugPredictor() {
  const [address, setAddress] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [resultData, setResultData] = useState<RugResult | null>({
    safeScore: 82,
    rugProbability: 18,
    metrics: { liquidity: "$2.4M", holderCount: "14,204" },
    reasons: [
      "✅ Liquidity locked for 365 days",
      "✅ Code contract matches safe SPL standards",
      "⚠️ Dev wallet holds 12% of supply",
      "❌ High risk: Top 10 holders own 65% of supply"
    ]
  });

  const handleAnalyze = async () => {
    if (!address) return;
    setAnalyzing(true);
    setResultData(null);

    try {
      const response = await fetch('/api/rug-predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setResultData(data);
      } else {
        alert(data.error || "Failed to analyze token");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Network error connecting to AI engine.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Card className="border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.2)] bg-black/40 backdrop-blur-md">
      <CardHeader className="border-b border-primary/20 pb-4">
        <CardTitle className="text-primary font-mono flex items-center gap-2">
          <Activity className="h-5 w-5" />
          AI RUG PULL PREDICTOR
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex gap-2">
          <Input 
            className="font-mono bg-black/50 border-primary/30 focus-visible:ring-primary/50 text-white placeholder:text-muted-foreground/50" 
            placeholder="Paste Token Mint Address..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <Button 
            onClick={() => handleAnalyze()} 
            disabled={analyzing || !address}
            className="bg-primary hover:bg-primary/80 text-black font-mono font-bold"
          >
            {analyzing ? <span className="animate-pulse flex items-center gap-2">ANALYZING...</span> : <span className="flex items-center gap-2"><Search className="h-4 w-4"/> PREDICT</span>}
          </Button>
        </div>

        {resultData && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground font-mono">SAFE SCORE</p>
                <div className={`text-5xl font-bold font-mono ${resultData.safeScore > 50 ? 'text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'text-destructive drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}>
                  {resultData.safeScore}<span className={`text-xl ${resultData.safeScore > 50 ? 'text-primary/50' : 'text-destructive/50'}`}>/100</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground font-mono">RUG PROBABILITY</p>
                <div className={`text-2xl font-bold font-mono ${resultData.rugProbability > 50 ? 'text-destructive drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]'}`}>
                  {resultData.rugProbability}%
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-primary/70">
                <span className="text-white">ANALYZING CONTRACT...</span>
                <span className={resultData.safeScore > 50 ? 'text-primary' : 'text-destructive'}>{resultData.safeScore > 50 ? 'SAFE' : 'HIGH RISK'}</span>
              </div>
              <Progress value={resultData.safeScore} className={`h-2 ${resultData.safeScore > 50 ? 'bg-primary/20 [&_[data-slot=progress-indicator]]:bg-primary' : 'bg-destructive/20 [&_[data-slot=progress-indicator]]:bg-destructive'}`} />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="border border-primary/20 p-4 rounded-lg bg-black/40 flex flex-col justify-center">
                 <p className="text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider">Locked Liquidity</p>
                 <p className="text-xl text-primary font-mono font-bold">{resultData.metrics.liquidity}</p>
               </div>
               <div className="border border-primary/20 p-4 rounded-lg bg-black/40 flex flex-col justify-center">
                 <p className="text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider">Holders</p>
                 <p className="text-xl text-white font-mono font-bold">{resultData.metrics.holderCount}</p>
               </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-primary/20">
              <h4 className="text-sm font-mono text-primary/80 pb-2">EXPLAINABLE AI OUTPUT</h4>
              
              {resultData.reasons.map((reason: string, idx: number) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }} className="flex items-start gap-3 text-sm">
                  {reason.includes('✅') ? (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50 mt-0.5 shrink-0"><ShieldCheck className="h-3 w-3 mr-1" /> SAFE</Badge>
                  ) : reason.includes('❌') ? (
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/50 mt-0.5 shrink-0"><AlertTriangle className="h-3 w-3 mr-1" /> DANGER</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/50 mt-0.5 shrink-0"><AlertTriangle className="h-3 w-3 mr-1" /> WARNING</Badge>
                  )}
                  <span className="text-muted-foreground font-mono leading-relaxed">{reason.replace(/[✅❌⚠️]/g, '').trim()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {!resultData && !analyzing && (
          <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
             <Activity className="h-12 w-12 text-primary mb-4 animate-pulse" />
             <p className="font-mono text-sm text-primary">AWAITING TOKEN MINT ADDRESS</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
