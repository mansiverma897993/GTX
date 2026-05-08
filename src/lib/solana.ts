import { Connection, PublicKey } from '@solana/web3.js';

// Setup connection to Helius/QuickNode/Solana Mainnet
export const connection = new Connection(
  process.env.NEXT_PUBLIC_RPC_URL || 'https://api.mainnet-beta.solana.com',
  'confirmed'
);

export const isValidSolanaAddress = (address: string) => {
  try {
    new PublicKey(address);
    return true;
  } catch (error) {
    return false;
  }
};
