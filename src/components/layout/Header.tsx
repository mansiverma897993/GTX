"use client";

import Link from "next/link";
import { Terminal, Shield, Activity, Wallet } from "lucide-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export function Header() {
  return (
    <header className="border-b border-primary/20 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-primary" />
          <Link href="/">
            <span className="font-mono font-bold text-xl tracking-wider drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] cursor-pointer">
              GTX<span className="text-primary">.SYS</span>
            </span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 font-mono text-sm text-primary/70">
          <Link href="/ai-security" className="hover:text-primary transition-colors flex items-center gap-2">
            <Activity className="h-4 w-4" /> AI SECURITY
          </Link>
          <Link href="/wallet-dna" className="hover:text-primary transition-colors flex items-center gap-2">
            <Shield className="h-4 w-4" /> WALLET DNA
          </Link>
          <Link href="/portfolio" className="hover:text-primary transition-colors flex items-center gap-2">
            <Wallet className="h-4 w-4" /> PORTFOLIO
          </Link>
          <Link href="/docs" className="hover:text-primary transition-colors flex items-center gap-2 ml-4">
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30 text-xs">DOCS</span>
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col items-end mr-4">
            <span className="text-xs text-primary font-mono">SYSTEM STATUS</span>
            <span className="text-[10px] text-primary/50 font-mono">SECURE / OPERATIONAL</span>
          </div>
          <WalletMultiButton className="!bg-transparent !border !border-primary/50 !text-primary !font-mono !text-sm hover:!bg-primary hover:!text-black transition-all !rounded !shadow-[0_0_10px_rgba(34,197,94,0.2)] !h-auto !py-2 !px-4" />
        </div>
      </div>
    </header>
  );
}
