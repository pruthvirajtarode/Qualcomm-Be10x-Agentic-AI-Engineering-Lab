"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Database, Network, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentTraceStep, simulateAgentExecution } from "@/lib/demo-agent";

export default function LandingPage() {
  const router = useRouter();
  const [traceSteps, setTraceSteps] = useState<AgentTraceStep[]>([]);
  const [demoRunning, setDemoRunning] = useState(false);
  const [demoComplete, setDemoComplete] = useState(false);
  const [finalAnswer, setFinalAnswer] = useState("");

  const runDemo = async () => {
    if (demoRunning) return;
    setDemoRunning(true);
    setTraceSteps([]);
    setDemoComplete(false);
    
    const answer = await simulateAgentExecution(
      "Design an AI assistant for enterprise engineers.",
      (step) => {
        setTraceSteps((prev) => [...prev, step]);
      }
    );
    
    setFinalAnswer(answer);
    setDemoComplete(true);
    setDemoRunning(false);
  };

  useEffect(() => {
    // Automatically start the demo after 1.5 seconds for a dynamic feel
    const timer = setTimeout(() => {
      runDemo();
    }, 1500);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-border/40 backdrop-blur-md sticky top-0 z-50 bg-background/80">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Image 
              src="/assets/qualcomm logo.png" 
              alt="Qualcomm Logo" 
              width={140} 
              height={40} 
              className="object-contain dark:invert"
            />
            <X className="w-4 h-4 text-muted-foreground/40" />
            <div className="bg-white/90 p-1.5 rounded-lg flex items-center justify-center shadow-sm">
              <Image 
                src="/assets/be 10 x logo.jpg" 
                alt="Be10x Logo" 
                width={70} 
                height={22} 
                className="object-contain mix-blend-multiply"
              />
            </div>
          </div>
          <div className="h-6 w-px bg-border hidden md:block" />
          <span className="text-sm font-medium tracking-widest text-muted-foreground hidden lg:block">
            ENGINEERING LAB
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Workshop</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Agentic AI</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">RAG</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Agent Lab</span>
        </nav>
        <Button onClick={() => router.push('/workshop')} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          Start Workshop <ArrowRight className="w-4 h-4" />
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 lg:p-16 gap-12 max-w-[1920px] mx-auto w-full relative overflow-hidden">
        {/* Abstract Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" 
        />

        {/* Left Content */}
        <div className="flex-1 space-y-8 z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold tracking-wide uppercase">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            3-Hour Hands-On Workshop
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Build intelligent systems that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">reason, retrieve and act.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
            A practical intermediate-to-advanced workshop covering Agentic AI, LLMs, RAG, tool calling, and modern AI application architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" onClick={() => router.push('/workshop')} className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/25 group">
              Start Workshop
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={runDemo} className="text-lg px-8 py-6 rounded-full bg-background/50 backdrop-blur-md hover:bg-muted">
              See Agentic AI in Action
            </Button>
          </div>
        </div>

        {/* Right Content - Interactive WOW DEMO */}
        <div className="flex-1 w-full max-w-2xl z-10 relative">
          <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 text-xs font-mono text-muted-foreground flex items-center gap-2">
                <Terminal className="w-3 h-3" />
                agent-trace-terminal.exe
              </div>
            </div>
            
            <div className="flex-1 p-6 font-mono text-sm overflow-y-auto flex flex-col gap-4">
              {!demoRunning && !demoComplete && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
                  <Network className="w-12 h-12 text-muted-foreground mb-2" />
                  <p>System ready.</p>
                  <p className="text-xs text-muted-foreground">Click &quot;See Agentic AI in Action&quot; to run simulation.</p>
                </div>
              )}
              
              {traceSteps.map((step, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={step.id + idx}
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 text-xs font-bold ${
                      step.status === 'RUNNING' ? 'text-yellow-500 animate-pulse' :
                      step.status === 'SUCCESS' ? 'text-green-500' :
                      'text-muted-foreground'
                    }`}>
                      {step.status === 'RUNNING' ? '⟳' : step.status === 'SUCCESS' ? '✓' : '>'}
                    </span>
                    <div className="flex-1">
                      <span className="text-primary-foreground font-semibold">[{step.component}]</span>{' '}
                      <span className="text-muted-foreground">{step.message}</span>
                      {step.latency && (
                        <span className="ml-2 text-xs text-muted-foreground/60">{step.latency}ms</span>
                      )}
                    </div>
                  </div>
                  {step.details && (
                    <div className="ml-6 pl-3 border-l-2 border-border/50 text-xs text-muted-foreground/80 mt-1">
                      {step.details}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {demoComplete && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary-foreground"
                >
                  <div className="text-xs text-primary mb-2 font-bold uppercase tracking-wider">Final Output Generated</div>
                  <div className="leading-relaxed text-sm font-sans">{finalAnswer}</div>
                  
                  <div className="mt-6 pt-4 border-t border-primary/20 flex items-center justify-between">
                    <div className="text-xs text-primary flex items-center gap-2">
                      <Cpu className="w-4 h-4" /> ARCHITECTURE GENERATED
                    </div>
                    <Button size="sm" onClick={() => router.push('/workshop')} variant="secondary" className="h-8 text-xs font-sans rounded-full">
                      Build this yourself →
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-8 mt-auto flex items-center justify-between bg-muted/20">
        <div className="text-xs text-muted-foreground">
          © 2026 Qualcomm Technologies, Inc. and/or its affiliated companies.
        </div>
      </footer>
    </div>
  );
}
