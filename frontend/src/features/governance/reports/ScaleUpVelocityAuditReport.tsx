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

export function ScaleUpVelocityAuditReport({ ecosystem }: { ecosystem: EcosystemData }) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 px-2">
        <div>
          <Badge className="bg-blue-500 text-white mb-4 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">Ecosystem Rocket Metrics</Badge>
          <h1 className="text-5xl font-bold tracking-tighter mb-4 leading-tight">Scale-up <span className="font-light text-brand-dark/30 underline decoration-brand-yellow decoration-4 underline-offset-8 transform -rotate-1 inline-block">Velocity</span></h1>
          <p className="text-brand-dark/40 text-xl font-medium max-w-2xl">Real-time analysis of the top 15% growth nodes exhibiting extreme ecosystem vitality and linkage activity.</p>
        </div>
        <div className="flex gap-4">
           <div className="w-32 h-32 bg-brand-dark rounded-3xl flex flex-col items-center justify-center text-brand-yellow shadow-2xl">
              <TrendingUp size={24} className="mb-2" />
              <span className="text-2xl font-bold">15%</span>
           </div>
           <div className="w-32 h-32 bg-white rounded-3xl flex flex-col items-center justify-center text-brand-dark shadow-sm border border-brand-bg">
              <Target size={24} className="mb-2 opacity-20" />
              <span className="text-2xl font-bold">A+</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { name: 'Aerodyne', velocity: 98, linkage: 12, trend: '+4.2%' },
          { name: 'Carsome', velocity: 94, linkage: 8, trend: '+2.8%' },
          { name: 'Grab', velocity: 99, linkage: 24, trend: '+0.5%' },
          { name: 'ZenPay', velocity: 88, linkage: 6, trend: '+12.4%' }
        ].map(node => (
          <Card key={node.name} className="rounded-[2.5rem] border-none bg-white p-8 shadow-sm group hover:bg-brand-dark hover:text-white transition-all overflow-hidden relative">
             <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                   <h3 className="text-2xl font-bold tracking-tighter">{node.name}</h3>
                   <Badge className="bg-green-500 text-white border-none text-[9px] font-bold px-2 py-0.5 rounded-md">{node.trend}</Badge>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                      <span>Velocity Score</span>
                      <span>{node.velocity}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-brand-bg/50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${node.velocity}%` }}
                        className="h-full bg-brand-yellow" 
                      />
                   </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                   <div className="text-[10px] font-bold uppercase tracking-widest opacity-30">Active Linkages</div>
                   <div className="text-xl font-bold">{node.linkage}</div>
                </div>
             </div>
             <Sparkles className="absolute -right-6 -top-6 w-24 h-24 opacity-5 group-hover:opacity-10 group-hover:text-brand-yellow transition-all" />
          </Card>
        ))}
      </div>

      <Card className="rounded-[3rem] border-none bg-white p-12 shadow-sm relative overflow-hidden">
         <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/3">
               <h3 className="text-3xl font-bold tracking-tight mb-6">Growth Vector <span className="text-brand-yellow underline decoration-brand-dark/10 decoration-2 underline-offset-4">Logic</span></h3>
               <p className="text-brand-dark/50 text-sm leading-relaxed mb-10 font-medium">Linkage patterns show that nodes engaging in early mentorship-to-partner transitions exhibit 3.4x higher survival rates during Series B rounds.</p>
               <Button className="rounded-full bg-brand-dark text-brand-yellow px-10 h-14 font-bold text-xs uppercase tracking-widest shadow-xl shadow-brand-dark/20">Analyze My Node</Button>
            </div>
            <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="aspect-square bg-brand-bg rounded-3xl flex items-center justify-center p-6 hover:scale-105 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="text-center z-10">
                       <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-2">Sector {i}</p>
                       <p className="text-xs font-bold text-brand-dark">Linkage {i * 12}</p>
                    </div>
                    <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/10 transition-colors" />
                 </div>
               ))}
            </div>
         </div>
      </Card>
    </div>
  );
}