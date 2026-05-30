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

export function EcosystemEntityCard({ member, onCompanyClick }: { member: Member; onCompanyClick?: (id: string) => void; key?: React.Key }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [aiScore, setAiScore] = useState<{ score: number; justification: string } | null>(null);
  const [isLoadingScore, setIsLoadingScore] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchAiScore = async () => {
    if (hasFetchedRef.current || isLoadingScore) return;
    hasFetchedRef.current = true;
    setIsLoadingScore(true);
    try {
      const res = await fetch('/api/ai/justify-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member })
      });
      const data = await res.json();
      setAiScore({ score: data.score, justification: data.justification });
    } catch (err) {
      console.error('Failed to fetch AI score', err);
      setAiScore({ score: 72, justification: 'Score based on ecosystem participation metrics.' });
    } finally {
      setIsLoadingScore(false);
    }
  };

  const handleCardClick = () => {
    if (member.type === 'COMPANY' && onCompanyClick) {
      onCompanyClick(member.id);
    } else {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div 
      className="relative w-full h-[380px] perspective-1000 group cursor-pointer"
      onMouseEnter={() => { if (member.type !== 'COMPANY') { setIsFlipped(true); fetchAiScore(); } }}
      onMouseLeave={() => member.type !== 'COMPANY' && setIsFlipped(false)}
      onClick={handleCardClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 25 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden">
          <Card className="w-full h-full rounded-[2rem] border-none bg-white shadow-sm flex flex-col group-hover:shadow-xl transition-all overflow-hidden relative">
            <div className="p-8 flex flex-col h-full relative z-10">
              <div className="flex justify-between items-start mb-6">
                <Avatar className="w-14 h-14 rounded-2xl shadow-md border-2 border-brand-bg">
                  <AvatarImage src={member.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${member.id}`} />
                </Avatar>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border-none shadow-sm ${
                    member.type === 'MENTOR' ? 'bg-purple-500 text-white' :
                    member.type === 'PARTNER' ? 'bg-blue-500 text-white' :
                    member.type === 'SERVICE_PROVIDER' ? 'bg-orange-500 text-white' :
                    'bg-brand-yellow text-brand-dark'
                  }`}>
                    {member.type.replace('_', ' ')}
                  </Badge>
                  <Badge className="bg-green-50 text-green-600 border-none text-[8px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm">Verified Node</Badge>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1 tracking-tight group-hover:text-brand-dark transition-colors">{member.name}</h3>
              <p className="text-[10px] text-brand-dark/40 uppercase tracking-[0.2em] font-bold mb-6">{member.role || member.stage || 'Stakeholder Entity'}</p>
              <p className="text-xs text-brand-dark/60 line-clamp-3 leading-relaxed mb-6 font-medium">
                {member.bio || member.description || `Verified ecosystem member since 2025 focusing on ${member.industry || 'innovation engineering'}.`}
              </p>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {(member.expertise || []).slice(0, 3).map(skill => (
                    <span key={skill} className="text-[9px] font-bold text-brand-dark/40 bg-brand-bg px-2.5 py-1 rounded-full uppercase tracking-widest">{skill}</span>
                  ))}
                </div>
                <div className="pt-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-brand-dark/20 underline decoration-brand-yellow decoration-2 underline-offset-4">Explore Node</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-brand-bg rounded-full opacity-50 group-hover:scale-125 transition-transform" />
          </Card>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <Card className="w-full h-full rounded-3xl border-[#141414]/10 bg-[#141414] text-white p-6 flex flex-col shadow-2xl">
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-medium mb-1">{member.name}</h3>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 mb-6">Ecosystem Value Stack</p>
              
              {/* AI Score Justification */}
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-brand-yellow" />
                  <h4 className="text-[9px] font-mono uppercase tracking-widest text-brand-yellow">AI Ecosystem Score</h4>
                </div>
                {isLoadingScore ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/10 animate-pulse" />
                    <div className="flex-1 h-3 bg-white/10 rounded animate-pulse" />
                  </div>
                ) : aiScore ? (
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 flex items-center justify-center">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                        <circle 
                          cx="28" cy="28" r="24" fill="none" 
                          stroke={aiScore.score >= 80 ? '#22c55e' : aiScore.score >= 60 ? '#eab308' : '#ef4444'}
                          strokeWidth="4" 
                          strokeDasharray={`${(aiScore.score / 100) * 150.8} 150.8`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-sm font-bold">{aiScore.score}%</span>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed flex-1">{aiScore.justification}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <Target size={16} className="opacity-30" />
                    </div>
                    <p className="text-[10px] text-white/30 font-mono">Awaiting analysis...</p>
                  </div>
                )}
              </div>

              <div className="space-y-5 flex-1 overflow-hidden">
                {member.values && member.values.length > 0 && (
                  <div>
                    <h4 className="text-[9px] font-mono uppercase tracking-widest opacity-30 mb-3">Core Values</h4>
                    <div className="space-y-2">
                       {member.values.map(val => (
                         <div key={val} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-green-400" />
                            <span className="text-xs tracking-tight">{val}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-[9px] font-mono uppercase tracking-widest opacity-30 mb-3">Extended Expertise</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {member.expertise?.map(skill => (
                      <Badge key={skill} variant="outline" className="bg-white/5 border-white/10 text-white text-[9px] font-normal rounded-lg">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {member.compliance && (
                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-[9px] font-mono uppercase tracking-widest opacity-30 mb-3">Regulatory Compliance (Admin View)</h4>
                    <div className="grid grid-cols-3 gap-2">
                       <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
                          <span className="text-[8px] font-mono opacity-40 mb-1">SSM</span>
                          <span className={`text-[9px] font-bold ${member.compliance.ssm === 'VERIFIED' ? 'text-green-400' : 'text-yellow-400'}`}>{member.compliance.ssm}</span>
                       </div>
                       <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
                          <span className="text-[8px] font-mono opacity-40 mb-1">BNM</span>
                          <span className={`text-[9px] font-bold ${member.compliance.bnm === 'CLEARED' ? 'text-green-400' : 'text-orange-400'}`}>{member.compliance.bnm}</span>
                       </div>
                       <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center">
                          <span className="text-[8px] font-mono opacity-40 mb-1">LHDN</span>
                          <span className={`text-[9px] font-bold ${member.compliance.lhdn === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>{member.compliance.lhdn}</span>
                       </div>
                    </div>
                    <p className="text-[8px] font-mono opacity-20 mt-2 text-right">LAST AUDIT: {member.compliance.lastAuditDate}</p>
                  </div>
                )}

                {member.industry && (
                   <div>
                      <h4 className="text-[9px] font-mono uppercase tracking-widest opacity-30 mb-2">Primary Domain</h4>
                      <p className="text-sm font-medium">{member.industry}</p>
                   </div>
                )}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10">
                <Button className="w-full bg-white text-[#141414] rounded-xl text-xs font-mono uppercase tracking-widest h-10 hover:bg-gray-200">
                  View More
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}