"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Network, Fingerprint, Crosshair, AlertOctagon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WalletScanner() {
  const [address, setAddress] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(false);

  const handleScan = () => {
    if(!address) return;
    setScanning(true);
    setResult(false);
    setTimeout(() => {
      setScanning(false);
      setResult(true);
    }, 1500);
  };

  return (
    <Card className="border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.1)] bg-black/40 backdrop-blur-md h-full">
      <CardHeader className="border-b border-primary/20 pb-4">
        <CardTitle className="text-primary font-mono flex items-center gap-2">
          <Fingerprint className="h-5 w-5" />
          WALLET DNA SCANNER
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex gap-2 mb-6">
          <Input 
            className="font-mono bg-black/50 border-primary/30 focus-visible:ring-primary/50" 
            placeholder="Paste Solana Wallet Address..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button onClick={handleScan} disabled={scanning} className="bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-black transition-all">
            {scanning ? "SCANNING..." : <><Search className="h-4 w-4 mr-2"/> SCAN</>}
          </Button>
        </div>

        {scanning && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Network className="h-12 w-12 text-primary animate-pulse" />
            <p className="text-primary font-mono text-sm animate-pulse">ANALYZING ON-CHAIN DNA...</p>
          </div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="p-4 border border-destructive/30 bg-destructive/5 rounded-lg flex items-start gap-4">
              <div className="p-2 bg-destructive/20 rounded-full">
                <AlertOctagon className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h4 className="text-destructive font-mono font-bold mb-1">INSIDER ACCUMULATION</h4>
                <p className="text-muted-foreground text-sm font-mono leading-relaxed">
                  This wallet exhibits behavioral patterns matching an insider accumulation wallet with high dump probability. Linked to 3 known pump-and-dump events.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="border-destructive text-destructive bg-destructive/10">Confidence: 89%</Badge>
                  <Badge variant="outline" className="border-primary/30 text-primary">Sniper Bot User</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="border border-primary/20 p-3 rounded bg-black/50">
                 <p className="text-xs text-muted-foreground font-mono mb-1">TOTAL PROFIT (30D)</p>
                 <p className="text-xl text-primary font-mono">+$42,109.50</p>
               </div>
               <div className="border border-primary/20 p-3 rounded bg-black/50">
                 <p className="text-xs text-muted-foreground font-mono mb-1">WIN RATE</p>
                 <p className="text-xl text-destructive font-mono">84.2%</p>
               </div>
            </div>
          </motion.div>
        )}
        
        {!scanning && !result && (
          <div className="flex flex-col items-center justify-center py-12 opacity-30">
            <Crosshair className="h-16 w-16 text-primary mb-4" />
            <p className="font-mono text-sm text-primary">AWAITING TARGET</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
