use anchor_lang::prelude::*;

declare_id!("GTXRegYF9q3DkY2pZxwZpP9SxFQp5CjM2c2YdKw");

#[program]
pub mod gtx_registry {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let registry = &mut ctx.accounts.registry;
        registry.admin = ctx.accounts.signer.key();
        registry.total_audits = 0;
        Ok(())
    }

    pub fn record_audit(
        ctx: Context<RecordAudit>,
        target_wallet: Pubkey,
        risk_score: u8,
        risk_level: String,
    ) -> Result<()> {
        let audit = &mut ctx.accounts.audit_record;
        let registry = &mut ctx.accounts.registry;

        audit.auditor = ctx.accounts.auditor.key();
        audit.target_wallet = target_wallet;
        audit.risk_score = risk_score;
        audit.risk_level = risk_level;
        audit.timestamp = Clock::get()?.unix_timestamp;

        registry.total_audits = registry.total_audits.checked_add(1).unwrap();

        msg!(
            "Audit Recorded: Target {}, Score {}, Level {}",
            target_wallet,
            risk_score,
            audit.risk_level
        );

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + 32 + 8, // discriminator + admin pubkey + u64
        seeds = [b"registry"],
        bump
    )]
    pub registry: Account<'info, Registry>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(target_wallet: Pubkey)]
pub struct RecordAudit<'info> {
    #[account(
        init,
        payer = auditor,
        space = 8 + 32 + 32 + 1 + 32 + 8, // discriminator + auditor + target + u8 + string + i64
        seeds = [b"audit", target_wallet.as_ref()],
        bump
    )]
    pub audit_record: Account<'info, AuditRecord>,
    #[account(mut, seeds = [b"registry"], bump)]
    pub registry: Account<'info, Registry>,
    #[account(mut)]
    pub auditor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Registry {
    pub admin: Pubkey,
    pub total_audits: u64,
}

#[account]
pub struct AuditRecord {
    pub auditor: Pubkey,
    pub target_wallet: Pubkey,
    pub risk_score: u8,
    pub risk_level: String,
    pub timestamp: i64,
}
