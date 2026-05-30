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

export function AssistantPromptSuggestion({ text, icon }: { text: string, icon: React.ReactNode }) {
  return (
    <div className="p-8 bg-white border border-brand-bg rounded-[2.5rem] flex items-center gap-6 hover:bg-brand-bg hover:scale-[1.02] transition-all cursor-pointer group shadow-sm border-brand-dark/5">
       <div className="w-14 h-14 rounded-[1.2rem] bg-brand-bg group-hover:bg-brand-dark text-brand-dark group-hover:text-brand-yellow flex items-center justify-center transition-all shadow-inner">
          {icon}
       </div>
       <span className="text-base font-bold tracking-tight text-brand-dark/70 group-hover:text-brand-dark transition-colors">{text}</span>
    </div>
  );
}