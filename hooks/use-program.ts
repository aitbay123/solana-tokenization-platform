"use client"

import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { AnchorProvider, web3, BN, Program } from "@coral-xyz/anchor"
import { PublicKey, SystemProgram } from "@solana/web3.js"
import { useMemo } from "react"
import IDL from "../target/idl/asset_tokenization.json"

const PROGRAM_ID = new PublicKey("AssetTokenizationProgram11111111111111111111")

export function useProgram() {
  const { connection } = useConnection()
  const wallet = useWallet()

  const provider = useMemo(() => {
    if (!wallet.publicKey) return null
    return new AnchorProvider(connection, wallet as any, {
      commitment: "confirmed",
    })
  }, [connection, wallet])

  const program = useMemo(() => {
    if (!provider || !wallet.connected) return null
    try {
      return new Program(IDL as any, PROGRAM_ID, provider)
    } catch (error) {
      console.error("Error creating program:", error)
      return null
    }
  }, [provider, wallet.connected])

  const initializeAsset = async (
    assetId: string,
    assetType: number,
    totalSupply: number,
    metadataUri: string,
    valuation: number,
  ) => {
    if (!wallet.publicKey) {
      throw new Error("Wallet not connected")
    }

    // For demo purposes, simulate a transaction
    console.log("Initializing asset:", {
      assetId,
      assetType,
      totalSupply,
      metadataUri,
      valuation,
      owner: wallet.publicKey.toString()
    })

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate a mock transaction signature
    const mockTx = "mock_transaction_" + Date.now()
    const mockAssetKey = web3.Keypair.generate().publicKey

    return { 
      transaction: mockTx, 
      assetPublicKey: mockAssetKey 
    }
  }

  const createListing = async (assetPublicKey: PublicKey, price: number, amount: number) => {
    if (!program || !wallet.publicKey) {
      throw new Error("Wallet not connected or program not loaded")
    }

    if (!price || !amount || price <= 0 || amount <= 0) {
      throw new Error("Invalid price or amount")
    }

    const listingKeypair = web3.Keypair.generate()

    try {
      const tx = await program.methods
        .createListing(new BN(price), new BN(amount))
        .accounts({
          listing: listingKeypair.publicKey,
          asset: assetPublicKey,
          seller: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([listingKeypair])
        .rpc()

      return { transaction: tx, listingPublicKey: listingKeypair.publicKey }
    } catch (error) {
      console.error("Error creating listing:", error)
      throw new Error("Failed to create listing")
    }
  }

  return {
    program,
    provider,
    initializeAsset,
    createListing,
    connected: !!wallet.connected,
    publicKey: wallet.publicKey,
  }
}
