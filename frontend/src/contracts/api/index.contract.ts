
export enum UserRole { PROGRAM_ADMIN = 'ADMIN', FOUNDER = 'FOUNDER', NONE = 'NONE' }
export enum EcosystemEntityType { MENTOR = 'MENTOR', PARTNER = 'PARTNER', SERVICE_PROVIDER = 'SERVICE_PROVIDER', COMPANY = 'COMPANY', PROGRAM = 'PROGRAM' }
export enum ComplianceAuthority { SSM = 'SSM', BNM = 'BNM', LHDN = 'LHDN' }
export enum SsmComplianceStatus { VERIFIED = 'VERIFIED', PENDING = 'PENDING', EXPIRED = 'EXPIRED' }
export enum BnmComplianceStatus { CLEARED = 'CLEARED', UNDER_REVIEW = 'UNDER_REVIEW', FLAGGED = 'FLAGGED' }
export enum TaxComplianceStatus { ACTIVE = 'ACTIVE', AUDIT = 'AUDIT', LATE = 'LATE' }
export enum CohortProposalStatus { PENDING = 'PENDING', APPROVED = 'APPROVED', DISMISSED = 'DISMISSED' }
export enum ProgramStatus { ONGOING = 'ONGOING', REGISTERING = 'REGISTERING', COMPLETED = 'COMPLETED' }
export enum GovernanceInsightImpact { LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH', CRITICAL = 'CRITICAL' }
export enum AuditType { COMPLIANCE_TREND = 'COMPLIANCE_TREND', SCALE_UP_VELOCITY = 'SCALE_UP_VELOCITY', RISK_ALERT = 'RISK_ALERT', MENTOR_PERFORMANCE = 'MENTOR_PERFORMANCE', OVERVIEW = 'OVERVIEW' }
export enum AssistantMessageRole { USER = 'user', ASSISTANT = 'bot' }
