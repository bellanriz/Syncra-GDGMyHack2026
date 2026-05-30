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



export function EcosystemDirectoryScreen({ filteredMembers, networkFilter, setNetworkFilter, setSelectedCompanyId }: any) {
 return (            <motion.div 
              key="network"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-4"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-3 text-center lg:text-left">Ecosystem Directory</h1>
                  <p className="text-sm font-medium text-brand-dark opacity-40 text-center lg:text-left uppercase tracking-widest">A unified hub for verified ecosystem founders, mentors, and partners.</p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-2 rounded-[2rem] shadow-sm border border-brand-dark/5">
                  <EntityTypeFilterToggle label="All Entities" active={networkFilter === 'ALL'} onClick={() => setNetworkFilter('ALL')} />
                  <EntityTypeFilterToggle label="Mentors" active={networkFilter === 'MENTOR'} onClick={() => setNetworkFilter('MENTOR')} />
                  <EntityTypeFilterToggle label="Partners" active={networkFilter === 'PARTNER'} onClick={() => setNetworkFilter('PARTNER')} />
                  <EntityTypeFilterToggle label="Providers" active={networkFilter === 'SERVICE_PROVIDER'} onClick={() => setNetworkFilter('SERVICE_PROVIDER')} />
                  <EntityTypeFilterToggle label="Ventures" active={networkFilter === 'COMPANY'} onClick={() => setNetworkFilter('COMPANY')} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                 {filteredMembers.map(member => (
                   <EcosystemEntityCard key={member.id} member={member} onCompanyClick={setSelectedCompanyId} />
                 ))}
              </div>
            </motion.div>);
}