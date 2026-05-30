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

export function RoleSelectionCard({ title, subtitle, icon, onSelect, description }: { title: string; subtitle: string; icon: React.ReactNode; onSelect: () => void; description: string }) {
  return (
    <Card className="rounded-[2rem] border-none bg-white p-8 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer group" onClick={onSelect}>
      <div className="flex items-start gap-6">
        <div className="w-16 h-16 bg-brand-bg rounded-[1.5rem] flex items-center justify-center text-brand-dark group-hover:bg-brand-dark group-hover:text-brand-yellow transition-all shadow-inner">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1 tracking-tight">{title}</h3>
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-brand-dark/30 mb-4">{subtitle}</p>
          <p className="text-xs text-brand-dark/60 leading-relaxed mb-6 font-medium">{description}</p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-brand-dark group-hover:translate-x-2 transition-transform uppercase tracking-widest">
            Enter Dashboard <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </Card>
  );
}