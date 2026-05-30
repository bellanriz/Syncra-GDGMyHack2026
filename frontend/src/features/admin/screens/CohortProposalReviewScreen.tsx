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



export function CohortProposalReviewScreen({ ecosystem, setEcosystem, setActiveScreen, handleGenerateCohort, isGeneratingCohort }: any) {
 return (            <motion.div 
              key="proposal_builder"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex items-end justify-between mb-12">
                 <div>
                    <h1 className="text-4xl font-medium font-serif italic mb-2 tracking-tight">AI Cohort Maker.</h1>
                    <p className="text-[#141414]/50 max-w-md">Gemini-driven cohort assembly across mentors, mentees, and strategic support units.</p>
                 </div>
                 <Button
                   variant="outline"
                   className="rounded-2xl gap-2 font-mono text-[10px] uppercase tracking-widest px-6 h-12"
                   onClick={handleGenerateCohort}
                   disabled={isGeneratingCohort}
                 >
                    <Sparkles size={14} /> {isGeneratingCohort ? 'Generating...' : 'Generate New Cohort'}
                 </Button>
              </div>

              <div className="space-y-12">
                {(() => {
                  const pendingCohort = (ecosystem.proposals || []).find(p => p.status === 'PENDING');
                  
                  if (!pendingCohort) {
                    return (
                      <Card className="rounded-[2.5rem] border-none bg-white p-20 shadow-sm text-center">
                         <div className="w-20 h-20 bg-brand-bg rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-dark/20">
                            <CheckCircle2 size={40} />
                         </div>
                         <h2 className="text-3xl font-bold mb-4">All Cohorts Processed</h2>
                         <p className="text-brand-dark/40 max-w-sm mx-auto font-medium">Your triage queue is empty. New AI-generated suggestions will appear here automatically.</p>
                         <Button 
                           variant="outline" 
                           className="mt-10 rounded-full px-10 h-14 border-brand-dark/10 font-bold text-xs uppercase tracking-widest"
                           onClick={() => setActiveScreen('TRACKER')}
                         >
                            Back to Admin Dashboard
                         </Button>
                      </Card>
                    );
                  }

                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="rounded-[2.5rem] border-[#141414]/5 bg-white p-10 shadow-lg relative overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 relative z-10">
                           <div>
                              <div className="flex items-center gap-3 mb-6">
                                 <Badge className="bg-[#141414] text-white px-4 py-1 rounded-full font-mono text-[9px] tracking-widest uppercase">COHORT SUGGESTION</Badge>
                                 <Badge variant="outline" className="border-[#141414]/10 text-[#141414]/40 font-mono text-[9px] tracking-widest uppercase">ID: {pendingCohort.id}</Badge>
                              </div>
                              <h2 className="text-5xl font-bold tracking-tighter mb-8">{pendingCohort.name}</h2>
                              <p className="text-[#141414]/60 bg-[#F8F9FA] p-8 rounded-[2rem] border-l-4 border-[#141414] mb-10 leading-relaxed italic text-lg">
                                 "{pendingCohort.logic}"
                              </p>
                              
                              <div className="grid grid-cols-2 gap-12 mb-10">
                                 <div>
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-30 mb-6">Suggested Mentees</h4>
                                    <div className="flex -space-x-4">
                                       {pendingCohort.suggestedCompanies.map(id => (
                                         <Avatar key={id} className="w-16 h-16 border-4 border-white bg-[#F5F5F0] flex items-center justify-center shadow-md">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${id}`} />
                                         </Avatar>
                                       ))}
                                    </div>
                                 </div>
                                 <div>
                                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-30 mb-6">Suggested Mentors</h4>
                                    <div className="flex -space-x-4">
                                       {pendingCohort.suggestedMentors.map(id => (
                                         <Avatar key={id} className="w-16 h-16 border-4 border-white shadow-md">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`} />
                                         </Avatar>
                                       ))}
                                    </div>
                                 </div>
                              </div>

                              <div className="flex items-center gap-4 py-8 border-t border-[#141414]/5 mt-10">
                                <span className="text-[10px] font-mono uppercase tracking-widest opacity-30">Infra & Legal Mapping:</span>
                                {pendingCohort.suggestedPartners.map(p => <Badge key={p} variant="secondary" className="bg-[#F8F9FA] text-[10px] py-1.5 px-4 rounded-full font-bold">{p}</Badge>)}
                                {pendingCohort.suggestedProviders.map(sp => <Badge key={sp} variant="secondary" className="bg-[#F8F9FA] text-[10px] py-1.5 px-4 rounded-full font-bold">{sp}</Badge>)}
                              </div>
                           </div>

                           <div className="flex flex-col justify-center gap-6 bg-brand-bg p-10 rounded-[2.5rem] border border-[#141414]/5">
                              <p className="text-center text-[10px] text-[#141414]/40 font-bold uppercase tracking-[0.2em] mb-4">Admin Governance</p>
                              <Button 
                                className="bg-[#141414] text-white rounded-3xl h-16 w-full shadow-2xl hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 font-bold text-sm tracking-tight"
                                onClick={() => {
                                   setEcosystem(prev => ({
                                      ...prev,
                                      proposals: prev.proposals.map(p => p.id === pendingCohort.id ? { ...p, status: 'APPROVED' } : p)
                                   }));
                                }}
                              >
                                 Approve Cohort <CheckCircle2 size={20} />
                              </Button>
                              <Button 
                                variant="outline" 
                                className="rounded-3xl h-16 w-full border-[#141414]/10 bg-white text-[#141414] hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all flex items-center justify-center gap-3 font-bold text-sm tracking-tight"
                                onClick={() => {
                                   setEcosystem(prev => ({
                                      ...prev,
                                      proposals: prev.proposals.map(p => p.id === pendingCohort.id ? { ...p, status: 'DISMISSED' } : p)
                                   }));
                                }}
                              >
                                 Reject Structure <X size={20} />
                              </Button>

                              <p className="text-[9px] text-center text-brand-dark/20 mt-4 leading-relaxed font-medium">Decisions are final and will initiate<br/>the linkage automation sequence.</p>
                           </div>
                        </div>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-brand-bg rounded-bl-[5rem] flex items-center justify-center">
                           <Bot size={64} className="text-brand-dark/5" />
                        </div>
                      </Card>
                    </motion.div>
                  );
                })()}
              </div>
            </motion.div>);
}
