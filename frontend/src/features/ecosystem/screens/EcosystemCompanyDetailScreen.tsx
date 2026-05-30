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

import { RoleSelectionCard } from '@/features/auth/components/RoleSelectionCard';
import { SidebarNavigationItem } from '@/components/layout/SidebarNavigationItem';
import { EcosystemResourceListItem } from '@/features/ecosystem/components/EcosystemResourceListItem';
import { EcosystemEntityCard } from '@/features/ecosystem/components/EcosystemEntityCard';
import { MetricSummaryCard } from '@/components/common/MetricSummaryCard';
import { EntityTypeFilterToggle } from '@/features/ecosystem/components/EntityTypeFilterToggle';
import { AssistantPromptSuggestion } from '@/features/assistant/components/AssistantPromptSuggestion';
import { ProgressMetricRow } from '@/components/common/ProgressMetricRow';
import { EcosystemLinkageItem } from '@/features/ecosystem/components/EcosystemLinkageItem';
import { SectionHeader } from '@/components/common/SectionHeader';



export function EcosystemCompanyDetailScreen({ selectedCompany, selectedCompanyId, setSelectedCompanyId, ecosystem }: any) {
 return (
      <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-dark selection:text-white pb-20">
        <div className="max-w-7xl mx-auto px-6 pt-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Button 
              variant="ghost" 
              onClick={() => setSelectedCompanyId(null)}
              className="group -ml-4 mb-12 text-brand-dark/40 hover:text-brand-dark transition-all font-bold text-xs uppercase tracking-widest"
            >
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-2 transition-transform" />
              BACK TO ECOSYSTEM DIRECTORY
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
               <div className="flex items-center gap-10">
                  <div className="w-32 h-32 rounded-[2.5rem] bg-white shadow-2xl border-none flex items-center justify-center overflow-hidden shrink-0 border-4 border-white">
                     <Avatar className="w-full h-full rounded-none">
                        <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${selectedCompany.id}`} />
                     </Avatar>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                       <h1 className="text-5xl font-bold tracking-tight">{selectedCompany.name}</h1>
                       <Badge className="bg-brand-yellow text-brand-dark border-none uppercase font-bold text-[10px] tracking-widest px-4 py-1.5 rounded-full shadow-sm">{selectedCompany.stage}</Badge>
                    </div>
                    <p className="text-brand-dark/40 text-xl font-medium tracking-tight">{selectedCompany.industry} • Verified Node</p>
                  </div>
               </div>
               <div className="flex gap-4 w-full md:w-auto">
                  <Button className="flex-1 md:flex-none bg-brand-dark text-brand-yellow rounded-full px-12 h-14 text-sm font-bold uppercase tracking-widest shadow-xl shadow-brand-dark/10">Request Audit</Button>
                  <Button variant="outline" className="rounded-full h-14 w-14 border-brand-dark/10 text-brand-dark hover:bg-white"><ExternalLink size={20}/></Button>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
               <div className="lg:col-span-2 space-y-10">
                  <Card className="rounded-[2.2rem] border-none bg-white p-10 shadow-sm relative overflow-hidden">
                     <h3 className="text-xl font-bold mb-6 tracking-tight">Venture DNA</h3>
                     <p className="text-brand-dark/60 leading-relaxed mb-8 text-base font-medium relative z-10">
                        {selectedCompany.bio || `Verified ecosystem company ${selectedCompany.name} is a strategic leader.`}
                     </p>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-brand-bg relative z-10">
                        <div>
                           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/30 mb-4">Guiding Principles</h4>
                           <div className="flex flex-wrap gap-2">
                              {selectedCompany.values?.slice(0, 4).map(val => (
                                <Badge key={val} className="bg-brand-bg text-brand-dark border-none rounded-full px-4 py-1.5 font-bold uppercase tracking-widest text-[8px] shadow-sm">
                                   {val}
                                </Badge>
                              ))}
                           </div>
                        </div>
                        <div>
                           <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/30 mb-4">Strategic Nodes</h4>
                           <div className="flex flex-wrap gap-2">
                              {selectedCompany.needs?.slice(0, 4).map(need => (
                                <Badge key={need} variant="outline" className="border-brand-dark/5 text-brand-dark/30 rounded-full px-4 py-1.5 font-bold text-[9px] tracking-tight">
                                   {need}
                                </Badge>
                              ))}
                           </div>
                        </div>
                     </div>
                     <div className="absolute top-0 right-0 w-24 h-24 bg-brand-bg rounded-bl-[3rem]" />
                  </Card>

                  <Card className="rounded-[2.2rem] border-none bg-white p-10 shadow-sm">
                     <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center text-brand-yellow shadow-lg">
                              <Shield size={20} />
                           </div>
                           <h3 className="text-xl font-bold tracking-tight">Regulatory Matrix</h3>
                        </div>
                        <Badge className="bg-brand-dark text-white rounded-full px-4 py-1.5 font-bold tracking-widest text-[9px]">SYNC-ID: {selectedCompany.id.toUpperCase()}</Badge>
                     </div>
                     
                     <div className="space-y-6">
                        {/* SSM SECTION */}
                        <div className="p-6 rounded-[1.8rem] bg-brand-bg/50 border border-transparent hover:border-brand-yellow/30 transition-all">
                           <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-[10px] shadow-sm border border-brand-dark/5">SSM</div>
                                 <div>
                                    <p className="font-bold text-base leading-tight">Companies Commission (SSM)</p>
                                    <p className="text-[9px] font-bold text-brand-dark/30 uppercase tracking-widest font-mono">Verified Node</p>
                                 </div>
                              </div>
                              <Badge className={`${selectedCompany.compliance?.ssm === 'VERIFIED' ? 'bg-green-500 text-white' : 'bg-brand-yellow text-brand-dark'} border-none uppercase font-bold text-[9px] px-3 py-1 rounded-full`}>
                                 {selectedCompany.compliance?.ssm}
                              </Badge>
                           </div>
                        </div>

                        {/* BNM SECTION */}
                        <div className="p-6 rounded-[1.8rem] bg-brand-bg/50 border border-transparent hover:border-brand-yellow/30 transition-all">
                           <div className="flex justify-between items-start">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-bold text-[10px] shadow-sm border border-brand-dark/5">BNM</div>
                                 <div>
                                    <p className="font-bold text-base leading-tight">Bank Negara Malaysia</p>
                                    <p className="text-[9px] font-bold text-brand-dark/30 uppercase tracking-widest font-mono">Cleared Node</p>
                                 </div>
                              </div>
                              <Badge className={`${selectedCompany.compliance?.bnm === 'CLEARED' ? 'bg-blue-500 text-white' : 'bg-brand-yellow text-brand-dark'} border-none uppercase font-bold text-[9px] px-3 py-1 rounded-full`}>
                                 {selectedCompany.compliance?.bnm}
                              </Badge>
                           </div>
                        </div>
                        {/* LHDN SECTION */}
                        <div className="p-8 rounded-[2rem] bg-brand-bg/50 border border-transparent hover:border-brand-yellow/30 transition-all">
                           <div className="flex justify-between items-start mb-6">
                              <div className="flex items-center gap-5">
                                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-bold text-sm shadow-sm border border-brand-dark/5">LHDN</div>
                                 <div>
                                    <p className="font-bold text-lg">Lembaga Hasil Dalam Negeri</p>
                                    <p className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest">Tax Ledger Authority</p>
                                 </div>
                              </div>
                              <Badge className={`${selectedCompany.compliance?.lhdn === 'ACTIVE' ? 'bg-green-500 text-white' : 'bg-brand-yellow text-brand-dark'} border-none uppercase font-bold text-[10px] px-4 py-1.5 rounded-full shadow-sm`}>
                                 {selectedCompany.compliance?.lhdn}
                              </Badge>
                           </div>
                        </div>
                     </div>
                  </Card>
               </div>

               <div className="space-y-10">
                  <Card className="rounded-[2.5rem] border-none bg-brand-dark text-white p-12 shadow-2xl shadow-brand-dark/30 overflow-hidden relative">
                     <h3 className="text-2xl font-bold mb-10 tracking-tight relative z-10">System Vitality</h3>
                     <div className="flex items-center justify-center mb-10 relative z-10">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                           <svg className="w-full h-full transform -rotate-90">
                              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-white/5" />
                              <motion.circle 
                                 cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" 
                                 className="text-brand-yellow"
                                 strokeDasharray={552.9}
                                 initial={{ strokeDashoffset: 552.9 }}
                                 animate={{ strokeDashoffset: 0 }}
                                 transition={{ duration: 2, ease: "easeOut" }}
                              />
                           </svg>
                           <div className="absolute flex flex-col items-center">
                              <span className="text-5xl font-bold tracking-tighter">VITAL</span>
                              <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-[0.3em] mt-2">Compliance</span>
                           </div>
                        </div>
                     </div>
                     <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full" />
                  </Card>

                  <Card className="rounded-[2.5rem] border-none bg-white p-10 shadow-sm">
                     <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-dark/30 mb-8">Strategic Linkages</h3>
                     <div className="space-y-6">
                        {ecosystem.linkages.filter(l => l.target === selectedCompanyId).map(link => {
                           const mentor = ecosystem.mentors.find(m => m.id === link.source);
                           return (
                              <div key={link.id} className="flex items-center gap-5 p-5 rounded-[1.5rem] bg-brand-bg/50 border border-transparent hover:border-brand-yellow/30 transition-all group">
                                 <Avatar className="w-12 h-12 rounded-2xl shadow-sm border-2 border-white group-hover:border-brand-yellow transition-all">
                                    <AvatarImage src={mentor?.avatar} />
                                 </Avatar>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate tracking-tight">{mentor?.name}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/30">{link.type}</p>
                                 </div>
                                 <Badge className="bg-brand-dark text-white text-[9px] font-bold px-3 py-1 rounded-full">{link.status}</Badge>
                              </div>
                           );
                        })}
                        {ecosystem.linkages.filter(l => l.target === selectedCompanyId).length === 0 && (
                           <div className="text-center py-12">
                              <div className="w-16 h-16 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-4 text-brand-dark/10">
                                 <Handshake size={32} />
                              </div>
                              <p className="text-sm font-bold text-brand-dark/20 uppercase tracking-widest">No active linkages</p>
                           </div>
                        )}
                     </div>
                  </Card>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
}