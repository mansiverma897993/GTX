"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ShieldCheck, Activity } from "lucide-react";

export function RugPredictor() {
  return (
    <Card className="border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.2)] bg-black/40 backdrop-blur-md">
      <CardHeader className="border-b border-primary/20 pb-4">
        <CardTitle className="text-primary font-mono flex items-center gap-2">
          <Activity className="h-5 w-5" />
          AI RUG PULL PREDICTOR
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-muted-foreground font-mono">SAFE SCORE</p>
            <div className="text-5xl font-bold text-primary font-mono drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">82<span className="text-xl text-primary/50">/100</span></div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-mono">RUG PROBABILITY</p>
            <div className="text-2xl font-bold text-destructive font-mono drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]">18%</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-primary/70">
            <span>ANALYZING CONTRACT...</span>
            <span>SAFE</span>
          </div>
          <Progress value={82} className="h-2 bg-primary/20" />
        </div>

        <div className="space-y-3 pt-4">
          <h4 className="text-sm font-mono text-primary/80 border-b border-primary/20 pb-2">EXPLAINABLE AI OUTPUT</h4>
          
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-3 text-sm">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/50"><AlertTriangle className="h-3 w-3 mr-1" /> WARNING</Badge>
            <span className="text-muted-foreground font-mono">Dev owns 41% supply</span>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3 text-sm">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50"><ShieldCheck className="h-3 w-3 mr-1" /> SAFE</Badge>
            <span className="text-muted-foreground font-mono">Liquidity locked for 365 days</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-3 text-sm">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/50"><ShieldCheck className="h-3 w-3 mr-1" /> SAFE</Badge>
            <span className="text-muted-foreground font-mono">No previous scam associations</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3 text-sm">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/50"><AlertTriangle className="h-3 w-3 mr-1" /> WARNING</Badge>
            <span className="text-muted-foreground font-mono">Fake Twitter engagement detected</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
