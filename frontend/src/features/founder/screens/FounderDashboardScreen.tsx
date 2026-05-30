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



export function FounderDashboardScreen({ ecosystem, isCompiling, compilationProgress, reportsReady, setReportsReady, runAiGovernanceEngine }: any) {
 return (            <motion.div 
              key="founder_hub"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto"
            >
               <h1 className="text-5xl font-bold tracking-tight mb-16">Welcome in, ZenPay</h1>
               
               <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10">
                  <div className="flex flex-col gap-10">
                    <Card className="rounded-[2.5rem] border-none bg-white p-10 text-center shadow-sm relative overflow-hidden">
                      <div className="relative z-10">
                        <Avatar className="w-28 h-28 mx-auto mb-6 border-4 border-brand-bg shadow-lg">
                          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nabilah" />
                          <AvatarFallback>UN</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold mb-1">ZenPay Global</h2>
                        <p className="text-sm text-[#141414]/40 mb-10 font-medium">Founder: Nabilah Abas</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-brand-bg p-5 rounded-3xl">
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-2">Linkages</p>
                            <p className="text-2xl font-bold">3</p>
                          </div>
                          <div className="bg-brand-bg p-5 rounded-3xl">
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-2">Growth</p>
                            <p className="text-2xl font-bold text-brand-dark">A+</p>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-brand-yellow/10 rounded-full blur-3xl" />
                    </Card>

                    <Card className="rounded-[2.5rem] border-none bg-white p-8 shadow-sm">
                      <h3 className="text-[10px] uppercase font-bold tracking-widest opacity-40 mb-8">Active Programmes</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-brand-bg rounded-2xl">
                          <span className="text-xs font-bold">Global Scaleup 2026</span>
                          <Badge className="bg-brand-yellow text-brand-dark border-none font-bold text-[9px] px-3">ACTIVE</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-10">
                    <Card className="rounded-[2.5rem] border-none bg-white p-10 shadow-sm relative overflow-hidden">
                      <div className="flex items-center justify-between mb-10 relative z-10">
                        <h3 className="text-2xl font-bold tracking-tight">Your Ecosystem Progress</h3>
                        <Button variant="ghost" className="text-brand-dark opacity-40 hover:opacity-100 font-bold text-xs uppercase tracking-widest">Verify All</Button>
                      </div>
                      <div className="space-y-8 relative z-10">
                        {ecosystem.linkages.filter(l => l.target === 'c1').map((link: any) => {
                          const mentor = ecosystem.mentors.find((m: any) => m.id === link.source);
                          return (
                            <EcosystemLinkageItem 
                              key={link.id} 
                              source={mentor?.name || 'Assigned Mentor'} 
                              target="ZenPay Global" 
                              type={link.type} 
                              status={link.status} 
                              strength={link.strength}
                            />
                          );
                        })}
                      </div>
                      <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-brand-bg rounded-full border border-brand-dark/5" />
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Card className="rounded-[2.5rem] border-none bg-brand-dark text-white p-10 relative overflow-hidden shadow-2xl shadow-brand-dark/20 min-h-[320px] flex flex-col justify-center">
                          <AnimatePresence mode="wait">
                            {isCompiling ? (
                              <motion.div 
                                key="compiling"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative z-10 h-full flex flex-col justify-center"
                              >
                                <h3 className="text-sm font-bold uppercase tracking-[0.4em] mb-8 text-brand-yellow">AI Linkage Engine</h3>
                                <div className="space-y-6">
                                   <div className="flex justify-between items-end">
                                      <p className="text-[10px] opacity-40 uppercase tracking-[0.2em]">Synthesizing Ecosystem Nodes...</p>
                                      <span className="text-4xl font-bold">{compilationProgress}%</span>
                                   </div>
                                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div 
                                        className="h-full bg-brand-yellow"
                                        animate={{ width: `${compilationProgress}%` }}
                                      />
                                   </div>
                                   <div className="flex gap-2">
                                      {compilationProgress > 20 && <Badge className="bg-brand-yellow text-brand-dark border-none text-[8px] font-bold rounded-full">SSM VERIFIED</Badge>}
                                      {compilationProgress > 50 && <Badge className="bg-brand-yellow text-brand-dark border-none text-[8px] font-bold rounded-full">BNM CLEARED</Badge>}
                                      {compilationProgress > 80 && <Badge className="bg-brand-yellow text-brand-dark border-none text-[8px] font-bold rounded-full">ECOSYSTEM SYNC</Badge>}
                                   </div>
                                </div>
                              </motion.div>
                            ) : reportsReady ? (
                              <motion.div 
                                key="ready"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative z-10"
                              >
                                <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-yellow/20">
                                   <CheckCircle2 size={32} className="text-brand-dark" />
                                </div>
                                <h3 className="text-3xl font-bold tracking-tight mb-3">Intelligence Sync Ready</h3>
                                <p className="opacity-60 mb-10 text-sm leading-relaxed max-w-xs">Data analysis has been pushed to the Programme Administrator dashboard.</p>
                                <Button 
                                  variant="outline" 
                                  className="border-white/10 text-white hover:bg-white/5 rounded-full px-10 h-12 text-xs font-bold tracking-widest uppercase"
                                  onClick={() => setReportsReady(false)}
                                >
                                  Return to Hub
                                </Button>
                              </motion.div>
                            ) : (
                              <motion.div 
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative z-10"
                              >
                                <h3 className="text-3xl font-bold tracking-tight mb-3 leading-tight">Compile Next<br/>Ecosystem Audit</h3>
                                <p className="opacity-40 mb-10 max-w-xs text-sm leading-relaxed">Automated verification will sync data across Cradle, LHDN, and BNM nodes.</p>
                                <Button 
                                  className="bg-brand-yellow text-brand-dark rounded-full px-10 h-14 font-bold hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-yellow/10"
                                  onClick={runAiGovernanceEngine}
                                >
                                  Prepare Data
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          <Sparkles className={`absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12 transition-all ${isCompiling ? 'animate-pulse scale-110 opacity-30 text-brand-yellow' : ''}`} />
                        </Card>
                       <Card className="rounded-[2.5rem] border-none bg-white p-10 shadow-sm relative overflow-hidden">
                          <h3 className="text-2xl font-bold tracking-tight mb-8">Market Readiness</h3>
                          <div className="space-y-8 relative z-10">
                             <ProgressMetricRow label="Technical Stability" value={92} trackColor="bg-brand-yellow" />
                             <ProgressMetricRow label="Market Traction" value={78} trackColor="bg-brand-yellow" />
                             <ProgressMetricRow label="Partnership Logic" value={65} trackColor="bg-brand-yellow" />
                          </div>
                          <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-bg rounded-tl-[3rem]" />
                       </Card>
                    </div>
                  </div>
               </div>
            </motion.div>);
}