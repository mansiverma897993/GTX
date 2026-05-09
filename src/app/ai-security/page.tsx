import { RugPredictor } from "@/components/dashboard/RugPredictor";
import { ExecutionTerminal } from "@/components/dashboard/ExecutionTerminal";

export default function AISecurityPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-4xl font-mono font-bold mb-2 uppercase tracking-wide">AI Security</h1>
          <p className="text-muted-foreground font-mono text-sm">ADVANCED THREAT DETECTION AND MITIGATION</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <RugPredictor />
        </div>
        <div className="lg:col-span-4 space-y-8">
          <ExecutionTerminal />
        </div>
      </div>
    </main>
  );
}
