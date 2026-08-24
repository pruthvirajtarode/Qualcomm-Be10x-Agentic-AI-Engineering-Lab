"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Play, Settings, Sparkles, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function LLMPlaygroundPage() {
  const router = useRouter();
  const { completeModule, addXP, unlockBadge } = useWorkshopStore();
  
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant representing Qualcomm.");
  const [userPrompt, setUserPrompt] = useState("Explain what Agentic AI is in one sentence.");
  const [temperature, setTemperature] = useState(0.7);
  const [model, setModel] = useState("Demo LLM");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState("");
  const [metrics, setMetrics] = useState({ latency: 0, inputTokens: 0, outputTokens: 0 });

  const handleComplete = () => {
    completeModule('llm-playground');
    addXP(100);
    unlockBadge('Prompt Pioneer');
    toast.success("Module Completed & Badge Unlocked!");
    router.push('/workshop/rag-playground');
  };

  const handleGenerate = async () => {
    if (!userPrompt) return;
    setIsGenerating(true);
    setResponse("");
    
    // Simulate generation delay based on length
    const delay = 800 + Math.random() * 1000;
    await new Promise(r => setTimeout(r, delay));
    
    // Deterministic demo logic
    let output = "";
    if (userPrompt.toLowerCase().includes("agentic")) {
      output = "Agentic AI is an advanced AI system capable of autonomous reasoning, planning, and executing tools to achieve user-defined goals without requiring step-by-step human intervention.";
    } else if (userPrompt.toLowerCase().includes("qualcomm")) {
      output = "Qualcomm is a global leader in foundational technologies that power the connected edge, driving innovations in 5G, AI, and on-device processing via Snapdragon platforms.";
    } else {
      output = "This is a simulated demo response. In a real environment, the LLM would process your prompt: '" + userPrompt + "' and generate a statistically probable continuation based on its training.";
    }

    setResponse(output);
    setMetrics({
      latency: Math.floor(delay),
      inputTokens: Math.floor((systemPrompt.length + userPrompt.length) / 4),
      outputTokens: Math.floor(output.length / 4)
    });
    
    setIsGenerating(false);
  };

  const loadPreset = (preset: 'agentic' | 'rag' | 'debug') => {
    if (preset === 'agentic') {
      setSystemPrompt("You are an expert AI systems engineer.");
      setUserPrompt("Explain what Agentic AI is in one sentence.");
    } else if (preset === 'rag') {
      setSystemPrompt("You are a technical documentator.");
      setUserPrompt("How does a vector database help RAG systems?");
    } else if (preset === 'debug') {
      setSystemPrompt("You are a senior developer.");
      setUserPrompt("My agent is trapped in an infinite tool-calling loop. Why?");
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LLM Intelligence Lab</h1>
          <p className="text-muted-foreground mt-2">
            Experiment with Prompts, Temperature, and System Instructions.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop/agentic-ai')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
        {/* Left Panel: Editor */}
        <Card className="lg:col-span-7 flex flex-col border-border/50 shadow-lg">
          <CardHeader className="border-b border-border/50 py-4 bg-muted/20">
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" /> Prompt Editor
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-6 overflow-y-auto">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold tracking-wide text-foreground">System Prompt</label>
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => loadPreset('agentic')}>Preset 1</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted" onClick={() => loadPreset('rag')}>Preset 2</Badge>
                </div>
              </div>
              <textarea 
                className="w-full h-24 bg-background border border-border/60 rounded-md p-3 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold tracking-wide text-foreground">User Prompt</label>
              <textarea 
                className="w-full h-32 bg-background border border-border/60 rounded-md p-3 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground flex justify-between">
                  Temperature <span>{temperature}</span>
                </label>
                <input 
                  type="range" 
                  min="0" max="2" step="0.1" 
                  value={temperature} 
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-muted-foreground">Model</label>
                <select 
                  className="w-full bg-background border border-border/60 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="Demo LLM">Demo LLM (Simulated)</option>
                  <option value="Fast LLM">Fast LLM (Simulated)</option>
                  <option value="Reasoning LLM">Reasoning LLM (Simulated)</option>
                </select>
              </div>
            </div>

          </CardContent>
          <CardFooter className="border-t border-border/50 p-4 bg-muted/10">
            <Button onClick={handleGenerate} disabled={isGenerating || !userPrompt} className="w-full gap-2">
              <Play className="w-4 h-4 fill-current" />
              {isGenerating ? "Generating..." : "Generate Output"}
            </Button>
          </CardFooter>
        </Card>

        {/* Right Panel: Output */}
        <Card className="lg:col-span-5 flex flex-col border-border/50 shadow-lg">
          <CardHeader className="border-b border-border/50 py-4 bg-muted/20">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> LLM Output
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 overflow-y-auto bg-black/40">
            
            {isGenerating ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <span className="text-muted-foreground animate-pulse text-sm">Synthesizing response...</span>
              </div>
            ) : response ? (
              <div className="space-y-6 h-full flex flex-col">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="text-sm leading-relaxed text-foreground/90 font-sans mt-1">
                    {response}
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-3 gap-4 pt-6 border-t border-border/40">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border border-border/30">
                    <span className="text-2xl font-bold text-foreground font-mono">{metrics.latency}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Latency (ms)</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border border-border/30">
                    <span className="text-2xl font-bold text-foreground font-mono">{metrics.inputTokens}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Tokens In</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-card/50 border border-border/30">
                    <span className="text-2xl font-bold text-foreground font-mono">{metrics.outputTokens}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Tokens Out</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-3">
                <MessageSquare className="w-12 h-12 opacity-20" />
                <p className="text-sm">Click generate to see the output</p>
                <Badge variant="outline" className="opacity-50">Demo simulation</Badge>
              </div>
            )}
            
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleComplete} className="gap-2 group">
          Complete & Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

    </div>
  );
}
