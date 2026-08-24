"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, X, Terminal, Brain, ArrowDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import { AgentTraceStep, simulateAgentExecution } from "@/lib/demo-agent";

export default function AgenticAIPage() {
  const router = useRouter();
  const { completeModule, addXP } = useWorkshopStore();
  const [demoRunning, setDemoRunning] = useState(false);
  const [traceSteps, setTraceSteps] = useState<AgentTraceStep[]>([]);
  const [finalAnswer, setFinalAnswer] = useState("");

  const handleComplete = () => {
    completeModule('agentic-ai');
    addXP(100);
    toast.success("Module Completed!");
    router.push('/workshop/llm-playground');
  };

  const runSimulation = async () => {
    if (demoRunning) return;
    setDemoRunning(true);
    setTraceSteps([]);
    setFinalAnswer("");
    
    const answer = await simulateAgentExecution(
      "Calculate latency of 150 requests if Hexagon NPU processes 1 in 10ms",
      (step) => setTraceSteps((prev) => [...prev, step])
    );
    
    setFinalAnswer(answer);
    setDemoRunning(false);
  };

  const COMPARISON = [
    { feature: "System", basic: "Chatbot", rag: "RAG App", agent: "Agentic System" },
    { feature: "Reasoning", basic: <X className="w-5 h-5 text-red-500 mx-auto" />, rag: <X className="w-5 h-5 text-red-500 mx-auto" />, agent: <Check className="w-5 h-5 text-green-500 mx-auto" /> },
    { feature: "Memory", basic: "Short-term", rag: "Context window", agent: "Long-term / Stateful" },
    { feature: "Tools", basic: <X className="w-5 h-5 text-red-500 mx-auto" />, rag: <X className="w-5 h-5 text-red-500 mx-auto" />, agent: <Check className="w-5 h-5 text-green-500 mx-auto" /> },
    { feature: "Planning", basic: <X className="w-5 h-5 text-red-500 mx-auto" />, rag: <X className="w-5 h-5 text-red-500 mx-auto" />, agent: <Check className="w-5 h-5 text-green-500 mx-auto" /> },
    { feature: "Autonomy", basic: "Low", rag: "Low", agent: "High" },
  ];

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-6xl mx-auto space-y-12">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agentic AI Fundamentals</h1>
          <p className="text-muted-foreground mt-2">
            What makes a system truly "Agentic"?
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop/ai-landscape')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      {/* Comparison Table */}
      <Card className="border-border/50 bg-card/40 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>System Capabilities Comparison</CardTitle>
          <CardDescription>Understanding the gap between standard LLM apps and Agents.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg font-semibold">Capability</th>
                  <th className="px-6 py-4 text-center font-semibold">Basic Chatbot</th>
                  <th className="px-6 py-4 text-center font-semibold">RAG Application</th>
                  <th className="px-6 py-4 text-center font-semibold text-primary bg-primary/5 rounded-tr-lg">Agentic System</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {COMPARISON.slice(1).map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4 font-medium">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.basic}</td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{row.rag}</td>
                    <td className="px-6 py-4 text-center font-medium bg-primary/5 text-primary-foreground">{row.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Agent Loop & Simulation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/50 bg-card/40 backdrop-blur-sm flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              The Agent Loop
            </CardTitle>
            <CardDescription>The cognitive architecture of an Agent.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="flex flex-col items-center w-full max-w-xs relative">
              {['USER GOAL', 'PLAN', 'REASON', 'SELECT TOOL', 'EXECUTE', 'OBSERVE', 'FINAL RESPONSE'].map((node, i) => (
                <div key={node} className="flex flex-col items-center w-full">
                  <div className={`w-full text-center py-2.5 rounded-lg border text-sm font-bold tracking-wide transition-all ${
                    i === 0 ? 'bg-primary/20 border-primary text-primary' : 
                    i === 6 ? 'bg-green-500/20 border-green-500 text-green-500' : 
                    'bg-card border-border/50 text-foreground'
                  }`}>
                    {node}
                  </div>
                  {i < 6 && <ArrowDown className="w-5 h-5 text-muted-foreground my-1.5" />}
                </div>
              ))}
              
              {/* Visual Loop representation */}
              <div className="absolute top-[35%] bottom-[25%] -left-8 w-8 border-l-2 border-y-2 border-dashed border-primary/40 rounded-l-xl opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40 backdrop-blur-sm flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Live Trace
              </CardTitle>
              <CardDescription>Watch the agent execute its loop.</CardDescription>
            </div>
            <Button onClick={runSimulation} disabled={demoRunning} size="sm">
              {demoRunning ? 'Running...' : 'Run Simulation'}
            </Button>
          </CardHeader>
          <CardContent className="flex-1 bg-black/50 m-4 rounded-lg p-4 font-mono text-sm overflow-y-auto max-h-[400px]">
            {traceSteps.length === 0 && !demoRunning && (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                Click Run Simulation to start
              </div>
            )}
            
            <div className="space-y-2">
              {traceSteps.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={step.id + idx}
                  className="flex flex-col text-xs md:text-sm"
                >
                  <div className="flex gap-2">
                    <span className={`${
                      step.status === 'RUNNING' ? 'text-yellow-500 animate-pulse' :
                      step.status === 'SUCCESS' ? 'text-green-500' :
                      'text-muted-foreground'
                    }`}>
                      {step.status === 'RUNNING' ? '...' : step.status === 'SUCCESS' ? '✓' : '>'}
                    </span>
                    <span className="text-primary/80 font-semibold w-20 shrink-0">[{step.component}]</span>
                    <span className="text-gray-300">{step.message}</span>
                  </div>
                  {step.details && (
                    <div className="ml-24 text-gray-500 text-xs mt-0.5">↳ {step.details}</div>
                  )}
                </motion.div>
              ))}
              {finalAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded text-gray-200"
                >
                  <div className="text-primary font-bold mb-1 uppercase tracking-wider text-xs">Response</div>
                  {finalAnswer}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t border-border/40">
        <Button size="lg" onClick={handleComplete} className="gap-2 group">
          Complete & Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
