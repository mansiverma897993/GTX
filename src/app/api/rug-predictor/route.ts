import { NextResponse } from "next/server";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export async function POST(req: Request) {
  try {
    const { address } = await req.json();

    if (!address) {
      return NextResponse.json({ error: "Token address is required" }, { status: 400 });
    }

    let pubKey;
    try {
      pubKey = new PublicKey(address);
    } catch (e) {
      return NextResponse.json({ error: "Invalid Solana Token Address format." }, { status: 400 });
    }

    // Attempt to fetch account info to see if it even exists on-chain
    const accountInfo = await connection.getAccountInfo(pubKey);
    
    // Deterministic mock logic based on the address string
    const seed = address.charCodeAt(1) + address.charCodeAt(address.length - 2);
    
    // If account doesn't exist on devnet, we'll still return a deterministic analysis 
    // just to make the app feel "alive" for the demo, but we'll note it.
    const exists = accountInfo !== null;

    let score = seed % 100;
    let probability = 100 - score;
    const liquidity = `$${(seed * 12345).toLocaleString()}`;
    const holderCount = seed * 14;
    
    const reasons: string[] = [];
    
    if (!exists) {
      score = 10;
      probability = 99;
      reasons.push("❌ CRITICAL: Token account not found on Devnet.");
      reasons.push("❌ Extremely high probability of honeypot or rugged contract.");
    } else if (score < 40) {
      reasons.push("❌ High risk: Top 10 holders own 85% of supply.");
      reasons.push("❌ Liquidity is UNLOCKED.");
      reasons.push("⚠️ Connected to 2 previously flagged deployer wallets.");
    } else if (score > 80) {
      reasons.push("✅ Liquidity locked for 365 days.");
      reasons.push("✅ Dev wallet holds < 2% of supply.");
      reasons.push("✅ Healthy organic transaction volume detected.");
    } else {
      reasons.push("⚠️ Moderate risk: Liquidity unlocks in 14 days.");
      reasons.push("⚠️ Social sentiment is artificially inflated (Bot activity detected).");
      reasons.push("✅ Code contract matches safe SPL Token standards.");
    }

    return NextResponse.json({
      address,
      exists,
      safeScore: score,
      rugProbability: probability,
      metrics: {
        liquidity,
        holderCount: holderCount.toLocaleString()
      },
      reasons
    });

  } catch (error) {
    console.error("Rug Predictor Error:", error);
    return NextResponse.json({ error: "Failed to analyze token data." }, { status: 500 });
  }
}
