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


import { ROUTES } from "@/app/routes";
export function AppSidebar({ role, setRole, activeScreen, setActiveScreen }: any) {
 return (
      <nav className="fixed left-0 top-0 bottom-0 w-24 bg-white border-r border-[#141414]/10 flex flex-col items-center py-8 z-50">
        <div className="mb-14 cursor-pointer group" onClick={() => setRole('NONE')}>
           <div className="w-14 h-14 bg-brand-dark rounded-2xl flex items-center justify-center text-brand-yellow shadow-xl shadow-brand-dark/20 group-hover:scale-110 transition-transform">
              <SyncraLogo size={32} />
           </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-8">
          {role === 'ADMIN' && (
            <>
              <SidebarNavigationItem icon={<Sparkles size={24} />} active={activeScreen === ROUTES.PROPOSAL_BUILDER} onClick={() => setActiveScreen(ROUTES.PROPOSAL_BUILDER)} label="Cohorts" />
              <SidebarNavigationItem icon={<Wrench size={24} />} active={activeScreen === ROUTES.SP_ACTIVITY} onClick={() => setActiveScreen(ROUTES.SP_ACTIVITY)} label="Activity" />
              <SidebarNavigationItem icon={<BarChart3 size={24} />} active={activeScreen === ROUTES.TRACKER} onClick={() => setActiveScreen(ROUTES.TRACKER)} label="Admin" />
            </>
          )}
          {role === 'FOUNDER' && (
            <SidebarNavigationItem icon={<Layers size={24} />} active={activeScreen === ROUTES.FOUNDER_HUB} onClick={() => setActiveScreen(ROUTES.FOUNDER_HUB)} label="Hub" />
          )}
          <SidebarNavigationItem icon={<Search size={24} />} active={activeScreen === ROUTES.DISCOVERY} onClick={() => setActiveScreen(ROUTES.DISCOVERY)} label="Library" />
          <SidebarNavigationItem icon={<Handshake size={24} />} active={activeScreen === ROUTES.NETWORK} onClick={() => setActiveScreen(ROUTES.NETWORK)} label="Network" />
          <SidebarNavigationItem icon={<Bot size={24} />} active={activeScreen === ROUTES.AGENT} onClick={() => setActiveScreen(ROUTES.AGENT)} label="Chat" />
        </div>

        <div className="mt-auto pb-4">
          <Button variant="ghost" size="icon" className="rounded-xl text-[#141414]/20 hover:text-[#141414]" onClick={() => setRole('NONE')}>
            <X size={20} />
          </Button>
        </div>
      </nav>
  );
}