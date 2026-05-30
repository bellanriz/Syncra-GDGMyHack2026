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

export function MetricSummaryCard({ title, value, trend }: { title: string, value: string | number, trend: string }) {
  return (
    <Card className="rounded-[2.5rem] border-none bg-white p-8 shadow-sm group hover:scale-[1.02] transition-all">
       <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40 mb-4">{title}</p>
       <div className="flex items-end justify-between">
          <p className="text-4xl font-bold tracking-tight text-brand-dark">{value}</p>
          <p className="text-[11px] font-bold text-green-500 mb-1 bg-green-50 px-3 py-1 rounded-full">{trend}</p>
       </div>
    </Card>
  );
}