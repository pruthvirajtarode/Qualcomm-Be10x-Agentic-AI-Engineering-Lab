"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Server, Smartphone, Cloud, Cpu, Network, CheckCircle2, Trophy, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

type NodePosition = 'device' | 'cloud' | null;

export default function ArchitectureLabPage() {
  const router = useRouter();
  const { completeModule, addXP, unlockBadge } = useWorkshopStore();
  const { width, height } = useWindowSize();
  
  const [nodes, setNodes] = useState({
    ui: 'device' as NodePosition,
    npu: null as NodePosition,
    rag: null as NodePosition,
    heavyLLM: null as NodePosition
  });
  
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlaceNode = (node: keyof typeof nodes, position: NodePosition) => {
    setNodes(prev => ({ ...prev, [node]: position }));
  };

  const evaluateArchitecture = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      
      // Optimal Hybrid Architecture:
      // UI -> Device
      // NPU -> Device
      // Heavy LLM -> Cloud
      // RAG -> Cloud (or Device, but usually Cloud for large enterprise data)
      
      if (nodes.npu === 'device' && nodes.heavyLLM === 'cloud' && nodes.rag !== null) {
        setShowSuccess(true);
        completeModule('architecture-lab');
        addXP(200);
        unlockBadge('Hybrid Master');
        toast.success("Perfect Architecture! Workshop Completed!", { duration: 5000 });
      } else {
        toast.error("Suboptimal Architecture", {
          description: "Hint: NPU should be on-device. Heavy LLM should be in the cloud."
        });
      }
    }, 1500);
  };

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8 relative">
      
      {showSuccess && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}

      <div className="flex items-center justify-between z-10 relative">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Network className="w-8 h-8 text-primary" /> Hybrid Architecture Lab
          </h1>
          <p className="text-muted-foreground mt-2">
            Design an optimal Enterprise AI system distributing workloads between Cloud and Edge.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop/qualcomm-ai')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative">
        
        {/* Component Palette */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
              <CardTitle className="text-base">Components</CardTitle>
              <CardDescription className="text-xs">Assign to Cloud or Device</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              
              <div className="p-3 bg-muted/50 border border-border rounded-lg flex items-center justify-between opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Smartphone className="w-4 h-4" /> Client UI
                </div>
                <div className="text-xs text-primary font-bold">DEVICE</div>
              </div>
              
              <div className="p-3 bg-card border border-border rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Cpu className="w-4 h-4 text-green-500" /> NPU Agent (Light)
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={nodes.npu === 'device' ? 'default' : 'outline'} className="flex-1 h-7 text-xs" onClick={() => handlePlaceNode('npu', 'device')}>Device</Button>
                  <Button size="sm" variant={nodes.npu === 'cloud' ? 'default' : 'outline'} className="flex-1 h-7 text-xs" onClick={() => handlePlaceNode('npu', 'cloud')}>Cloud</Button>
                </div>
              </div>

              <div className="p-3 bg-card border border-border rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Server className="w-4 h-4 text-purple-500" /> Heavy LLM (100B+)
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={nodes.heavyLLM === 'device' ? 'default' : 'outline'} className="flex-1 h-7 text-xs" onClick={() => handlePlaceNode('heavyLLM', 'device')}>Device</Button>
                  <Button size="sm" variant={nodes.heavyLLM === 'cloud' ? 'default' : 'outline'} className="flex-1 h-7 text-xs" onClick={() => handlePlaceNode('heavyLLM', 'cloud')}>Cloud</Button>
                </div>
              </div>

              <div className="p-3 bg-card border border-border rounded-lg shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Database className="w-4 h-4 text-blue-500" /> Enterprise RAG DB
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant={nodes.rag === 'device' ? 'default' : 'outline'} className="flex-1 h-7 text-xs" onClick={() => handlePlaceNode('rag', 'device')}>Device</Button>
                  <Button size="sm" variant={nodes.rag === 'cloud' ? 'default' : 'outline'} className="flex-1 h-7 text-xs" onClick={() => handlePlaceNode('rag', 'cloud')}>Cloud</Button>
                </div>
              </div>

            </CardContent>
            <CardFooter className="pt-0 pb-4 px-4">
              <Button 
                className="w-full" 
                onClick={evaluateArchitecture}
                disabled={nodes.npu === null || nodes.heavyLLM === null || nodes.rag === null || isEvaluating || showSuccess}
              >
                {isEvaluating ? 'Evaluating...' : 'Test Architecture'}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Architecture Canvas */}
        <div className="lg:col-span-9">
          <Card className="h-[600px] border-border/50 bg-black/20 shadow-xl overflow-hidden flex flex-col">
            <div className="flex-1 grid grid-cols-2">
              
              {/* Device Region */}
              <div className="border-r border-dashed border-border/50 p-6 flex flex-col">
                <div className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase mb-8">
                  <Smartphone className="w-5 h-5" /> Edge / Device
                </div>
                
                <div className="flex-1 flex flex-col items-center gap-6">
                  <div className="w-48 p-4 bg-card/80 border border-border rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold">
                    <Smartphone className="w-5 h-5" /> Client UI
                  </div>
                  
                  {nodes.npu === 'device' && (
                    <motion.div layoutId="npu" className="w-48 p-4 bg-green-500/10 border border-green-500/50 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold text-green-500">
                      <Cpu className="w-5 h-5" /> NPU Agent
                    </motion.div>
                  )}
                  {nodes.heavyLLM === 'device' && (
                    <motion.div layoutId="heavy" className="w-48 p-4 bg-purple-500/10 border border-purple-500/50 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold text-purple-500">
                      <Server className="w-5 h-5" /> Heavy LLM
                    </motion.div>
                  )}
                  {nodes.rag === 'device' && (
                    <motion.div layoutId="rag" className="w-48 p-4 bg-blue-500/10 border border-blue-500/50 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold text-blue-500">
                      <Database className="w-5 h-5" /> Enterprise RAG
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Cloud Region */}
              <div className="p-6 flex flex-col">
                <div className="flex items-center gap-2 text-blue-400 font-bold tracking-widest uppercase mb-8">
                  <Cloud className="w-5 h-5" /> Cloud
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center gap-6 relative">
                  {/* Fake connection line */}
                  <div className="absolute top-1/2 -left-12 w-24 border-t-2 border-dashed border-primary/30" />
                  
                  {nodes.npu === 'cloud' && (
                    <motion.div layoutId="npu" className="w-48 p-4 bg-green-500/10 border border-green-500/50 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold text-green-500">
                      <Cpu className="w-5 h-5" /> NPU Agent
                    </motion.div>
                  )}
                  {nodes.heavyLLM === 'cloud' && (
                    <motion.div layoutId="heavy" className="w-48 p-4 bg-purple-500/10 border border-purple-500/50 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold text-purple-500">
                      <Server className="w-5 h-5" /> Heavy LLM
                    </motion.div>
                  )}
                  {nodes.rag === 'cloud' && (
                    <motion.div layoutId="rag" className="w-48 p-4 bg-blue-500/10 border border-blue-500/50 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold text-blue-500">
                      <Database className="w-5 h-5" /> Enterprise RAG
                    </motion.div>
                  )}
                </div>
              </div>

            </div>
          </Card>
        </div>
      </div>

      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-card border-2 border-primary p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 min-w-[400px]"
        >
          <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-2">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-center">Workshop Complete!</h2>
          <p className="text-center text-muted-foreground mb-4">
            You've successfully designed a Hybrid AI Architecture.
          </p>
          <Button size="lg" onClick={() => router.push('/workshop')} className="w-full gap-2">
            Return to Dashboard <Rocket className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

    </div>
  );
}

// Missing Database import
import { Database } from "lucide-react";
