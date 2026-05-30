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

export function RegulatoryRiskAuditReport({ ecosystem }: { ecosystem: EcosystemData }) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 px-2">
        <div>
          <Badge className="bg-red-500 text-white mb-4 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">Critical Security Protocol</Badge>
          <h1 className="text-5xl font-bold tracking-tighter mb-4 leading-tight">Risk <span className="text-red-500 italic font-medium">Alert</span> Matrix</h1>
          <p className="text-brand-dark/40 text-xl font-medium max-w-2xl">LHDN audit synchronization delays detected. System stability requires immediate node verification for sector: <span className="text-brand-dark font-bold underline decoration-red-500 underline-offset-4 decoration-2">SaaS / Retail</span>.</p>
        </div>
        <div className="flex gap-4">
           <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center animate-pulse">
              <Shield size={32} />
           </div>
           <div className="w-16 h-16 bg-brand-dark text-white rounded-2xl flex items-center justify-center">
              <Wrench size={32} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            <Card className="rounded-[3rem] border-none bg-white p-10 shadow-sm border-l-8 border-red-500">
               <h3 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-3">
                  Affected Hub Nodes
                  <Badge variant="outline" className="border-red-100 text-red-500 bg-red-50">MANUAL ACTION REQUIRED</Badge>
               </h3>
               <div className="space-y-6">
                  {ecosystem.companies.filter(c => c.compliance?.lhdn === 'LATE' || c.compliance?.lhdn === 'AUDIT').map(company => (
                    <div key={company.id} className="flex items-center justify-between p-6 rounded-3xl bg-brand-bg transition-all hover:bg-white hover:shadow-lg border border-transparent hover:border-brand-bg">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white shadow-inner flex items-center justify-center">
                             <Avatar className="w-12 h-12 rounded-lg">
                                <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${company.id}`} />
                             </Avatar>
                          </div>
                          <div>
                             <p className="text-lg font-bold tracking-tight">{company.name}</p>
                             <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest">{company.industry} • {company.compliance?.lhdn} STATUS</p>
                          </div>
                       </div>
                       <Button className="rounded-full bg-brand-dark text-white px-8 h-12 text-[10px] font-bold uppercase tracking-widest">Invoke Audit Sync</Button>
                    </div>
                  ))}
               </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <Card className="rounded-[2.5rem] border-none bg-brand-dark text-white p-10 relative overflow-hidden group">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6">Security Integrity</h4>
                  <div className="text-5xl font-bold mb-4 tracking-tighter">98.2%</div>
                  <p className="text-white/40 text-xs font-medium leading-relaxed">Infrastructure stability remains nominal despite regulatory node delays.</p>
                  <Activity className="absolute -right-8 -bottom-8 w-40 h-40 opacity-5 group-hover:scale-110 transition-transform" />
               </Card>
               <Card className="rounded-[2.5rem] border-none bg-white p-10 shadow-sm border border-brand-bg flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30 mb-8">System Response</h4>
                    <p className="text-lg font-bold tracking-tight leading-tight mb-4">Cradle Ledger has isolated flagged packets.</p>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-green-500" />
                     <div className="w-3 h-3 rounded-full bg-green-500" />
                     <div className="w-3 h-3 rounded-full bg-brand-bg" />
                  </div>
               </Card>
            </div>
         </div>

         <div className="space-y-8">
            <Card className="rounded-[3rem] border-none bg-white p-10 shadow-sm border border-brand-bg">
               <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30 mb-10">LHDN Protocol Checklist</h4>
               <div className="space-y-8">
                  {[
                    { label: 'Registry Reconciliation', status: 'COMPLETE', date: '02 MAY' },
                    { label: 'SaaS Sector Review', status: 'IN_PROGRESS', date: 'CURRENT' },
                    { label: 'Tax Token Emission', status: 'PENDING', date: 'EST. 20 MAY' },
                    { label: 'Final Ledger Sync', status: 'LOCKED', date: 'WAITING' }
                  ].map(step => (
                    <div key={step.label} className="flex gap-4">
                       <div className="shrink-0 flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.status === 'COMPLETE' ? 'bg-green-500' : step.status === 'IN_PROGRESS' ? 'bg-brand-yellow' : 'bg-brand-bg'}`}>
                             {step.status === 'COMPLETE' && <CheckCircle2 size={12} className="text-white" />}
                          </div>
                          <div className="w-0.5 flex-1 bg-brand-bg my-1" />
                       </div>
                       <div className="pb-8">
                          <p className="text-sm font-bold tracking-tight mb-1">{step.label}</p>
                          <div className="flex items-center gap-2">
                             <span className="text-[9px] font-bold uppercase tracking-widest opacity-30">{step.date}</span>
                             <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${step.status === 'COMPLETE' ? 'text-green-500' : step.status === 'IN_PROGRESS' ? 'text-brand-dark' : 'text-brand-dark/20'}`}>{step.status}</span>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </Card>

            <Card className="rounded-[2.5rem] border-none bg-red-50 text-red-600 p-8 flex flex-col items-center text-center">
               <Activity size={32} className="mb-4" />
               <p className="text-[10px] font-bold uppercase tracking-widest mb-6">Contact Risk Specialist</p>
               <Button className="w-full rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all font-bold text-[10px] uppercase tracking-widest h-12 shadow-lg shadow-red-500/20">Open Secure Channel</Button>
            </Card>
         </div>
      </div>
    </div>
  );
}