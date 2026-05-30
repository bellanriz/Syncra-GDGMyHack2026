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

export function ComplianceTrendAuditReport({ ecosystem }: { ecosystem: EcosystemData }) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 px-2">
        <div>
          <Badge className="bg-orange-500 text-white mb-4 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">High Priority Analysis</Badge>
          <h1 className="text-5xl font-bold tracking-tighter mb-4 leading-tight">Compliance <span className="italic text-brand-dark/20 font-light">Ecosystem Trend</span></h1>
          <p className="text-brand-dark/40 text-xl font-medium max-w-2xl">Visualizing the 22% upward surge in SSM verification cycles across the Fintech node network.</p>
        </div>
        <div className="w-48 h-48 bg-white rounded-[3rem] shadow-xl flex items-center justify-center relative overflow-hidden border border-brand-bg">
           <div className="text-center relative z-10">
              <p className="text-4xl font-bold text-green-500 tracking-tighter">+22%</p>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Market Delta</p>
           </div>
           <Activity className="absolute inset-0 w-full h-full text-green-500/5 -scale-x-100" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <Card className="lg:col-span-2 rounded-[3.5rem] border-none bg-white p-12 shadow-sm relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-10 tracking-tight">Fintech Sector Verification Pulse</h3>
            <div className="h-[400px] flex items-end gap-4 pb-4">
               {[
                 { label: 'JAN', value: 45, color: 'bg-brand-bg' },
                 { label: 'FEB', value: 52, color: 'bg-brand-bg' },
                 { label: 'MAR', value: 68, color: 'bg-brand-bg' },
                 { label: 'APR', value: 82, color: 'bg-brand-yellow' },
                 { label: 'MAY', value: 94, color: 'bg-brand-dark' }
               ].map(bar => (
                 <div key={bar.label} className="flex-1 flex flex-col items-center gap-4">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${bar.value}%` }}
                      className={`w-full rounded-2xl ${bar.color} shadow-inner transition-all flex items-center justify-center`}
                    >
                      {bar.value > 80 && <CheckCircle2 className="text-white/40" size={24} />}
                    </motion.div>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-30">{bar.label}</span>
                 </div>
               ))}
            </div>
            <div className="absolute top-12 right-12 flex gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-dark" />
                  <span className="text-[10px] font-bold opacity-40 uppercase">Optimized</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-brand-yellow" />
                  <span className="text-[10px] font-bold opacity-40 uppercase">Active Sync</span>
               </div>
            </div>
         </Card>

         <div className="space-y-8">
            <Card className="rounded-[2.5rem] border-none bg-brand-dark text-white p-10 shadow-2xl shadow-brand-dark/20 relative overflow-hidden">
               <h4 className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-6">Top Performers</h4>
               <div className="space-y-6">
                  {ecosystem.companies.filter(c => c.compliance?.ssm === 'VERIFIED').slice(0, 3).map(c => (
                    <div key={c.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                       <Avatar className="w-10 h-10 rounded-xl">
                          <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${c.id}`} />
                       </Avatar>
                       <div className="flex-1">
                          <p className="text-sm font-bold tracking-tight">{c.name}</p>
                          <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest">{c.stage}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <Activity className="absolute -left-10 -bottom-10 w-48 h-48 opacity-5 text-brand-yellow" />
            </Card>

            <Card className="rounded-[2.5rem] border-none bg-white p-10 shadow-sm border border-brand-bg flex flex-col justify-center items-center text-center">
               <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6">
                  <BookOpen size={32} />
               </div>
               <h4 className="text-xl font-bold tracking-tight mb-2">Policy Node v2.1</h4>
               <p className="text-[11px] font-medium text-brand-dark/40 max-w-[200px] mb-6">Next iteration of programmable compliance units releases Q3.</p>
               <Button className="w-full rounded-2xl bg-brand-bg text-brand-dark hover:bg-brand-dark hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest h-12">View Documentation</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}