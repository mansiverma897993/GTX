import { WalletScanner } from "@/components/dashboard/WalletScanner";

export default function WalletDNAPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-4xl font-mono font-bold mb-2 uppercase tracking-wide">Wallet DNA</h1>
          <p className="text-muted-foreground font-mono text-sm">BEHAVIORAL ANALYSIS AND ON-CHAIN REPUTATION</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <WalletScanner />
      </div>
    </main>
  );
}
