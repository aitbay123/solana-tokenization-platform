use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("AssetTokenizationProgram11111111111111111111");

#[program]
pub mod asset_tokenization {
    use super::*;

    // Initialize a new asset for tokenization
    pub fn initialize_asset(
        ctx: Context<InitializeAsset>,
        asset_id: String,
        asset_type: AssetType,
        total_supply: u64,
        metadata_uri: String,
        valuation: u64,
    ) -> Result<()> {
        let asset = &mut ctx.accounts.asset;
        asset.owner = ctx.accounts.owner.key();
        asset.asset_id = asset_id;
        asset.asset_type = asset_type;
        asset.total_supply = total_supply;
        asset.circulating_supply = 0;
        asset.metadata_uri = metadata_uri;
        asset.valuation = valuation;
        asset.is_active = true;
        asset.created_at = Clock::get()?.unix_timestamp;
        
        Ok(())
    }

    // Mint tokens for an asset
    pub fn mint_asset_tokens(
        ctx: Context<MintAssetTokens>,
        amount: u64,
    ) -> Result<()> {
        let asset = &mut ctx.accounts.asset;
        
        require!(asset.is_active, ErrorCode::AssetNotActive);
        require!(
            asset.circulating_supply + amount <= asset.total_supply,
            ErrorCode::ExceedsMaxSupply
        );

        // Mint tokens to the recipient
        let cpi_accounts = token::MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.recipient_token_account.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::mint_to(cpi_ctx, amount)?;
        
        asset.circulating_supply += amount;
        
        Ok(())
    }

    // Transfer asset tokens between users
    pub fn transfer_asset_tokens(
        ctx: Context<TransferAssetTokens>,
        amount: u64,
    ) -> Result<()> {
        let cpi_accounts = Transfer {
            from: ctx.accounts.from_token_account.to_account_info(),
            to: ctx.accounts.to_token_account.to_account_info(),
            authority: ctx.accounts.authority.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::transfer(cpi_ctx, amount)?;
        
        Ok(())
    }

    // Create a marketplace listing
    pub fn create_listing(
        ctx: Context<CreateListing>,
        price: u64,
        amount: u64,
    ) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        listing.seller = ctx.accounts.seller.key();
        listing.asset = ctx.accounts.asset.key();
        listing.price = price;
        listing.amount = amount;
        listing.is_active = true;
        listing.created_at = Clock::get()?.unix_timestamp;
        
        Ok(())
    }

    // Execute a purchase from marketplace
    pub fn purchase_from_listing(
        ctx: Context<PurchaseFromListing>,
        amount: u64,
    ) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        
        require!(listing.is_active, ErrorCode::ListingNotActive);
        require!(amount <= listing.amount, ErrorCode::InsufficientListingAmount);
        
        let total_price = listing.price * amount;
        
        // Transfer SOL from buyer to seller
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.buyer.key(),
            &ctx.accounts.seller.key(),
            total_price,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.buyer.to_account_info(),
                ctx.accounts.seller.to_account_info(),
            ],
        )?;

        // Transfer tokens from seller to buyer
        let cpi_accounts = Transfer {
            from: ctx.accounts.seller_token_account.to_account_info(),
            to: ctx.accounts.buyer_token_account.to_account_info(),
            authority: ctx.accounts.seller.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        
        token::transfer(cpi_ctx, amount)?;
        
        listing.amount -= amount;
        if listing.amount == 0 {
            listing.is_active = false;
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeAsset<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + Asset::INIT_SPACE
    )]
    pub asset: Account<'info, Asset>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct MintAssetTokens<'info> {
    #[account(mut)]
    pub asset: Account<'info, Asset>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    #[account(mut)]
    pub recipient_token_account: Account<'info, TokenAccount>,
    pub mint_authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct TransferAssetTokens<'info> {
    #[account(mut)]
    pub from_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to_token_account: Account<'info, TokenAccount>,
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CreateListing<'info> {
    #[account(
        init,
        payer = seller,
        space = 8 + Listing::INIT_SPACE
    )]
    pub listing: Account<'info, Listing>,
    pub asset: Account<'info, Asset>,
    #[account(mut)]
    pub seller: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct PurchaseFromListing<'info> {
    #[account(mut)]
    pub listing: Account<'info, Listing>,
    #[account(mut)]
    pub buyer: Signer<'info>,
    /// CHECK: This is safe as we're only transferring SOL to this account
    #[account(mut)]
    pub seller: AccountInfo<'info>,
    #[account(mut)]
    pub buyer_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub seller_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Asset {
    pub owner: Pubkey,
    #[max_len(50)]
    pub asset_id: String,
    pub asset_type: AssetType,
    pub total_supply: u64,
    pub circulating_supply: u64,
    #[max_len(200)]
    pub metadata_uri: String,
    pub valuation: u64,
    pub is_active: bool,
    pub created_at: i64,
}

#[account]
#[derive(InitSpace)]
pub struct Listing {
    pub seller: Pubkey,
    pub asset: Pubkey,
    pub price: u64,
    pub amount: u64,
    pub is_active: bool,
    pub created_at: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub enum AssetType {
    RealEstate,
    Art,
    Music,
    Gaming,
}

#[error_code]
pub enum ErrorCode {
    #[msg("Asset is not active")]
    AssetNotActive,
    #[msg("Amount exceeds maximum supply")]
    ExceedsMaxSupply,
    #[msg("Listing is not active")]
    ListingNotActive,
    #[msg("Insufficient amount in listing")]
    InsufficientListingAmount,
}
