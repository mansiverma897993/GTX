"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function PortfolioPage() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((bal) => {
        setBalance(bal / LAMPORTS_PER_SOL);
      });
    } else {
      setTimeout(() => setBalance(null), 0);
    }
  }, [publicKey, connection]);

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-4xl font-mono font-bold mb-2 uppercase tracking-wide">Portfolio</h1>
          <p className="text-muted-foreground font-mono text-sm">ASSET OVERVIEW AND PERFORMANCE</p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto border border-primary/20 bg-black/40 rounded-lg p-8">
        {!publicKey ? (
          <div className="text-center text-muted-foreground font-mono">
            <p>Please connect your wallet to view your portfolio.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-primary/20 pb-4">
              <span className="font-mono text-primary/70">Wallet Address</span>
              <span className="font-mono text-white">{publicKey.toBase58()}</span>
            </div>
            <div className="flex justify-between items-center border-b border-primary/20 pb-4">
              <span className="font-mono text-primary/70">SOL Balance</span>
              <span className="font-mono text-white text-2xl font-bold">
                {balance !== null ? balance.toFixed(4) : "Loading..."} SOL
              </span>
            </div>
            
            <div className="pt-4">
              <h3 className="font-mono text-primary mb-4">Simulated Assets</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between border border-primary/10 p-3 rounded">
                  <span>GTX Token</span>
                  <span className="text-white">10,000.00</span>
                </div>
                <div className="flex justify-between border border-primary/10 p-3 rounded">
                  <span>WIF</span>
                  <span className="text-white">4,120.50</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
