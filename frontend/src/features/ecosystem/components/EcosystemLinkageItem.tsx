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

export function EcosystemLinkageItem({ source, target, type, status, strength }: { source: string; target: string; type: string; status: string; strength: number; key?: React.Key }) {
  return (
    <div className="group flex items-center gap-6 p-5 rounded-2xl border border-transparent hover:border-[#141414]/5 hover:bg-[#F5F5F0] transition-all cursor-pointer">
      <div className="flex flex-col items-center">
         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#141414]/40 border border-[#141414]/5">
            <Users size={18} />
         </div>
      </div>
      
      <div className="flex-1 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">{source} <span className="mx-2 opacity-20">→</span> {target}</h4>
            <Badge variant="outline" className={`text-[8px] uppercase tracking-widest ${status === 'VERIFIED' ? 'bg-blue-50' : 'bg-green-50'}`}>{status}</Badge>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#141414]/40 uppercase tracking-widest">
            <span>{type.replace('_', ' ')}</span>
            <span>Link Strength: {strength}%</span>
          </div>
        </div>
      </div>
      
      <div className="w-1.5 h-10 bg-[#F5F5F0] rounded-full overflow-hidden">
         <div className="w-full bg-[#141414]" style={{ height: `${strength}%` }} />
      </div>
    </div>
  );
}