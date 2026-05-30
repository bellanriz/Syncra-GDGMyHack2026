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



export function RoleSelectionScreen({ setRole }: any) {
 return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 lg:p-12">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-24 h-24 bg-brand-dark rounded-[2rem] flex items-center justify-center text-brand-yellow mb-10 shadow-2xl relative"
            >
              <SyncraLogo size={60} />
              <div className="absolute -inset-4 bg-brand-yellow/5 rounded-[2.5rem] animate-pulse -z-10" />
            </motion.div>
            <h1 className="text-7xl font-bold tracking-tighter mb-6 leading-[0.9]">
              Syncra. <br/>
              <span className="text-brand-yellow italic font-medium">Ecosystem Intelligence.</span>
            </h1>
            <p className="text-brand-dark opacity-50 mb-10 max-w-sm leading-relaxed text-lg font-medium text-balance">
              The command center for Cradle's programmable linkages and automated regulatory units.
            </p>
            <div className="flex gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <Avatar key={i} className="w-10 h-10 border-4 border-brand-bg rounded-full">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} />
                  </Avatar>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">Trusted by</p>
                <p className="text-xs font-bold text-brand-dark">1,200+ Ecosystem Entities</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            <RoleSelectionCard 
              title="Programme Administrator" 
              subtitle="Cradle Dashboard" 
              onSelect={() => setRole('ADMIN')}
              icon={<SyncraLogo size={36} />}
              description="Monitor compliance, track program velocity, and manage regulatory linkages across the ecosystem."
            />
            <RoleSelectionCard 
              title="Startup Founder" 
              subtitle="Participant / Venture" 
              onSelect={() => setRole('FOUNDER')}
              icon={<Building2 size={32} />}
              description="Access the founder hub, view compliance reports, and request strategic mentorship linkages."
            />
          </div>
        </div>
      </div>
    );
}