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

import { GovernanceAuditOverviewReport } from '@/features/governance/reports/GovernanceAuditOverviewReport';
import { ComplianceTrendAuditReport } from '@/features/governance/reports/ComplianceTrendAuditReport';
import { ScaleUpVelocityAuditReport } from '@/features/governance/reports/ScaleUpVelocityAuditReport';
import { RegulatoryRiskAuditReport } from '@/features/governance/reports/RegulatoryRiskAuditReport';
import { MentorPerformanceAuditReport } from '@/features/governance/reports/MentorPerformanceAuditReport';

import { RoleSelectionScreen } from '@/features/auth/screens/RoleSelectionScreen';
import { AuditGenerationScreen } from '@/features/governance/screens/AuditGenerationScreen';
import { GovernanceAuditReportScreen } from '@/features/governance/screens/GovernanceAuditReportScreen';
import { EcosystemCompanyDetailScreen } from '@/features/ecosystem/screens/EcosystemCompanyDetailScreen';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { FounderDashboardScreen } from '@/features/founder/screens/FounderDashboardScreen';
import { ServiceProviderActivityScreen } from '@/features/admin/screens/ServiceProviderActivityScreen';
import { CohortProposalReviewScreen } from '@/features/admin/screens/CohortProposalReviewScreen';
import { EcosystemDiscoveryScreen } from '@/features/ecosystem/screens/EcosystemDiscoveryScreen';
import { GovernanceDashboardScreen } from '@/features/admin/screens/GovernanceDashboardScreen';
import { EcosystemDirectoryScreen } from '@/features/ecosystem/screens/EcosystemDirectoryScreen';
import { EcosystemAssistantChatScreen } from '@/features/assistant/screens/EcosystemAssistantChatScreen';

import { AppRoute, ROUTES } from './routes';

const AI_RESPONSE_MIN_DELAY_MS = 2200;
const AI_RESPONSE_JITTER_MS = 1200;

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function AppRouter() {
  const [role, setRole] = useState<UserRole>('NONE');
  const [activeScreen, setActiveScreen] = useState<AppRoute>('DISCOVERY');
  const [ecosystem, setEcosystem] = useState<EcosystemData>({ mentors: [], companies: [], partners: [], serviceProviders: [], programs: [], linkages: [] });
  const [agentChat, setAgentChat] = useState<Message[]>([
    { role: 'bot', content: 'Syncra IQ Core activated. Monitoring ecosystem nodes. How can I assist with your linkage strategy?' }
  ]);
  const [adminFounderChat, setAdminFounderChat] = useState<Message[]>([
    { role: 'bot', content: 'Direct Linkage Channel established. This is a secure channel between Programme Admin and Founder Hub.' }
  ]);
  const [activeAgentTab, setActiveAgentTab] = useState<'AI_AGENT' | 'DIRECT_LINKAGE'>('AI_AGENT');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeChats, setNodeChats] = useState<Record<string, Message[]>>({});
  const [inputMessage, setInputMessage] = useState('');
  const [nodeMatches, setNodeMatches] = useState<any[]>([]);
  const [isGeneratingCohort, setIsGeneratingCohort] = useState(false);

  const handleInputChange = (val: string) => {
    setInputMessage(val);
    if (val.length > 1) {
      const allNodes = [...ecosystem.mentors, ...ecosystem.partners, ...ecosystem.serviceProviders];
      const matches = allNodes.filter(n => n.name.toLowerCase().includes(val.toLowerCase())).slice(0, 3);
      setNodeMatches(matches);
    } else {
      setNodeMatches([]);
    }
  };

  const selectNodeMatch = (name: string) => {
    setInputMessage(`@${name} `);
    setNodeMatches([]);
  };
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeScreen === 'AGENT') {
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 100);
    }
  }, [agentChat, adminFounderChat, nodeChats, selectedNodeId, activeAgentTab, activeScreen]);

  const [networkFilter, setNetworkFilter] = useState<string>('ALL');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [showFullAuditReport, setShowFullAuditReport] = useState(false);
  const [activeAuditType, setActiveAuditType] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationProgress, setCompilationProgress] = useState(0);
  const [reportsReady, setReportsReady] = useState(false);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);
  const [auditProgress, setAuditProgress] = useState(0);

  const selectedCompany = ecosystem.companies.find(c => c.id === selectedCompanyId);

  useEffect(() => {
    if (role !== 'NONE') {
      const fetchData = async () => {
        try {
          const res = await fetch('/api/ecosystem');
          const data = await res.json();
          setEcosystem(data);
          // Set initial screen based on role
          if (role === 'ADMIN') setActiveScreen('TRACKER');
          else setActiveScreen('FOUNDER_HUB');
        } catch (err) {
          console.error("Failed to fetch ecosystem data", err);
        }
      };
      fetchData();
    }
  }, [role]);

  const handleSendMessage = async (msgOverride?: string) => {
    const messageToUse = msgOverride || inputMessage;
    if (!messageToUse.trim()) return;

    const newMessage: Message = { role: 'user', content: messageToUse };
    
    if (activeAgentTab === 'AI_AGENT') {
      setAgentChat(prev => [...prev, newMessage]);
      if (!msgOverride) setInputMessage('');
      setIsLoading(true);

      try {
        const startedAt = Date.now();
        const minimumDelay = AI_RESPONSE_MIN_DELAY_MS + Math.floor(Math.random() * AI_RESPONSE_JITTER_MS);
        const response = await fetch('/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: messageToUse, history: agentChat, role })
        });
        const data = await response.json();
        const elapsed = Date.now() - startedAt;
        if (elapsed < minimumDelay) {
          await wait(minimumDelay - elapsed);
        }
        
        const botResponse: Message = { 
          role: 'bot', 
          content: data.text || `Analyzing "${messageToUse}" against ecosystem risk matrices. Linkage optimization in progress...` 
        };
        setAgentChat(prev => [...prev, botResponse]);
      } catch (err) {
        console.error("AI Agent error", err);
        const botResponse: Message = { 
          role: 'bot', 
          content: "Ecosystem node transient error. Retrying neural linkage..." 
        };
        setAgentChat(prev => [...prev, botResponse]);
      } finally {
        setIsLoading(false);
      }
    } else {
      if (selectedNodeId) {
        setNodeChats(prev => ({
          ...prev,
          [selectedNodeId]: [...(prev[selectedNodeId] || []), newMessage]
        }));
        setInputMessage('');
        
        setTimeout(() => {
          const selectedNode = [...ecosystem.mentors, ...ecosystem.partners, ...ecosystem.serviceProviders].find(n => n.id === selectedNodeId);
          const botResponse: Message = { 
            role: 'bot', 
            content: `Hello! This is ${selectedNode?.name || 'an Ecosystem Node'}. I've received your message and will review it to see how we can best collaborate within the Syncra ecosystem.` 
          };
          setNodeChats(prev => ({
            ...prev,
            [selectedNodeId]: [...(prev[selectedNodeId] || []), botResponse]
          }));
        }, 1200);
      } else {
        setAdminFounderChat(prev => [...prev, newMessage]);
        setInputMessage('');
        
        // Simulate response for Direct Linkage
        setTimeout(() => {
          const responderName = role === 'ADMIN' ? 'Founder Response' : 'Admin Response';
          const botResponse: Message = { 
            role: 'bot', 
            content: `Acknowledged. Relaying your inquiry to ${role === 'ADMIN' ? 'the Founder Hub' : 'Programme Administration'}. Expect a resolution update shortly.` 
          };
          setAdminFounderChat(prev => [...prev, botResponse]);
        }, 1200);
      }
    }
  };

  const handleGenerateCohort = async () => {
    setIsGeneratingCohort(true);

    try {
      const response = await fetch('/api/ai/generate-cohort', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      const data = await response.json();
      const proposal = data.proposal || data;

      setEcosystem(prev => ({
        ...prev,
        proposals: [proposal, ...(prev.proposals || [])]
      }));
    } catch (err) {
      console.error("AI cohort generation error", err);
    } finally {
      setIsGeneratingCohort(false);
    }
  };

  const handleApplyNow = (programName: string) => {
    setActiveScreen('AGENT');
    setActiveAgentTab('AI_AGENT');
    handleSendMessage(`I want to Apply for ${programName}. Please automate the required documentation, compliance verification, and ecosystem linkage for my venture.`);
  };

  const runAiGovernanceEngine = () => {
    setIsCompiling(true);
    setCompilationProgress(0);
    setReportsReady(false);
    
    // Simulate complex data analysis
    const interval = setInterval(() => {
      setCompilationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setReportsReady(true);
            // Switch to admin view automatically to see the results
            // Note: In real app, this would be a transition
          }, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const allMembers = [
    ...ecosystem.mentors,
    ...ecosystem.partners,
    ...ecosystem.serviceProviders,
    ...ecosystem.companies
  ];

  const filteredMembers = networkFilter === 'ALL' 
    ? allMembers 
    : allMembers.filter(m => m.type === networkFilter);



  const triggerAuditGeneration = (auditType: string) => {
    setActiveAuditType(auditType);
    setIsGeneratingAudit(true);
    setAuditProgress(0);
    const interval = setInterval(() => {
      setAuditProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
             setIsGeneratingAudit(false);
             setShowFullAuditReport(true);
          }, 800);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);
  };

  if (role === 'NONE') {
    return <RoleSelectionScreen setRole={setRole} />;
  }

  if (isGeneratingAudit) {
    return <AuditGenerationScreen auditProgress={auditProgress} />;
  }

  if (showFullAuditReport) {
    return <GovernanceAuditReportScreen activeAuditType={activeAuditType} setShowFullAuditReport={setShowFullAuditReport} setActiveAuditType={setActiveAuditType} ecosystem={ecosystem} />;
  }

  if (selectedCompanyId && selectedCompany) {
    return <EcosystemCompanyDetailScreen selectedCompany={selectedCompany} selectedCompanyId={selectedCompanyId} setSelectedCompanyId={setSelectedCompanyId} ecosystem={ecosystem} />;
  }

  return (
    <div className="min-h-screen bg-brand-bg text-[#1A1A1A] font-sans selection:bg-[#E9ECEF]">
      <AppSidebar role={role} setRole={setRole} activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <main className="ml-24 min-h-screen p-8 lg:p-12 relative">
        <AnimatePresence mode="wait">
          {activeScreen === ROUTES.FOUNDER_HUB && role === 'FOUNDER' && (
            <FounderDashboardScreen ecosystem={ecosystem} isCompiling={isCompiling} compilationProgress={compilationProgress} reportsReady={reportsReady} setReportsReady={setReportsReady} runAiGovernanceEngine={runAiGovernanceEngine} />
          )}

          {activeScreen === ROUTES.SP_ACTIVITY && role === 'ADMIN' && (
            <ServiceProviderActivityScreen ecosystem={ecosystem} />
          )}

          {activeScreen === ROUTES.PROPOSAL_BUILDER && role === 'ADMIN' && (
            <CohortProposalReviewScreen ecosystem={ecosystem} setEcosystem={setEcosystem} setActiveScreen={setActiveScreen} handleGenerateCohort={handleGenerateCohort} isGeneratingCohort={isGeneratingCohort} />
          )}

          {activeScreen === ROUTES.DISCOVERY && (
            <EcosystemDiscoveryScreen ecosystem={ecosystem} handleApplyNow={handleApplyNow} />
          )}

          {activeScreen === ROUTES.TRACKER && role === 'ADMIN' && (
            <GovernanceDashboardScreen allMembers={allMembers} ecosystem={ecosystem} reportsReady={reportsReady} triggerAuditGeneration={triggerAuditGeneration} setSelectedCompanyId={setSelectedCompanyId} />
          )}

          {activeScreen === ROUTES.NETWORK && (
            <EcosystemDirectoryScreen filteredMembers={filteredMembers} networkFilter={networkFilter} setNetworkFilter={setNetworkFilter} setSelectedCompanyId={setSelectedCompanyId} />
          )}

          {activeScreen === ROUTES.AGENT && (
            <EcosystemAssistantChatScreen 
              activeAgentTab={activeAgentTab} setActiveAgentTab={setActiveAgentTab}
              selectedNodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId}
              ecosystem={ecosystem} agentChat={agentChat} nodeChats={nodeChats}
              adminFounderChat={adminFounderChat} isLoading={isLoading}
              nodeMatches={nodeMatches} selectNodeMatch={selectNodeMatch}
              inputMessage={inputMessage} handleInputChange={handleInputChange}
              handleSendMessage={handleSendMessage} scrollRef={scrollRef} role={role}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
