"use client";
import { useEffect, useState } from "react";
import { Activity, Radio } from "lucide-react";

export function LiveNodeMap() {
  const [nodes, setNodes] = useState<{ x: number; y: number; active: boolean; size: number }[]>([]);

  useEffect(() => {
    // Generate static node positions once
    const newNodes = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      active: false,
      size: Math.random() * 3 + 2,
    }));
    setTimeout(() => setNodes(newNodes), 0);

    // Randomly activate nodes to simulate network traffic
    const interval = setInterval(() => {
      setNodes((current) =>
        current.map((node) => ({
          ...node,
          active: Math.random() > 0.7, // 30% chance to blink
        }))
      );
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-primary/20 rounded-lg bg-black/40 p-4 flex-1 flex flex-col relative overflow-hidden group min-h-[500px]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
      
      <div className="relative z-10 flex justify-between items-center mb-4 border-b border-primary/20 pb-2">
        <h3 className="text-primary font-bold font-mono text-xs flex items-center gap-2">
          <Radio className="h-4 w-4" /> GLOBAL MEMPOOL VISUALIZER
        </h3>
        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-primary animate-pulse" />
          <span className="text-[10px] text-muted-foreground font-mono">LIVE SYNC</span>
        </div>
      </div>

      <div className="relative flex-1 w-full h-full">
        {/* Connection Lines (CSS driven for simplicity) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
           {nodes.map((n1, i) => 
             nodes.map((n2, j) => {
               if (i < j && Math.random() > 0.8) {
                 return (
                   <line 
                     key={`${i}-${j}`} 
                     x1={`${n1.x}%`} y1={`${n1.y}%`} 
                     x2={`${n2.x}%`} y2={`${n2.y}%`} 
                     stroke="#22c55e" 
                     strokeWidth="0.5" 
                   />
                 )
               }
               return null;
             })
           )}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <div
            key={i}
            className={`absolute rounded-full transition-all duration-500 ease-in-out ${
              node.active ? "bg-primary shadow-[0_0_10px_#22c55e] scale-150" : "bg-primary/20 scale-100"
            }`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size}px`,
              height: `${node.size}px`,
            }}
          >
             {node.active && (
               <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
             )}
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-4 flex justify-between text-[10px] font-mono text-muted-foreground">
         <span>Validators: 1,842</span>
         <span>TPS: 3,492</span>
      </div>
    </div>
  );
}
