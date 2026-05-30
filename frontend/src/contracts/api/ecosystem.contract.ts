
export interface ActiveWork { client: string; task: string; status: string; }
export interface Member {
  id: string;
  name: string;
  type: string;
  role?: string;
  expertise?: string[];
  values?: string[];
  bio?: string;
  avatar?: string;
  status?: string;
  stage?: string;
  industry?: string;
  description?: string;
  strength?: number;
  activeWork?: ActiveWork[];
  score?: number;
  needs?: string[];
  compliance?: {
    ssm: string;
    bnm: string;
    lhdn: string;
    lastAuditDate: string;
  };
}
export interface Proposal {
  id: string;
  name: string;
  suggestedMentors: string[];
  suggestedCompanies: string[];
  suggestedPartners: string[];
  suggestedProviders: string[];
  logic: string;
  status: string;
}
export interface Linkage { id?: string; source: string; target: string; type: string; status: string; strength?: number; }
export interface EcosystemData {
  mentors: Member[];
  companies: Member[];
  partners: Member[];
  serviceProviders: Member[];
  programs: Member[];
  linkages: Linkage[];
  proposals: Proposal[];
  analystInsights?: Array<{ id: string; title: string; insight: string; impact: string }>;
}
export interface Message { role: string; content: string; }
