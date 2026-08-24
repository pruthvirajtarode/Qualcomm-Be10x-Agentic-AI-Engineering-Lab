"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Bot, Save, Database, Wrench, Network, LayoutTemplate, Play, Terminal, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { AgentTraceStep, simulateAgentExecution } from "@/lib/demo-agent";

export default function AgentBuilderPage() {
  const router = useRouter();
  const { completeModule, addXP, unlockBadge } = useWorkshopStore();
  
  const [agentBuilt, setAgentBuilt] = useState(false);
  const [config, setConfig] = useState({
    name: "Enterprise Assistant",
    goal: "Help engineers query documentation and calculate latency.",
    memory: "short-term",
    tools: ["Search", "Calculator", "RAG"]
  });

  const [traceSteps, setTraceSteps] = useState<AgentTraceStep[]>([]);
  const [demoRunning, setDemoRunning] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState("");

  const handleComplete = () => {
    completeModule('agent-builder');
    addXP(150);
    unlockBadge('Agent Builder');
    toast.success("Module Completed & Badge Unlocked!");
    router.push('/workshop/qualcomm-ai');
  };

  const handleBuild = () => {
    if (!config.name || !config.goal) {
      toast.error("Please provide a name and goal.");
      return;
    }
    setAgentBuilt(true);
    toast.success("Agent Architecture Generated!");
  };

  const runAgent = async () => {
    if (demoRunning) return;
    setDemoRunning(true);
    setTraceSteps([]);
    setFinalAnswer("");
    
    const answer = await simulateAgentExecution(
      config.goal,
      (step) => setTraceSteps((prev) => [...prev, step])
    );
    
    setFinalAnswer(answer);
    setDemoRunning(false);
  };

  const toggleTool = (tool: string) => {
    setConfig(prev => ({
      ...prev,
      tools: prev.tools.includes(tool) 
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool]
    }));
  };

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LayoutTemplate className="w-8 h-8 text-primary" /> Build Your Agent
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure an autonomous agent and visualize its architecture.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop/tool-calling')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-xl h-full flex flex-col">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
              <CardTitle className="text-lg">Agent Configuration</CardTitle>
              <CardDescription>Define the parameters of your agentic system</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6 flex-1">
              
              <div className="space-y-3">
                <label className="text-sm font-semibold tracking-wide text-foreground">Agent Name</label>
                <Input 
                  value={config.name}
                  onChange={(e) => setConfig({...config, name: e.target.value})}
                  disabled={agentBuilt}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold tracking-wide text-foreground">Primary Goal</label>
                <textarea 
                  className="w-full h-24 bg-background border border-border/60 rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none disabled:opacity-50"
                  value={config.goal}
                  onChange={(e) => setConfig({...config, goal: e.target.value})}
                  disabled={agentBuilt}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold tracking-wide text-foreground flex items-center gap-2">
                  <Wrench className="w-4 h-4" /> Capabilities & Tools
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Search', 'Calculator', 'RAG', 'Code Analyzer', 'Planner'].map(tool => (
                    <div 
                      key={tool}
                      onClick={() => !agentBuilt && toggleTool(tool)}
                      className={`p-2 rounded-md border text-xs font-medium text-center cursor-pointer transition-colors ${
                        config.tools.includes(tool) 
                          ? 'bg-primary/20 border-primary text-primary' 
                          : 'bg-muted/50 border-border hover:bg-muted text-muted-foreground'
                      } ${agentBuilt ? 'cursor-not-allowed opacity-80' : ''}`}
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
            <CardFooter className="border-t border-border/50 p-4 bg-muted/10">
              {!agentBuilt ? (
                <Button onClick={handleBuild} className="w-full gap-2">
                  <Bot className="w-4 h-4" /> Build Agent Architecture
                </Button>
              ) : (
                <div className="flex gap-2 w-full">
                  <Button onClick={() => setAgentBuilt(false)} variant="outline" className="flex-1">
                    Edit Config
                  </Button>
                  <Button onClick={runAgent} disabled={demoRunning} className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white">
                    <Play className="w-4 h-4 fill-current" /> Run Agent
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>

        {/* Right Panel: Architecture & Trace */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            {!agentBuilt ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-[600px] flex flex-col items-center justify-center border border-dashed border-border/60 rounded-xl bg-card/20 text-muted-foreground"
              >
                <Network className="w-16 h-16 mb-4 opacity-20" />
                <h3 className="text-xl font-semibold opacity-70">Architecture Pending</h3>
                <p className="text-sm mt-2 opacity-50">Configure and build your agent to visualize it</p>
              </motion.div>
            ) : (
              <motion.div
                key="built"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Architecture Visual */}
                <Card className="border-primary/30 bg-primary/5 shadow-lg overflow-hidden">
                  <div className="bg-primary/10 p-3 text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-2 border-b border-primary/20">
                    <Bot className="w-4 h-4" /> Generated Architecture: {config.name}
                  </div>
                  <div className="p-6 flex flex-col items-center">
                    
                    <div className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium shadow-sm mb-4 relative">
                      USER REQUEST
                      <div className="absolute left-1/2 -bottom-4 w-px h-4 bg-primary/50" />
                    </div>
                    
                    <div className="border border-primary/40 rounded-xl p-6 bg-card/80 w-full max-w-md relative shadow-md">
                      <div className="absolute -top-3 left-4 bg-primary px-3 py-0.5 rounded-full text-xs font-bold text-primary-foreground">
                        AGENT ORCHESTRATOR
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {config.tools.includes('Planner') && (
                          <div className="p-3 bg-muted/50 border border-border/50 rounded-lg text-center text-xs font-semibold flex flex-col items-center gap-2">
                            <Network className="w-4 h-4 text-primary" /> Planner
                          </div>
                        )}
                        <div className="p-3 bg-muted/50 border border-border/50 rounded-lg text-center text-xs font-semibold flex flex-col items-center gap-2">
                          <Brain className="w-4 h-4 text-primary" /> Core LLM
                        </div>
                        {config.tools.length > 0 && (
                          <div className="p-3 bg-muted/50 border border-border/50 rounded-lg text-center text-xs font-semibold flex flex-col items-center gap-2 col-span-2">
                            <Wrench className="w-4 h-4 text-primary" /> Tool Registry
                            <div className="flex gap-1 flex-wrap justify-center mt-1">
                              {config.tools.filter(t => t !== 'Planner').map(t => (
                                <span key={t} className="text-[10px] bg-background border px-1.5 py-0.5 rounded text-muted-foreground">{t}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="relative mt-4">
                      <div className="absolute left-1/2 -top-4 w-px h-4 bg-primary/50" />
                      <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-500 rounded-lg text-sm font-medium shadow-sm">
                        FINAL RESPONSE
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Execution Trace */}
                <Card className="border-border/50 shadow-lg bg-[#0c1529]">
                  <CardHeader className="border-b border-white/10 bg-black/20 py-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-mono text-gray-300 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-primary" /> Agent Debugger
                    </CardTitle>
                    {demoRunning && <span className="text-xs text-yellow-500 animate-pulse font-mono">Running...</span>}
                  </CardHeader>
                  <CardContent className="p-6 font-mono text-sm overflow-y-auto max-h-[300px]">
                    {traceSteps.length === 0 ? (
                      <div className="text-muted-foreground opacity-50 text-center py-8">
                        Click &quot;Run Agent&quot; to see the execution trace
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {traceSteps.map((step, idx) => (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={step.id + idx}
                            className="flex flex-col text-xs"
                          >
                            <div className="flex gap-3">
                              <span className={`w-16 shrink-0 font-bold ${
                                step.status === 'RUNNING' ? 'text-yellow-500' :
                                step.status === 'SUCCESS' ? 'text-green-500' : 'text-gray-400'
                              }`}>
                                [{step.status}]
                              </span>
                              <span className="text-primary/80 font-bold w-20 shrink-0">[{step.component}]</span>
                              <span className="text-gray-300">{step.message}</span>
                              {step.latency && <span className="text-gray-600 ml-auto">{step.latency}ms</span>}
                            </div>
                            {step.details && (
                              <div className="ml-[152px] text-gray-500 mt-0.5">↳ {step.details}</div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleComplete} className="gap-2 group">
          Complete & Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

    </div>
  );
}
