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

export function MentorPerformanceAuditReport({ ecosystem }: { ecosystem: EcosystemData }) {
  const activeMentors = ecosystem.mentors;
  
  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 px-2">
        <div>
          <Badge className="bg-brand-dark text-brand-yellow mb-4 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">Expert Network Analysis</Badge>
          <h1 className="text-5xl font-bold tracking-tighter mb-4 leading-tight">Mentor <span className="text-brand-yellow italic font-medium">Analyst</span> View</h1>
          <p className="text-brand-dark/40 text-xl font-medium max-w-2xl">Visualizing active guidance nodes and session efficacy across the Cradle ecosystem.</p>
        </div>
        <div className="flex gap-4">
           <Card className="bg-white p-6 rounded-2xl shadow-sm border border-brand-bg flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-yellow/10 text-brand-yellow rounded-xl flex items-center justify-center">
                 <Users size={24} />
              </div>
              <div>
                 <p className="text-2xl font-bold">{activeMentors.length}</p>
                 <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Active Nodes</p>
              </div>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {activeMentors.map(mentor => (
           <Card key={mentor.id} className="rounded-[2.5rem] border-none bg-white p-8 shadow-sm group hover:shadow-xl transition-all border border-transparent hover:border-brand-bg">
              <div className="flex gap-6 items-start">
                 <div className="relative">
                    <Avatar className="w-20 h-20 rounded-2xl shadow-lg border-2 border-white">
                       <AvatarImage src={mentor.avatar} />
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center border-2 border-white text-white">
                       <CheckCircle2 size={16} />
                    </div>
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                          <h3 className="text-2xl font-bold tracking-tight">{mentor.name}</h3>
                          <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest">{mentor.role}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-3xl font-bold text-brand-dark tracking-tighter">Active</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Status</p>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                       {mentor.expertise?.map(exp => (
                         <Badge key={exp} variant="secondary" className="bg-brand-bg text-brand-dark border-none text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                            {exp}
                         </Badge>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-brand-bg">
                 <div className="text-center">
                    <p className="text-lg font-bold">12</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Sessions</p>
                 </div>
                 <div className="text-center border-x border-brand-bg">
                    <p className="text-lg font-bold">96%</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Satisfaction</p>
                 </div>
                 <div className="text-center">
                    <p className="text-lg font-bold">+18%</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Impact Delta</p>
                 </div>
              </div>

              <div className="mt-8 flex gap-3">
                 <Button className="flex-1 rounded-2xl bg-brand-dark text-white text-[10px] uppercase font-bold tracking-widest h-12">View History</Button>
                 <Button variant="outline" className="rounded-2xl border-brand-dark/10 text-[10px] uppercase font-bold tracking-widest h-12">Contact</Button>
              </div>
           </Card>
         ))}
      </div>

      <Card className="rounded-[3rem] border-none bg-brand-dark text-white p-12 relative overflow-hidden">
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-md">
               <h3 className="text-3xl font-bold mb-4 tracking-tight">Mentorship <span className="text-brand-yellow">Efficacy</span> Engine</h3>
               <p className="opacity-40 text-sm leading-relaxed mb-8">Our AI analyzes session transcripts to provide objective qualitative insights and skill transfer metrics between mentors and founders.</p>
               <Button className="bg-brand-yellow text-brand-dark rounded-full px-10 h-14 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform">Configure Efficacy Rules</Button>
            </div>
            <div className="flex -space-x-10">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-2 backdrop-blur-md">
                    <div className="w-full h-full rounded-full bg-brand-yellow" style={{ opacity: i * 0.2 }} />
                 </div>
               ))}
            </div>
         </div>
         <Activity className="absolute -left-20 -top-20 w-80 h-80 opacity-5" />
      </Card>
    </div>
  );
}