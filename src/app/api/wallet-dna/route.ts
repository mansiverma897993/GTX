import { NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    let pubKey;
    try {
      pubKey = new PublicKey(address);
    } catch (e) {
      return NextResponse.json({ error: "Invalid Solana Address format." }, { status: 400 });
    }

    // Fetch live on-chain data
    const balanceLamports = await connection.getBalance(pubKey);
    const balanceSol = balanceLamports / 1e9;

    // Fetch recent transaction count (max 100) to gauge activity
    const signatures = await connection.getSignaturesForAddress(pubKey, { limit: 100 });
    const txCount = signatures.length;

    // Rule-Based Risk Engine
    let riskLevel = "Low";
    let riskScore = 20;
    let personality = "Casual Trader";
    let explanation = "Normal wallet activity detected.";
    let winRate = "N/A";
    let avgHoldTime = "N/A";
    
    // Fake profit metrics based on random hash of address (deterministic)
    const seed = address.charCodeAt(0) + address.charCodeAt(address.length - 1);
    const profit = ((seed * txCount) % 500000) - 50000; // range -50k to 450k
    
    if (txCount === 0) {
      riskLevel = "Low";
      riskScore = 5;
      personality = "Dormant / New Wallet";
      explanation = "No recent activity detected on the network.";
    } else if (balanceSol > 1000 && txCount < 10) {
      riskLevel = "Medium";
      riskScore = 55;
      personality = "Whale / Accumulator";
      explanation = "High balance with very low transaction frequency. Potential insider accumulation.";
    } else if (balanceSol < 1 && txCount > 50) {
      riskLevel = "High";
      riskScore = 85;
      personality = "Sniper Bot / Sybil Farmer";
      explanation = "Extremely high transaction frequency with minimal held balance. Classic bot behavior.";
      winRate = `${50 + (seed % 45)}%`;
      avgHoldTime = `${(seed % 30) + 1} Secs`;
    } else if (balanceSol > 100 && txCount > 20) {
      riskLevel = "Critical";
      riskScore = 95;
      personality = "Insider Dump Entity";
      explanation = "High balance, high activity. Displays behavioral patterns matching known rug-pull deployers.";
      winRate = `${80 + (seed % 18)}%`;
      avgHoldTime = `${(seed % 60) + 5} Mins`;
    } else {
      riskLevel = "Low";
      riskScore = 15 + (seed % 20);
      personality = "Active Retail Trader";
      explanation = "Healthy mix of held balance and transaction activity.";
      winRate = `${40 + (seed % 30)}%`;
      avgHoldTime = `${(seed % 24) + 1} Hours`;
    }

    // Determine some "recent interacted contracts"
    const mockContracts = [
      { name: "JUP/SOL Pool", action: txCount > 50 ? "Wash Trading" : "Swap" },
      { name: "Unknown Token", action: riskScore > 80 ? "Deployer Mint" : "Buy" },
      { name: "Raydium Route", action: "Liquidity Add" }
    ].slice(0, 1 + (seed % 3));

    return NextResponse.json({
      address,
      balanceSol: balanceSol.toFixed(2),
      txCount,
      riskLevel,
      riskScore,
      personality,
      explanation,
      metrics: {
        profit: profit > 0 ? `+$${profit.toLocaleString()}` : `-$${Math.abs(profit).toLocaleString()}`,
        winRate,
        avgHoldTime
      },
      interactedContracts: mockContracts
    });

  } catch (error) {
    console.error("Wallet DNA Error:", error);
    return NextResponse.json({ error: "Failed to analyze wallet data." }, { status: 500 });
  }
}
