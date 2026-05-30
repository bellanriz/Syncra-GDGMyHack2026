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

export function SidebarNavigationItem({ icon, active, onClick, label }: { icon: React.ReactNode; active: boolean; onClick: () => void; label: string }) {
  return (
    <div 
      className={`group relative cursor-pointer flex items-center justify-center w-12 h-12 rounded-[1.2rem] transition-all duration-500 ${
        active ? 'bg-brand-dark text-brand-yellow shadow-xl scale-110' : 'text-brand-dark/20 hover:text-brand-dark hover:bg-white/80'
      }`}
      onClick={onClick}
    >
      {icon}
      <div className="absolute left-16 px-4 py-2 bg-brand-dark text-white text-[10px] uppercase font-bold tracking-widest rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-2xl">
        {label}
      </div>
    </div>
  );
}