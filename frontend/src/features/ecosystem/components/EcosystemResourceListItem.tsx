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

export function EcosystemResourceListItem({ item }: { item: Member; key?: React.Key }) {
  return (
    <Card className="rounded-2xl border-[#141414]/5 bg-white p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group">
       <div className="flex items-start gap-5">
          <Avatar className="w-14 h-14 rounded-xl">
             <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.id}`} />
          </Avatar>
          <div className="flex-1">
             <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium">{item.name}</h4>
                <Badge variant="outline" className="text-[8px] font-mono tracking-[0.2em]">{item.type.replace('_', ' ')}</Badge>
             </div>
             <p className="text-xs text-[#141414]/60 line-clamp-1 mb-4">{item.bio}</p>
             <div className="flex gap-4">
                {item.expertise?.slice(0, 2).map(skill => (
                  <span key={skill} className="text-[10px] font-mono text-[#141414]/40">{skill}</span>
                ))}
             </div>
          </div>
          <ChevronRight size={16} className="text-[#141414]/10 group-hover:text-[#141414] transition-colors" />
       </div>
    </Card>
  );
}