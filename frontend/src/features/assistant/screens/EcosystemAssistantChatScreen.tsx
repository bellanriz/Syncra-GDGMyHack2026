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



export function EcosystemAssistantChatScreen({ activeAgentTab, setActiveAgentTab, selectedNodeId, setSelectedNodeId, ecosystem, agentChat, nodeChats, adminFounderChat, isLoading, nodeMatches, selectNodeMatch, inputMessage, handleInputChange, handleSendMessage, scrollRef, role }: any) {
 return (            <motion.div 
               key="agent"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="max-w-7xl mx-auto h-[calc(100vh-140px)] flex flex-col px-4 w-full"
            >
               <div className="text-center mb-4 pt-2 flex flex-col items-center shrink-0">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="w-16 h-16 bg-brand-dark rounded-[1.4rem] flex items-center justify-center text-brand-yellow mb-3 shadow-xl relative"
                  >
                    <SyncraLogo size={36} />
                    <div className="absolute -inset-1.5 bg-brand-yellow/5 rounded-[1.8rem] animate-pulse -z-10" />
                  </motion.div>
                  <h1 className="text-3xl font-extrabold tracking-tighter mb-2 text-brand-dark leading-tight">Syncra Connect</h1>
                  
                  <div className="flex bg-brand-bg/50 p-1 rounded-2xl mt-2 border border-brand-bg shrink-0">
                    <button 
                      onClick={() => {
                        setActiveAgentTab('AI_AGENT');
                        setSelectedNodeId(null);
                      }}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeAgentTab === 'AI_AGENT' ? 'bg-brand-dark text-brand-yellow shadow-lg' : 'text-brand-dark/40 hover:text-brand-dark'}`}
                    >
                      <Sparkles size={12} />
                      Syncra Intelligence
                    </button>
                    <button 
                      onClick={() => setActiveAgentTab('DIRECT_LINKAGE')}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeAgentTab === 'DIRECT_LINKAGE' ? 'bg-brand-dark text-brand-yellow shadow-lg' : 'text-brand-dark/40 hover:text-brand-dark'}`}
                    >
                      <MessageSquare size={12} />
                      Syncra Chat
                    </button>
                  </div>
               </div>

               <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl shadow-brand-dark/5 flex flex-col overflow-hidden mb-2 border border-brand-bg min-h-0">
                  <ScrollArea className="flex-1 min-h-0 scroll-smooth">
                    <div className="max-w-6xl mx-auto p-6 md:p-10">
                        {(() => {
                          const isDirectLinkage = activeAgentTab === 'DIRECT_LINKAGE';
                          const currentChat = activeAgentTab === 'AI_AGENT' 
                            ? agentChat 
                            : (selectedNodeId ? (nodeChats[selectedNodeId] || []) : []);
                          
                          const selectedNode = isDirectLinkage && selectedNodeId 
                            ? [...ecosystem.mentors, ...ecosystem.partners, ...ecosystem.serviceProviders].find(n => n.id === selectedNodeId)
                            : null;

                          if (activeAgentTab === 'AI_AGENT' && agentChat.length === 0) {
                            return (
                              <motion.div 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 my-auto"
                              >
                                <AssistantPromptSuggestion text="Verify latest linkages" icon={<CheckCircle2 size={18}/>} />
                                <AssistantPromptSuggestion text="Match Alex with a venture" icon={<Handshake size={18}/>} />
                                <AssistantPromptSuggestion text="Show program velocity" icon={<BarChart3 size={18}/>} />
                                <AssistantPromptSuggestion text="Analyze regulatory trends" icon={<SyncraLogo size={20}/>} />
                              </motion.div>
                            );
                          }

                          if (isDirectLinkage && !selectedNodeId) {
                            return (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
                              >
                                <div className="w-20 h-20 bg-brand-bg rounded-[2rem] flex items-center justify-center text-brand-dark/20 mb-8 shadow-inner">
                                  <Users size={32} />
                                </div>
                                <h2 className="text-2xl font-bold mb-4 tracking-tight">Ecosystem Linkage Hub</h2>
                                <p className="text-sm text-brand-dark/40 mb-10 max-w-sm font-medium">Select an authorized ecosystem node to initiate a secure direct linkage channel.</p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
                                  {[...ecosystem.mentors, ...ecosystem.partners, ...ecosystem.serviceProviders].map(node => (
                                    <button 
                                      key={node.id}
                                      onClick={() => setSelectedNodeId(node.id)}
                                      className="flex flex-col items-center p-6 bg-white rounded-[2rem] border border-brand-bg hover:border-brand-yellow hover:shadow-xl hover:-translate-y-1 transition-all group shadow-sm"
                                    >
                                      <Avatar className="w-16 h-16 mb-4 border-2 border-transparent group-hover:border-brand-yellow transition-all">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${node.id}`} />
                                      </Avatar>
                                      <span className="text-xs font-bold text-brand-dark group-hover:text-brand-dark truncate w-full text-center">{node.name}</span>
                                      <span className="text-[10px] font-bold text-brand-dark/20 uppercase tracking-widest mt-1">Verified Node</span>
                                    </button>
                                  ))}
                                  
                                  <button 
                                    onClick={() => setSelectedNodeId('ADMIN_HQ')}
                                    className="flex flex-col items-center p-6 bg-brand-dark rounded-[2rem] border border-brand-dark hover:shadow-xl hover:-translate-y-1 transition-all group shadow-sm text-white"
                                  >
                                    <div className="w-16 h-16 mb-4 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark">
                                      <Shield size={28} />
                                    </div>
                                    <span className="text-xs font-bold truncate w-full text-center">Syncra HQ</span>
                                    <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest mt-1">Admin Channel</span>
                                  </button>
                                </div>
                              </motion.div>
                            );
                          }

                          return (
                            <div className="space-y-6 py-2">
                              {isDirectLinkage && selectedNodeId && (
                                <div className="flex items-center justify-between mb-8 p-5 bg-brand-bg/50 rounded-[2rem] border border-brand-bg">
                                  <div className="flex items-center gap-4">
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => setSelectedNodeId(null)}
                                      className="h-10 w-10 p-0 rounded-full hover:bg-white transition-all hover:scale-110"
                                    >
                                      <ChevronLeft size={20} />
                                    </Button>
                                    <Avatar className="w-12 h-12 border-2 border-brand-yellow shadow-sm">
                                      <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${selectedNodeId}`} />
                                      <AvatarFallback>{selectedNodeId === 'ADMIN_HQ' ? 'HQ' : '?'}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="font-bold text-base leading-tight">
                                        {selectedNodeId === 'ADMIN_HQ' ? 'Syncra Admin HQ' : (selectedNode?.name || 'Ecosystem Node')}
                                      </h3>
                                      <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Connection Live</p>
                                      </div>
                                    </div>
                                  </div>
                                  <Badge className="bg-brand-dark text-white rounded-full px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest border-none">LINK-{selectedNodeId.slice(0, 4).toUpperCase()}</Badge>
                                </div>
                              )}

                              {currentChat.length === 0 && isDirectLinkage && selectedNodeId && (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="py-20 text-center"
                                >
                                  <p className="text-xs font-bold text-brand-dark/20 uppercase tracking-[0.2em]">Start a secure conversation with {selectedNodeId === 'ADMIN_HQ' ? 'HQ' : (selectedNode?.name || 'this node')}</p>
                                </motion.div>
                              )}

                              {(selectedNodeId === 'ADMIN_HQ' ? adminFounderChat : currentChat).map((msg, i) => {
                                const isBot = msg.role === 'bot';
                                let sender = '';
                                
                                if (activeAgentTab === 'AI_AGENT') {
                                  sender = isBot ? 'Syncra IQ Core' : 'Authorized Admin';
                                } else {
                                  if (selectedNodeId === 'ADMIN_HQ') {
                                    sender = isBot ? 'Programme HQ' : 'Me';
                                  } else {
                                    sender = isBot ? selectedNode?.name || 'Ecosystem Node' : 'Me';
                                  }
                                }

                                return (
                                  <motion.div 
                                    initial={{ opacity: 0, x: isBot ? -15 : 15 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i} 
                                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} gap-2`}
                                  >
                                     <div className="flex items-center gap-2 opacity-30 uppercase font-bold text-[9px] tracking-[0.2em] px-3">
                                        {sender}
                                     </div>
                                     <div className={`p-5 rounded-[1.8rem] max-w-[85%] shadow-sm ${isBot ? 'bg-brand-bg text-brand-dark border border-brand-dark/5' : 'bg-brand-dark text-white shadow-xl shadow-brand-dark/10'}`}>
                                        <p className="text-sm leading-relaxed font-bold tracking-tight whitespace-pre-line">{msg.content}</p>
                                     </div>
                                  </motion.div>
                                );
                              })}
                              {isLoading && activeAgentTab === 'AI_AGENT' && (
                                <div className="flex gap-1.5 p-5 bg-brand-bg rounded-[1.5rem] w-20 justify-center shadow-inner mt-4">
                                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-brand-dark" />
                                </div>
                              )}
                            </div>
                          );
                        })()}
                       <div ref={scrollRef} className="h-4" />
                    </div>
                  </ScrollArea>

                  <div className="p-6 md:p-10 border-t border-brand-bg bg-white shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.06)] shrink-0">
                    <div className="relative max-w-6xl mx-auto">
                      <AnimatePresence>
                        {nodeMatches.length > 0 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute bottom-full left-0 mb-6 bg-white border border-brand-bg rounded-[2rem] shadow-2xl p-3 flex flex-col w-72 z-[100] backdrop-blur-xl bg-white/90"
                          >
                            <p className="text-[9px] font-bold text-brand-dark/30 uppercase tracking-[0.2em] px-4 py-3 border-b border-brand-bg mb-2">Ecosystem Discovery</p>
                            {nodeMatches.map(node => (
                              <button 
                                key={node.id}
                                onClick={() => selectNodeMatch(node.name)}
                                className="flex items-center gap-4 px-4 py-3 hover:bg-brand-bg rounded-2xl transition-all text-left group"
                              >
                                <Avatar className="w-10 h-10 border border-brand-bg shadow-sm group-hover:border-brand-yellow transition-all">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${node.id}`} />
                                </Avatar>
                                <div>
                                  <p className="text-xs font-bold text-brand-dark group-hover:text-brand-dark transition-colors">{node.name}</p>
                                  <p className="text-[9px] font-bold text-brand-dark/30 uppercase tracking-tighter">Verified Node</p>
                                </div>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="relative group">
                        <Input 
                          placeholder={activeAgentTab === 'AI_AGENT' ? "Inquire with Syncra Intelligence..." : (selectedNodeId ? `Secure message to ${selectedNodeId === 'ADMIN_HQ' ? 'Syncra Admin HQ' : ([...ecosystem.mentors, ...ecosystem.partners, ...ecosystem.serviceProviders].find(n => n.id === selectedNodeId)?.name)}...` : "Select a contact above to message...")}
                          disabled={activeAgentTab === 'DIRECT_LINKAGE' && !selectedNodeId}
                          className="pr-20 h-16 md:h-20 rounded-[2rem] md:rounded-[2.5rem] bg-brand-bg/40 border-none px-8 md:px-10 text-sm md:text-lg font-bold tracking-tight shadow-inner placeholder:text-brand-dark/20 focus-visible:ring-brand-yellow/30 focus-visible:bg-white transition-all disabled:opacity-20"
                          value={inputMessage}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button 
                           className="absolute right-3 top-3 h-10 w-10 md:h-14 md:w-14 p-0 rounded-[1.2rem] md:rounded-[1.8rem] bg-brand-dark text-brand-yellow hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-dark/20 disabled:hidden"
                           onClick={() => handleSendMessage()}
                           disabled={!inputMessage.trim() || (activeAgentTab === 'DIRECT_LINKAGE' && !selectedNodeId)}
                        >
                           <ChevronRight size={24} strokeWidth={3} />
                        </Button>
                      </div>
                    </div>
                  </div>
               </div>
            </motion.div>);
}
