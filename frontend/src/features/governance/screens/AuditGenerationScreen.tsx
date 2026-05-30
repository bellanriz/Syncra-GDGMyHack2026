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



export function AuditGenerationScreen({ auditProgress }: any) {
 return (      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="relative w-40 h-40 mx-auto mb-16">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border-t-2 border-brand-yellow rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute inset-4 border-b-2 border-brand-yellow/20 rounded-full"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="text-brand-yellow animate-pulse" size={48} />
             </div>
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight mb-4 text-brand-yellow">Synthesizing Audit Data</h2>
          <p className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase mb-12">Ecosystem Analysis in Progress</p>
          
          <div className="space-y-6">
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 className="h-full bg-brand-yellow"
                 animate={{ width: `${auditProgress}%` }}
               />
            </div>
            <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-brand-yellow/60">
               <span>{auditProgress < 30 ? 'SSM INDEXING' : auditProgress < 60 ? 'BNM FORENSICS' : auditProgress < 90 ? 'LHDN RECONCILIATION' : 'FINALIZING REPORT'}</span>
               <span className="text-brand-yellow">{auditProgress}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
}