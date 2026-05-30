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



export function ServiceProviderActivityScreen({ ecosystem }: any) {
 return (            <motion.div 
              key="sp_activity"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto space-y-12"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <div>
                  <Badge className="bg-brand-dark text-brand-yellow mb-4 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">Fleet Coordination</Badge>
                  <h1 className="text-5xl font-bold tracking-tighter mb-4 leading-tight">Ecosystem <span className="text-brand-yellow italic font-medium">Activity</span> Feed.</h1>
                  <p className="text-brand-dark/40 text-xl font-medium max-w-2xl">Real-time monitoring of vetted ecosystem specialists and strategic partners across stakeholders.</p>
                </div>
                <div className="flex gap-4">
                   <Card className="bg-white p-6 rounded-2xl shadow-sm border border-brand-bg flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-xl flex items-center justify-center">
                         <Activity size={24} />
                      </div>
                      <div>
                         <p className="text-2xl font-bold">14</p>
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Active Tasks</p>
                      </div>
                   </Card>
                   <Card className="bg-white p-6 rounded-2xl shadow-sm border border-brand-bg flex items-center gap-4">
                      <div className="w-12 h-12 bg-brand-yellow/10 text-brand-yellow rounded-xl flex items-center justify-center">
                         <Target size={24} />
                      </div>
                      <div>
                         <p className="text-2xl font-bold">88%</p>
                         <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">Utilization</p>
                      </div>
                   </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                    <h3 className="text-xs font-bold text-brand-dark/40 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                       Global Linkage Ledger
                    </h3>
                    <div className="space-y-4">
                       {[
                         { sp: 'Scale-up Specialists', action: 'completed', target: 'AgroFlow Tech', time: '12m ago', type: 'IP Filings', category: 'SERVICE_PROVIDER' },
                         { sp: 'Venture Capital X', action: 'vetted', target: 'Solaris energy', time: '28m ago', type: 'Series A Bridge', category: 'PARTNER' },
                         { sp: 'Ops Architects', action: 'initiated', target: 'FinEdge Solutions', time: '45m ago', type: 'Cloud Migration', category: 'SERVICE_PROVIDER' },
                         { sp: 'Global Logistics Hub', action: 'linked', target: 'GreenMart', time: '1h ago', type: 'Supply Chain Sync', category: 'PARTNER' },
                         { sp: 'Legal Guardians', action: 'flagged', target: 'BioPulse', time: '2h ago', type: 'Compliance Review', status: 'CRITICAL', category: 'SERVICE_PROVIDER' },
                         { sp: 'Cloud Infrastructure Ltd', action: 'provided', target: 'DataFlow', time: '4h ago', type: 'Instance Setup', category: 'PARTNER' },
                         { sp: 'Growth Hackers', action: 'assigned', target: 'MarketMatrix', time: '5h ago', type: 'GTM Strategy', category: 'SERVICE_PROVIDER' }
                       ].map((activity, i) => (
                         <div key={i} className="group bg-white p-6 rounded-3xl border border-brand-bg flex items-center gap-6 hover:shadow-md transition-all">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                               activity.action === 'flagged' ? 'bg-red-50 text-red-600' :
                               activity.category === 'PARTNER' ? 'bg-blue-50 text-blue-600' :
                               'bg-brand-yellow/10 text-brand-yellow'
                            }`}>
                               {activity.action === 'flagged' ? <Shield size={24} /> : 
                               activity.category === 'PARTNER' ? <Handshake size={24} /> :
                               <Wrench size={24} />}
                            </div>
                            <div className="flex-1">
                               <div className="flex justify-between items-start">
                                  <div>
                                     <div className="flex items-center gap-2 mb-1">
                                        <p className="font-bold text-lg">{activity.sp}</p>
                                        <Badge className={`${activity.category === 'PARTNER' ? 'bg-blue-500' : 'bg-brand-dark'} text-white text-[8px] px-2 py-0.5 rounded-full border-none`}>{activity.category.replace('_', ' ')}</Badge>
                                     </div>
                                     <p className="text-sm text-brand-dark/50">
                                        {activity.action} <span className="text-brand-dark font-bold">{activity.type}</span> for {activity.target}
                                     </p>
                                  </div>
                                  <span className="text-[10px] font-bold text-brand-dark/30 uppercase">{activity.time}</span>
                               </div>
                            </div>
                            <Button variant="ghost" size="icon" className="rounded-xl hover:bg-brand-bg opacity-0 group-hover:opacity-100 transition-opacity">
                               <ChevronRight size={18} />
                            </Button>
                         </div>
                       ))}
                    </div>

                    <Card className="rounded-[2.5rem] border-none bg-brand-bg/50 p-10 flex flex-col md:flex-row items-center gap-8 border border-white">
                       <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm">
                          <Layers className="text-brand-yellow" size={32} />
                       </div>
                       <div className="flex-1 text-center md:text-left">
                          <h4 className="text-xl font-bold mb-1 tracking-tight">Expand Service Fleet</h4>
                          <p className="text-sm text-brand-dark/40 font-medium">Looking for specific expertise to match a high-priority cohort request?</p>
                       </div>
                       <Button className="rounded-2xl bg-brand-dark text-white text-[10px] uppercase font-bold tracking-widest h-12 px-8">Procure Providers</Button>
                    </Card>
                 </div>

                 <div className="space-y-8">
                    <h3 className="text-xs font-bold text-brand-dark/40 uppercase tracking-[0.2em] px-2 flex items-center gap-2">
                       Active Node Status
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      {[...ecosystem.partners, ...ecosystem.serviceProviders].map(sp => (
                        <Card key={sp.id} className="rounded-[2rem] border-none bg-white p-8 shadow-sm group hover:shadow-lg transition-all border border-transparent hover:border-brand-bg">
                          <div className="flex justify-between items-start mb-6">
                            <div className={`w-14 h-14 bg-brand-bg rounded-2xl flex items-center justify-center group-hover:bg-brand-dark group-hover:text-brand-yellow transition-colors ${sp.type === 'PARTNER' ? 'text-blue-500' : 'text-brand-dark'}`}>
                              {sp.type === 'PARTNER' ? <Handshake size={24} /> : <Wrench size={24} />}
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`${sp.type === 'PARTNER' ? 'bg-blue-50 text-blue-600' : 'bg-brand-dark/10 text-brand-dark/60'} border-none text-[8px] uppercase font-black px-2 py-0.5 rounded-full`}>{sp.type}</Badge>
                              <Badge className={`${sp.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-brand-dark/5 text-brand-dark/30'} border-none text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full`}>
                                {sp.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-1 tracking-tight">{sp.name}</h3>
                          <div className="flex flex-wrap gap-2 mb-8">
                             {sp.expertise?.map(exp => (
                               <Badge key={exp} variant="outline" className="text-[9px] border-brand-dark/5 text-brand-dark/40 uppercase font-bold tracking-widest">
                                  {exp}
                               </Badge>
                             ))}
                          </div>

                          <div className="space-y-4">
                            {sp.activeWork && sp.activeWork.length > 0 ? (
                              sp.activeWork.map((work, idx) => (
                                <div key={idx} className="bg-brand-bg/50 rounded-2xl p-5 border border-brand-bg/50 group-hover:border-brand-yellow/30 transition-all">
                                   <div className="flex justify-between items-start mb-3">
                                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">Engagement</p>
                                      <Badge className="bg-brand-yellow/20 text-brand-yellow border-none text-[8px] uppercase font-black px-2 py-0.5">{work.status}</Badge>
                                   </div>
                                   <p className="font-bold text-brand-dark mb-1">{work.client}</p>
                                   <p className="text-[11px] text-brand-dark/50 leading-relaxed font-medium">{work.task}</p>
                                </div>
                              ))
                            ) : (
                              <div className="py-10 text-center bg-brand-bg/30 rounded-2xl border-2 border-dashed border-brand-dark/5">
                                 <p className="text-xs text-brand-dark/30 font-bold uppercase tracking-widest">Available</p>
                              </div>
                            )}
                          </div>

                          <Button className="w-full mt-8 rounded-2xl bg-brand-bg text-brand-dark hover:bg-brand-dark hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest h-12">Modify Scope</Button>
                        </Card>
                      ))}
                    </div>
                 </div>
              </div>
            </motion.div>);
}