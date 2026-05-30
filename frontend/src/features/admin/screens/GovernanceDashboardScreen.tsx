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



export function GovernanceDashboardScreen({ ecosystem, allMembers, reportsReady, triggerAuditGeneration, setSelectedCompanyId }: any) {
 return (            <motion.div 
              key="tracker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between mb-12">
                 <div>
                    <h1 className="text-3xl font-medium font-serif italic mb-1">Admin Tracker</h1>
                    <p className="text-sm text-[#141414]/40 flex items-center gap-2">
                       <ShieldCheck size={14} /> Ecosystem Administrator View (Cradle)
                    </p>
                 </div>
                 <Badge variant="outline" className="font-mono text-green-600 bg-green-50 border-green-100 px-4 py-1.5 rounded-full">
                    AUTOMATED COORDINATION: ON
                 </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <MetricSummaryCard title="Total Participant Entities" value={allMembers.length} trend="+12% this month" />
                <MetricSummaryCard title="Reusable Linkages" value={ecosystem.linkages.length} trend="85% strength avg." />
                <MetricSummaryCard title="Program Utilization" value="92%" trend="Across 3 regions" />
              </div>

              <Card className="rounded-3xl border-[#141414]/5 bg-white p-8 shadow-sm mb-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#141414] rounded-xl flex items-center justify-center text-white">
                        <Target size={20} />
                     </div>
                     <h3 className="text-xl font-medium">Governance Data Analysis</h3>
                  </div>
                  {reportsReady && <Badge className="bg-blue-100 text-blue-700 animate-pulse border-none px-4">NEW AI INSIGHTS READY</Badge>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {ecosystem.analystInsights?.map(insight => (
                     <div key={insight.id} className="p-6 rounded-3xl bg-[#F8F9FA] border border-[#141414]/5 hover:border-[#141414]/20 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                           <span className={`text-[8px] font-mono px-2 py-0.5 rounded uppercase tracking-widest ${
                              insight.impact === 'CRITICAL' ? 'bg-red-100 text-red-600' : 
                              insight.impact === 'HIGH' ? 'bg-orange-100 text-orange-600' : 
                              'bg-blue-100 text-blue-600'
                           }`}>{insight.impact} Priority</span>
                           <Sparkles size={14} className="opacity-10 group-hover:opacity-40 transition-opacity" />
                        </div>
                        <h4 className="font-semibold text-sm mb-2">{insight.title}</h4>
                        <p className="text-xs text-[#141414]/50 leading-relaxed mb-4">{insight.insight}</p>
                        <Button 
                          variant="link" 
                          onClick={() => triggerAuditGeneration(insight.title)}
                          className="p-0 h-auto text-[10px] font-mono tracking-widest uppercase text-[#141414] group-hover:translate-x-1 transition-transform"
                        >
                           VIEW FULL AUDIT <ChevronRight size={10} className="ml-1" />
                        </Button>
                     </div>
                   )) || (
                     <div className="col-span-3 py-12 text-center bg-[#F8F9FA] rounded-3xl border-2 border-dashed border-[#141414]/5">
                        <p className="text-[#141414]/30 font-mono text-xs uppercase tracking-[0.2em]">Awaiting Data Preparation from Governance Side</p>
                     </div>
                   )}
                </div>
              </Card>

              <Card className="rounded-3xl border-[#141414]/5 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-medium">Company Ecosystem Tracker</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg text-[#141414] text-[10px] font-mono h-8">DOWNLOAD TAX REPORTS</Button>
                    <Button variant="outline" size="sm" className="rounded-lg text-[#141414] text-[10px] font-mono h-8">AUDIT ALL</Button>
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="grid grid-cols-[1fr_120px_150px_100px_40px] gap-4 px-4 py-2 bg-[#F8F9FA] rounded-xl text-[9px] font-mono uppercase tracking-[0.2em] opacity-40">
                      <span>Company Entity</span>
                      <span>Ecosystem Score</span>
                      <span className="text-center">Compliance Status</span>
                      <span>Audit Date</span>
                      <span></span>
                   </div>
                   {ecosystem.companies.map((company) => (
                      <div 
                        key={company.id} 
                        onClick={() => setSelectedCompanyId(company.id)}
                        className="grid grid-cols-[1fr_120px_150px_100px_40px] gap-4 items-center px-4 py-6 border-b border-[#141414]/5 last:border-none hover:bg-[#F8F9FA]/50 transition-all rounded-2xl group cursor-pointer"
                      >
                         <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10 rounded-xl">
                               <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${company.id}`} />
                            </Avatar>
                            <div>
                               <p className="font-medium text-sm">{company.name}</p>
                               <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-[9px] font-mono opacity-40">{company.industry}</span>
                                  <span className="text-[9px] font-mono opacity-20">•</span>
                                  <span className="text-[9px] font-mono opacity-40">{company.stage}</span>
                               </div>
                            </div>
                         </div>

                         <div>
                            <div className="flex items-center gap-3">
                               <div className="flex-1 h-1.5 bg-[#141414]/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    className="h-full bg-green-500" 
                                  />
                                </div>
                               <span className="text-[10px] font-bold uppercase text-green-600 tracking-tighter">Verified</span>
                            </div>
                         </div>

                         <div className="flex justify-center gap-1.5">
                            {company.compliance && (
                               <>
                                  <Badge variant="outline" className={`text-[8px] px-1.5 py-0 rounded-sm border-none ${company.compliance.ssm === 'VERIFIED' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>SSM</Badge>
                                  <Badge variant="outline" className={`text-[8px] px-1.5 py-0 rounded-sm border-none ${company.compliance.bnm === 'CLEARED' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>BNM</Badge>
                                  <Badge variant="outline" className={`text-[8px] px-1.5 py-0 rounded-sm border-none ${company.compliance.lhdn === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>LHDN</Badge>
                               </>
                            )}
                         </div>

                         <div className="text-right">
                            <p className="text-[10px] font-mono opacity-40">{company.compliance?.lastAuditDate || 'N/A'}</p>
                         </div>

                         <div className="flex justify-end">
                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-[#141414]/20 group-hover:text-[#141414] group-hover:bg-white shadow-sm transition-all">
                               <ChevronRight size={14} />
                            </Button>
                         </div>
                      </div>
                   ))}
                </div>
              </Card>
            </motion.div>);
}