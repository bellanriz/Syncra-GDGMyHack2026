import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, MessageSquare, Search, BarChart3, Bot, Heart, X, Send, ChevronRight, ChevronLeft, ExternalLink, ArrowLeft, Activity, BookOpen, CheckCircle2, Clock, Sparkles, ShieldCheck, Building2, Handshake, Wrench, Layers, Filter, ArrowRight, TrendingUp, Target, Shield, Circle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SyncraLogo } from '@/components/common/SyncraLogo';
import { UserRole, EcosystemEntityType, ComplianceAuthority, SsmComplianceStatus, BnmComplianceStatus, TaxComplianceStatus, CohortProposalStatus, ProgramStatus, GovernanceInsightImpact, AuditType, AssistantMessageRole } from '@/contracts/api/index.contract';
import { ActiveWork, Member, Proposal, Linkage, EcosystemData, Message } from '@/contracts/api/ecosystem.contract';

import { RoleSelectionCard } from '@/features/auth/components/RoleSelectionCard';
import { SidebarNavigationItem } from '@/components/layout/SidebarNavigationItem';
import { EcosystemResourceListItem } from '@/features/ecosystem/components/EcosystemResourceListItem';
import { EcosystemEntityCard } from '@/features/ecosystem/components/EcosystemEntityCard';
import { MetricSummaryCard } from '@/components/common/MetricSummaryCard';
import { EntityTypeFilterToggle } from '@/features/ecosystem/components/EntityTypeFilterToggle';
import { AssistantPromptSuggestion } from '@/features/assistant/components/AssistantPromptSuggestion';
import { ProgressMetricRow } from '@/components/common/ProgressMetricRow';
import { EcosystemLinkageItem } from '@/features/ecosystem/components/EcosystemLinkageItem';
import { SectionHeader } from '@/components/common/SectionHeader';

import { GovernanceAuditOverviewReport } from '@/features/governance/reports/GovernanceAuditOverviewReport';
import { ComplianceTrendAuditReport } from '@/features/governance/reports/ComplianceTrendAuditReport';
import { ScaleUpVelocityAuditReport } from '@/features/governance/reports/ScaleUpVelocityAuditReport';
import { RegulatoryRiskAuditReport } from '@/features/governance/reports/RegulatoryRiskAuditReport';
import { MentorPerformanceAuditReport } from '@/features/governance/reports/MentorPerformanceAuditReport';


export function GovernanceAuditReportScreen({ activeAuditType, setShowFullAuditReport, setActiveAuditType, ecosystem }: any) {
 return (
      <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-dark selection:text-white pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Button 
              variant="ghost" 
              onClick={() => {
                setShowFullAuditReport(false);
                setActiveAuditType(null);
              }}
              className="group -ml-4 mb-20 text-brand-dark/40 hover:text-brand-dark transition-all font-bold text-xs uppercase tracking-widest"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-2 transition-transform" />
              BACK TO GOVERNANCE HUB
            </Button>

            {activeAuditType === 'Compliance Trend' && <ComplianceTrendAuditReport ecosystem={ecosystem} />}
            {activeAuditType === 'Scale-up Velocity' && <ScaleUpVelocityAuditReport ecosystem={ecosystem} />}
            {activeAuditType === 'Risk Alert' && <RegulatoryRiskAuditReport ecosystem={ecosystem} />}
            {activeAuditType === 'Mentor Performance' && <MentorPerformanceAuditReport ecosystem={ecosystem} />}
            {!activeAuditType && <GovernanceAuditOverviewReport ecosystem={ecosystem} />}
            
          </motion.div>
        </div>
      </div>
    );
}