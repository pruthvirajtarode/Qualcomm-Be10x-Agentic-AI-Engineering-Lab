"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Cpu, HardDrive, Zap, Shield, Smartphone, Globe, CloudOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import Image from "next/image";

type ProcessorType = 'cpu' | 'gpu' | 'npu' | null;

export default function QualcommAIPage() {
  const router = useRouter();
  const { completeModule, addXP, unlockBadge } = useWorkshopStore();
  
  const [activeProcessor, setActiveProcessor] = useState<ProcessorType>(null);

  const handleComplete = () => {
    completeModule('qualcomm-ai');
    addXP(100);
    unlockBadge('Architecture Architect');
    toast.success("Module Completed & Badge Unlocked!");
    router.push('/workshop/architecture-lab');
  };

  const PROCESSORS = {
    cpu: {
      title: "Qualcomm Kryo CPU",
      icon: HardDrive,
      role: "Sequential Processing",
      description: "Designed for general-purpose computing and sequential tasks. In an AI context, the CPU is excellent for managing the overall AI pipeline, orchestration, and handling non-parallelizable data preparation tasks.",
      strength: "Flexibility and sequential logic",
      color: "bg-blue-500 text-blue-500 border-blue-500"
    },
    gpu: {
      title: "Qualcomm Adreno GPU",
      icon: Zap,
      role: "Parallel Processing",
      description: "Designed for highly parallel operations and graphics rendering. The GPU excels at the large matrix multiplications required for training and some inference workloads, especially when high precision or diverse data types are needed.",
      strength: "High throughput and parallel matrix math",
      color: "bg-purple-500 text-purple-500 border-purple-500"
    },
    npu: {
      title: "Qualcomm Hexagon NPU",
      icon: Cpu,
      role: "Dedicated AI Acceleration",
      description: "Purpose-built for AI and machine learning inference. The Neural Processing Unit features scalar, vector, and tensor accelerators, delivering industry-leading performance-per-watt for complex generative AI and LLM inference directly on the device.",
      strength: "Extreme power efficiency and tensor math",
      color: "bg-green-500 text-green-500 border-green-500"
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Smartphone className="w-8 h-8 text-primary" /> On-Device AI Architecture
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore the Qualcomm AI Engine and heterogeneous computing.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop/agent-builder')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Hardware Visualizer */}
        <Card className="flex flex-col border-border/50 shadow-lg">
          <CardHeader className="bg-muted/20 border-b border-border/50 pb-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Qualcomm AI Stack</CardTitle>
              <CardDescription>Click components to explore heterogeneous computing</CardDescription>
            </div>
            <Image 
              src="/assets/qualcomm logo.png" 
              alt="Qualcomm Logo" 
              width={100} 
              height={20} 
              className="object-contain dark:invert opacity-80"
            />
          </CardHeader>
          <CardContent className="pt-10 flex-1 flex flex-col items-center justify-center min-h-[400px]">
            
            <div className="w-full max-w-sm space-y-6">
              <div className="bg-card border border-border rounded-lg p-3 text-center text-sm font-semibold shadow-sm">
                AI APPLICATION
              </div>
              
              <div className="flex justify-center text-muted-foreground">
                <ArrowDown className="w-5 h-5" />
              </div>
              
              <div className="bg-primary/10 border border-primary/30 text-primary rounded-lg p-3 text-center text-sm font-semibold shadow-sm">
                QUALCOMM AI STACK
              </div>
              
              <div className="flex justify-center text-muted-foreground">
                <ArrowDown className="w-5 h-5" />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setActiveProcessor('cpu')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    activeProcessor === 'cpu' 
                      ? 'border-blue-500 bg-blue-500/10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                      : 'border-border/50 bg-card text-muted-foreground hover:border-blue-500/50 hover:bg-blue-500/5'
                  }`}
                >
                  <HardDrive className="w-6 h-6 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">CPU</span>
                </button>
                
                <button
                  onClick={() => setActiveProcessor('gpu')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    activeProcessor === 'gpu' 
                      ? 'border-purple-500 bg-purple-500/10 text-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]' 
                      : 'border-border/50 bg-card text-muted-foreground hover:border-purple-500/50 hover:bg-purple-500/5'
                  }`}
                >
                  <Zap className="w-6 h-6 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">GPU</span>
                </button>
                
                <button
                  onClick={() => setActiveProcessor('npu')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    activeProcessor === 'npu' 
                      ? 'border-green-500 bg-green-500/10 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                      : 'border-border/50 bg-card text-muted-foreground hover:border-green-500/50 hover:bg-green-500/5'
                  }`}
                >
                  <Cpu className="w-6 h-6 mb-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">NPU</span>
                </button>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Dynamic Info Panel */}
        <div className="space-y-6 flex flex-col">
          <Card className="flex-1 border-border/50 shadow-lg">
            <CardContent className="p-8 h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!activeProcessor ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-muted-foreground"
                  >
                    <Smartphone className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium">Select a processor component</h3>
                    <p className="text-sm opacity-60 mt-2">Learn how Qualcomm distributes AI workloads efficiently across the system-on-chip.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeProcessor}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-xl ${PROCESSORS[activeProcessor].color.replace('text-', 'bg-').replace('500', '500/20').split(' ')[0]} ${PROCESSORS[activeProcessor].color.split(' ')[1]}`}>
                        {activeProcessor === 'cpu' && <HardDrive className="w-8 h-8" />}
                        {activeProcessor === 'gpu' && <Zap className="w-8 h-8" />}
                        {activeProcessor === 'npu' && <Cpu className="w-8 h-8" />}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{PROCESSORS[activeProcessor].title}</h2>
                        <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mt-1">
                          {PROCESSORS[activeProcessor].role}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50 text-foreground leading-relaxed">
                      {PROCESSORS[activeProcessor].description}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Key Strength: <span className="text-muted-foreground">{PROCESSORS[activeProcessor].strength}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* On-device benefits */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <div className="text-xs font-semibold">Privacy</div>
            </div>
            <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <div className="text-xs font-semibold">Low Latency</div>
            </div>
            <div className="bg-card border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2">
              <CloudOff className="w-6 h-6 text-green-500" />
              <div className="text-xs font-semibold">Offline Access</div>
            </div>
          </div>
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

// Ensure ArrowDown is imported above.
import { ArrowDown } from "lucide-react";
