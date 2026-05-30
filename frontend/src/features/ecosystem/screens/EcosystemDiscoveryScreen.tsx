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



export function EcosystemDiscoveryScreen({ ecosystem, handleApplyNow }: any) {
 return (            <motion.div 
              key="discovery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto"
            >
              <div className="mb-12">
                <h1 className="text-4xl font-medium font-serif italic mb-2">Discovery Library</h1>
                <p className="text-[#141414]/50">Browse reusable ecosystem entities and programmes.</p>
              </div>

              <div className="space-y-16">
                <section>
                  <SectionHeader title="Programmes" icon={<Layers size={20}/>} subtitle="Active and upcoming initiatives" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ecosystem.programs.map((p) => (
                      <Card key={p.id} className="rounded-2xl border-[#141414]/5 shadow-sm overflow-hidden flex flex-col h-full">
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <Badge className={`${p.status === 'ONGOING' ? 'bg-green-100 text-green-700' : p.status === 'REGISTERING' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'} border-none px-3 py-1 font-mono text-[10px]`}>
                              {p.status}
                            </Badge>
                            <Clock size={16} className="opacity-20" />
                          </div>
                          <h3 className="text-xl font-medium mb-2">{p.name}</h3>
                          <p className="text-sm text-[#141414]/50 mb-6 leading-relaxed flex-1">{p.description || 'Verified programme track.'}</p>
                          <div className="mt-auto">
                            <Button 
                              onClick={() => p.status === 'REGISTERING' ? handleApplyNow(p.name) : null}
                              variant="outline" 
                              className="w-full rounded-xl border-[#141414]/10 text-xs font-mono uppercase tracking-widest text-[#141414]"
                            >
                              {p.status === 'REGISTERING' ? 'Apply Now' : 'View Cohort'}
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                   <section>
                    <SectionHeader title="Strategic Partners" icon={<Handshake size={20}/>} subtitle="Resource and infrastructure support" />
                    <div className="grid grid-cols-1 gap-4">
                       {ecosystem.partners.map(p => (
                         <EcosystemResourceListItem key={p.id} item={p} />
                       ))}
                    </div>
                  </section>
                  <section>
                    <SectionHeader title="Service Providers" icon={<Wrench size={20}/>} subtitle="Vetted scaling specialists" />
                    <div className="grid grid-cols-1 gap-4">
                       {ecosystem.serviceProviders.map(p => (
                         <EcosystemResourceListItem key={p.id} item={p} />
                       ))}
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>);
}