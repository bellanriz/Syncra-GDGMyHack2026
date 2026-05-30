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

export function GovernanceAuditOverviewReport({ ecosystem }: { ecosystem: EcosystemData }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-3">Ecosystem Ledger <span className="text-brand-yellow font-light">Audit</span></h1>
          <p className="text-brand-dark/40 text-base font-medium">Programmable Regulatory Compliance Analysis • Q2 2026</p>
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <Button variant="outline" className="flex-1 lg:flex-none rounded-full h-12 px-8 border-brand-dark/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white">Export Node PDF</Button>
          <Button className="bg-brand-dark text-brand-yellow rounded-full px-10 h-12 text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-dark/20">Sync Cradle Ledger</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <Card className="rounded-[2.2rem] border-none bg-white p-8 flex flex-col justify-between shadow-sm group hover:scale-[1.02] transition-all">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/30 mb-10">Node Vitality</p>
          <div>
            <div className="flex items-baseline gap-2">
              <h4 className="text-3xl font-bold text-brand-dark tracking-tighter uppercase">Optimal</h4>
            </div>
            <p className="text-[9px] font-bold text-green-500 mt-2 bg-green-50 px-2.5 py-1 rounded-full inline-block uppercase">SYSTEM ACTIVE</p>
          </div>
        </Card>
        <Card className="rounded-[2.2rem] border-none bg-white p-8 flex flex-col justify-between shadow-sm group hover:scale-[1.02] transition-all">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/30 mb-10">Linkage Velocity</p>
          <div>
            <h4 className="text-4xl font-bold text-brand-dark tracking-tighter">+14.2%</h4>
            <p className="text-[9px] font-bold text-brand-dark/40 mt-1 uppercase tracking-wide">Monthly Delta</p>
          </div>
        </Card>
        <Card className="rounded-[2.2rem] border-none bg-white p-8 flex flex-col justify-between shadow-sm group hover:scale-[1.02] transition-all">
          <p className="text-[9px] font-bold uppercase tracking-widest text-brand-dark/30 mb-10">Regulatory Flags</p>
          <div>
            <div className="flex items-center gap-3">
              <h4 className="text-4xl font-bold text-brand-dark tracking-tighter">3</h4>
              <Badge className="bg-brand-yellow text-brand-dark border-none rounded-full px-3 py-0.5 text-[10px] font-bold">STABLE</Badge>
            </div>
            <p className="text-[9px] font-bold text-brand-dark/40 mt-1 uppercase tracking-wide">Active Inquiries</p>
          </div>
        </Card>
        <Card className="rounded-[2.2rem] border-none bg-brand-dark p-8 flex flex-col justify-between text-white shadow-2xl shadow-brand-dark/20 relative overflow-hidden">
          <p className="text-[9px] font-bold uppercase tracking-widest opacity-30 mb-10 relative z-10">System Sync</p>
          <div className="relative z-10">
            <h4 className="text-xl font-bold text-brand-yellow mb-1">May 21, 2026</h4>
            <p className="text-[9px] font-medium opacity-40 uppercase tracking-widest">Global LHDN Pulse</p>
          </div>
          <Activity className="absolute -right-8 -bottom-8 w-32 h-32 opacity-5" />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[2rem] border-none bg-white p-10 shadow-sm">
          <h3 className="text-xl font-bold mb-8 tracking-tight">Cradle Entity Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-brand-bg">
                  <th className="text-left py-4 text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">Registry Entity</th>
                  <th className="text-center py-4 text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">SSM</th>
                  <th className="text-center py-4 text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">BNM</th>
                  <th className="text-center py-4 text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">LHDN</th>
                  <th className="text-right py-4 text-[9px] font-bold uppercase tracking-widest text-brand-dark/30">Last Linkage</th>
                </tr>
              </thead>
              <tbody>
                {ecosystem.companies.map((company) => (
                  <tr key={company.id} className="border-b border-brand-bg last:border-none hover:bg-brand-bg/50 transition-all group">
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-10 h-10 rounded-xl shadow-sm border border-white group-hover:border-brand-yellow transition-all">
                          <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${company.id}`} />
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold tracking-tight">{company.name}</p>
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-dark/30">{company.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 text-center">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${company.compliance?.ssm === 'VERIFIED' ? 'bg-green-50 text-green-600' : 'bg-brand-yellow/10 text-brand-dark'}`}>
                        {company.compliance?.ssm}
                      </span>
                    </td>
                    <td className="py-6 text-center">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${company.compliance?.bnm === 'CLEARED' ? 'bg-blue-50 text-blue-600' : 'bg-brand-yellow/10 text-brand-dark'}`}>
                        {company.compliance?.bnm}
                      </span>
                    </td>
                    <td className="py-6 text-center">
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${company.compliance?.lhdn === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-brand-yellow/10 text-brand-dark'}`}>
                        {company.compliance?.lhdn}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <p className="text-[9px] font-bold font-mono tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">{company.compliance?.lastAuditDate}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-8">
          <Card className="rounded-[2rem] border-none bg-white p-8 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark/30 mb-6">Asset Class Linkages</h3>
            <div className="space-y-6">
              {[
                { sector: 'Fintech Logic', score: 94, trend: '+3.2%', color: 'bg-green-500' },
                { sector: 'Venture Ops', score: 98, trend: '+0.1%', color: 'bg-brand-dark' },
                { sector: 'Aero Systems', score: 82, trend: '-2.4%', color: 'bg-brand-yellow' },
                { sector: 'Logistics Matrix', score: 89, trend: '+1.5%', color: 'bg-green-500' },
                { sector: 'Digital Commerce', score: 76, trend: '-4.8%', color: 'bg-red-500' }
              ].map(s => (
                <div key={s.sector} className="space-y-2 pt-4 first:pt-0 border-t border-brand-bg first:border-none">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold tracking-tight text-brand-dark">{s.sector}</span>
                    <span className={`text-[9px] font-bold tracking-widest ${s.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {s.trend}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-bg rounded-full overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}