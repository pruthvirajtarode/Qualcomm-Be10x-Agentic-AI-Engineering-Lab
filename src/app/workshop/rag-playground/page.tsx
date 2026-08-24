"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Search, Database, FileText, Bot, Layers, Network, ArrowDown, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { simulateRetrieval, RetrievedChunk } from "@/lib/demo-rag";

export default function RAGPlaygroundPage() {
  const router = useRouter();
  const { completeModule, addXP, unlockBadge } = useWorkshopStore();
  
  const [query, setQuery] = useState("What is Qualcomm AI Hub?");
  const [isSearching, setIsSearching] = useState(false);
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [chunks, setChunks] = useState<RetrievedChunk[]>([]);
  const [answer, setAnswer] = useState("");

  const handleComplete = () => {
    completeModule('rag-playground');
    addXP(100);
    unlockBadge('RAG Explorer');
    toast.success("Module Completed & Badge Unlocked!");
    router.push('/workshop/tool-calling');
  };

  const executePipeline = async () => {
    if (!query || isSearching) return;
    
    setIsSearching(true);
    setStep(1); // Show query understanding
    setChunks([]);
    setAnswer("");
    
    // Simulate query understanding
    await new Promise(r => setTimeout(r, 600));
    
    // Retrieval step
    setStep(2);
    const retrieved = await simulateRetrieval(query);
    setChunks(retrieved);
    
    // Generation step
    await new Promise(r => setTimeout(r, 800));
    setStep(3);
    
    // Deterministic answer generation based on retrieved context
    if (retrieved.length > 0 && retrieved[0].score > 0.6) {
      setAnswer(`Based on the retrieved context, ${retrieved[0].document.content}`);
    } else {
      setAnswer("I'm sorry, I couldn't find enough highly relevant information in the Qualcomm knowledge base to answer that specifically.");
    }
    
    setIsSearching(false);
  };

  const PIPELINE_STEPS = [
    { id: 1, name: 'Query Understanding', icon: Search },
    { id: 2, name: 'Vector Retrieval', icon: Database },
    { id: 3, name: 'Contextual Generation', icon: Bot },
  ];

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Layers className="w-8 h-8 text-primary" /> RAG Visualizer
          </h1>
          <p className="text-muted-foreground mt-2">
            Explore how Retrieval-Augmented Generation grounds LLMs in enterprise data.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop/llm-playground')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Pipeline Controls */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 bg-card/40 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
              <CardTitle className="text-lg">Run RAG Pipeline</CardTitle>
              <CardDescription>Ask a question about Qualcomm AI</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Input 
                  placeholder="e.g., What is Hexagon NPU?" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && executePipeline()}
                  disabled={isSearching}
                />
                <div className="flex gap-2 flex-wrap pt-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted font-normal text-xs" onClick={() => setQuery("What is Qualcomm AI Hub?")}>AI Hub</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted font-normal text-xs" onClick={() => setQuery("How does on-device AI work?")}>On-device AI</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted font-normal text-xs" onClick={() => setQuery("Explain Agentic systems")}>Agents</Badge>
                </div>
              </div>
              <Button onClick={executePipeline} disabled={isSearching || !query} className="w-full gap-2">
                {isSearching ? <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" /> : <Search className="w-4 h-4" />}
                {isSearching ? 'Processing Pipeline...' : 'Execute RAG Pipeline'}
              </Button>
            </CardContent>
          </Card>

          {/* Pipeline Visual */}
          <div className="space-y-3 px-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Pipeline Execution</h3>
            {PIPELINE_STEPS.map((s) => (
              <div key={s.id} className="relative">
                <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${
                  step >= s.id 
                    ? step === s.id && isSearching 
                      ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(50,83,220,0.3)]' 
                      : 'bg-card border-primary/30 text-foreground'
                    : 'bg-muted/30 border-border/30 text-muted-foreground'
                }`}>
                  <s.icon className={`w-5 h-5 ${step === s.id && isSearching ? 'animate-pulse' : ''}`} />
                  <span className="font-medium text-sm">{s.name}</span>
                  {step > s.id && <CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />}
                </div>
                {s.id < 3 && (
                  <div className="flex justify-center my-1">
                    <ArrowDown className={`w-4 h-4 ${step > s.id ? 'text-primary' : 'text-muted-foreground/30'}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Microscope View */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full min-h-[500px]">
            {/* Retrieval Context */}
            <Card className="flex flex-col border-border/50 shadow-lg">
              <CardHeader className="bg-muted/20 border-b border-border/50 py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" /> Retrieved Chunks
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/20">
                {step < 2 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm opacity-50 space-y-2">
                    <Network className="w-10 h-10" />
                    <span>Awaiting retrieval execution</span>
                  </div>
                ) : (
                  <AnimatePresence>
                    {chunks.map((chunk, idx) => (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        key={chunk.document.id}
                        className="p-3 rounded-lg bg-card border border-border/60 shadow-sm relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 p-1 px-2 bg-primary/10 text-primary text-[10px] font-mono font-bold rounded-bl-lg">
                          SIM: {(chunk.score * 100).toFixed(1)}%
                        </div>
                        <div className="flex items-center gap-2 mb-2 pr-16">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <h4 className="font-semibold text-sm truncate">{chunk.document.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          &quot;...{chunk.highlight}...&quot;
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>

            {/* Generated Output */}
            <Card className="flex flex-col border-border/50 shadow-lg">
              <CardHeader className="bg-muted/20 border-b border-border/50 py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Bot className="w-4 h-4 text-green-500" /> Final Answer
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-6 flex flex-col">
                {step < 3 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm opacity-50 space-y-2">
                    <Bot className="w-10 h-10" />
                    <span>Awaiting context assembly</span>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-foreground leading-relaxed text-sm">
                      {answer}
                    </div>
                    
                    {chunks.length > 0 && (
                      <div className="pt-4 mt-auto">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Citations</div>
                        <div className="flex flex-wrap gap-2">
                          {chunks.slice(0, 2).map(c => (
                            <a key={c.document.id} href={c.document.url} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1 text-primary hover:underline bg-primary/5 px-2 py-1 rounded">
                              {c.document.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
          
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <Button size="lg" onClick={handleComplete} className="gap-2 group">
          Complete & Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

    </div>
  );
}

