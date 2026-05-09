"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Zap, Shield, ArrowRightLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";

export function ExecutionTerminal() {
  const [solAmount, setSolAmount] = useState("0.1");
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState<string | null>(null);
  
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleTrade = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first");
      return;
    }
    
    try {
      setLoading(true);
      setTxSig(null);
      
      const amountInLamports = parseFloat(solAmount) * LAMPORTS_PER_SOL;
      
      // We simulate a smart contract trade by sending a transaction
      // For demonstration, we send it to the same wallet to avoid losing devnet SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: publicKey,
          lamports: amountInLamports,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      const latestBlockhash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        signature,
        ...latestBlockhash
      });

      setTxSig(signature);
    } catch (error: any) {
      console.error("Trade failed:", error);
      alert("Trade failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simulate WIF output rate
  const wifAmount = (parseFloat(solAmount || "0") * 412.05).toFixed(2);

  return (
    <Card className="border-primary/50 shadow-[0_0_20px_rgba(34,197,94,0.15)] bg-black/60 backdrop-blur-xl relative overflow-hidden">
      {/* Decorative scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,197,94,0.05)_50%)] bg-[length:100%_4px] pointer-events-none" />
      
      <CardHeader className="border-b border-primary/20 pb-4 relative z-10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-primary font-mono flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-yellow-400" />
            SMART EXECUTION
          </CardTitle>
          <Badge className="bg-primary/20 text-primary border border-primary/50 font-mono">
            LIVE (DEVNET)
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6 relative z-10 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 border border-primary/20 rounded bg-black/40 focus-within:border-primary transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500">
                <span className="text-blue-500 font-bold text-xs">SOL</span>
              </div>
              <span className="font-mono text-white">SOL</span>
            </div>
            <Input 
              type="number" 
              className="w-24 bg-transparent border-none text-right text-xl font-mono focus-visible:ring-0 shadow-none text-primary" 
              value={solAmount}
              onChange={(e) => setSolAmount(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="flex justify-center -my-2 relative z-20">
            <div className="bg-background border border-primary/30 p-2 rounded-full">
              <ArrowRightLeft className="h-4 w-4 text-primary rotate-90" />
            </div>
          </div>

          <div className="flex justify-between items-center p-3 border border-primary/20 rounded bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500">
                <span className="text-purple-500 font-bold text-xs">WIF</span>
              </div>
              <span className="font-mono text-white">WIF</span>
            </div>
            <div className="text-xl font-mono text-muted-foreground">
              {wifAmount}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-1 border border-primary/10 p-2 rounded bg-primary/5">
            <Shield className="h-3 w-3 text-primary" /> MEV Protection
          </div>
          <div className="flex items-center gap-1 border border-primary/10 p-2 rounded bg-primary/5">
            <Zap className="h-3 w-3 text-yellow-400" /> Jito Bundle
          </div>
        </div>

        <Button 
          onClick={handleTrade}
          disabled={loading || !publicKey}
          className="w-full h-14 text-lg font-bold font-mono bg-primary hover:bg-primary/80 text-black shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all uppercase tracking-widest relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>Executing... <Loader2 className="h-5 w-5 animate-spin"/></>
            ) : !publicKey ? (
              "Connect Wallet First"
            ) : (
              <>Execute Trade <Zap className="h-5 w-5"/></>
            )}
          </span>
          {!loading && publicKey && (
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          )}
        </Button>

        {txSig && (
          <div className="p-3 border border-primary/30 bg-primary/10 rounded-md flex flex-col gap-2 animate-in fade-in zoom-in duration-300">
             <div className="flex items-center gap-2 text-primary font-mono text-sm">
                <CheckCircle2 className="h-4 w-4" /> Trade Executed Successfully
             </div>
             <a 
               href={`https://explorer.solana.com/tx/${txSig}?cluster=devnet`} 
               target="_blank" 
               rel="noreferrer"
               className="text-xs text-primary/70 hover:text-primary hover:underline font-mono truncate"
             >
               View Tx: {txSig}
             </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
