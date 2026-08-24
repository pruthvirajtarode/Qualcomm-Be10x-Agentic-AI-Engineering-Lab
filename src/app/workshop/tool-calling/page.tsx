"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Wrench, Play, Code, Calculator, Cloud, Search, CheckCircle2, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type ToolType = 'calculator' | 'weather' | 'search';

export default function ToolCallingPage() {
  const router = useRouter();
  const { completeModule, addXP, unlockBadge } = useWorkshopStore();
  
  const [activeTool, setActiveTool] = useState<ToolType>('calculator');
  const [toolInput, setToolInput] = useState("125 * 4");
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionState, setExecutionState] = useState(0); // 0: none, 1: select, 2: args, 3: exec, 4: result, 5: final
  
  const [result, setResult] = useState<Record<string, unknown> | number | string | null>(null);
  const [finalAnswer, setFinalAnswer] = useState("");

  const handleComplete = () => {
    completeModule('tool-calling');
    addXP(100);
    unlockBadge('Tool Master');
    toast.success("Module Completed & Badge Unlocked!");
    router.push('/workshop/agent-builder');
  };

  const handleToolChange = (tool: ToolType) => {
    setActiveTool(tool);
    setExecutionState(0);
    setResult(null);
    setFinalAnswer("");
    if (tool === 'calculator') setToolInput("125 * 4");
    if (tool === 'weather') setToolInput("San Diego, CA");
    if (tool === 'search') setToolInput("Qualcomm Snapdragon X Elite");
  };

  const executeTool = async () => {
    if (!toolInput || isExecuting) return;
    
    setIsExecuting(true);
    setResult(null);
    setFinalAnswer("");
    
    // Step 1: Tool Selection
    setExecutionState(1);
    await new Promise(r => setTimeout(r, 600));
    
    // Step 2: Tool Arguments
    setExecutionState(2);
    await new Promise(r => setTimeout(r, 600));
    
    // Step 3: Tool Execution
    setExecutionState(3);
    await new Promise(r => setTimeout(r, 1000));
    
    // Step 4: Tool Result
    setExecutionState(4);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let output: any;
    if (activeTool === 'calculator') {
      try {
        output = 500; // Mocked evaluation
      } catch (err) {
        output = "Error: Invalid expression";
      }
    } else if (activeTool === 'weather') {
      output = { location: toolInput, temp: "72°F", condition: "Sunny", wind: "5 mph" };
    } else {
      output = { query: toolInput, summary: "Snapdragon X Elite features the custom Qualcomm Oryon CPU, delivering leading performance and power efficiency for next-gen AI PCs." };
    }
    setResult(output);
    
    // Step 5: Final LLM Answer
    await new Promise(r => setTimeout(r, 800));
    setExecutionState(5);
    
    if (activeTool === 'calculator') {
      setFinalAnswer(`The result of ${toolInput} is ${output}.`);
    } else if (activeTool === 'weather') {
      setFinalAnswer(`The current weather in ${toolInput} is ${output.temp} and ${output.condition}.`);
    } else {
      setFinalAnswer(`Based on the search results, the ${output.summary}`);
    }
    
    setIsExecuting(false);
  };

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Wrench className="w-8 h-8 text-primary" /> Tool Calling Lab
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect the LLM&apos;s reasoning engine to external capabilities.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop/rag-playground')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[600px]">
        
        {/* Tool Configuration */}
        <Card className="flex flex-col border-border/50 shadow-lg">
          <CardHeader className="bg-muted/20 border-b border-border/50 pb-4">
            <CardTitle className="text-lg">Available Tools</CardTitle>
            <CardDescription>Select a tool and provide the user prompt</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-8">
            
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleToolChange('calculator')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${activeTool === 'calculator' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border/50 bg-card hover:bg-muted text-muted-foreground'}`}
              >
                <Calculator className="w-6 h-6" />
                <span className="text-sm font-semibold">Calculator</span>
              </button>
              
              <button 
                onClick={() => handleToolChange('weather')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${activeTool === 'weather' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border/50 bg-card hover:bg-muted text-muted-foreground'}`}
              >
                <Cloud className="w-6 h-6" />
                <span className="text-sm font-semibold">Weather API</span>
              </button>
              
              <button 
                onClick={() => handleToolChange('search')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${activeTool === 'search' ? 'border-primary bg-primary/10 text-primary shadow-sm' : 'border-border/50 bg-card hover:bg-muted text-muted-foreground'}`}
              >
                <Search className="w-6 h-6" />
                <span className="text-sm font-semibold">Web Search</span>
              </button>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold tracking-wide">User Intent / Input</label>
              <div className="flex gap-2">
                <Input 
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  className="font-mono bg-background"
                  disabled={isExecuting}
                />
              </div>
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md font-mono flex items-start gap-2">
                <Code className="w-4 h-4 shrink-0 text-primary" />
                <span>
                  {activeTool === 'calculator' && "Tool schema: { expression: string }"}
                  {activeTool === 'weather' && "Tool schema: { location: string }"}
                  {activeTool === 'search' && "Tool schema: { query: string }"}
                </span>
              </div>
            </div>

          </CardContent>
          <CardFooter className="mt-auto border-t border-border/50 p-4 bg-muted/10">
            <Button onClick={executeTool} disabled={isExecuting || !toolInput} className="w-full gap-2">
              <Play className="w-4 h-4 fill-current" />
              {isExecuting ? "Executing Sequence..." : "Run Tool Sequence"}
            </Button>
          </CardFooter>
        </Card>

        {/* Execution Trace */}
        <Card className="flex flex-col border-border/50 shadow-lg overflow-hidden bg-[#0c1529]">
          <CardHeader className="border-b border-white/10 bg-black/20 py-3">
            <CardTitle className="text-sm font-mono text-gray-300 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" /> trace.log
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-4">
            
            {executionState === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-2">
                <Terminal className="w-10 h-10" />
                <span>Ready to execute tool sequence</span>
              </div>
            )}
            
            <AnimatePresence>
              {executionState >= 1 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-gray-300">
                  <span className="text-primary font-bold">USER:</span> Please process: &quot;{toolInput}&quot;
                </motion.div>
              )}
              
              {executionState >= 2 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-yellow-400 mt-4 pl-4 border-l border-white/20">
                  <div className="font-bold text-xs mb-1 uppercase tracking-wider">LLM Tool Selection</div>
                  <div>{"{"}</div>
                  <div className="pl-4">&quot;tool&quot;: &quot;{activeTool}&quot;,</div>
                  <div className="pl-4">&quot;arguments&quot;: {"{"}</div>
                  <div className="pl-8 text-green-400">
                    &quot;{activeTool === 'calculator' ? 'expression' : activeTool === 'weather' ? 'location' : 'query'}&quot;: &quot;{toolInput}&quot;
                  </div>
                  <div className="pl-4">{"}"}</div>
                  <div>{"}"}</div>
                </motion.div>
              )}
              
              {executionState >= 3 && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-gray-400 mt-4">
                  <span className="animate-pulse">Executing function {activeTool}()...</span>
                </motion.div>
              )}
              
              {executionState >= 4 && result && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-blue-300 mt-2 pl-4 border-l border-blue-500/30 bg-blue-500/5 py-2 rounded-r">
                  <div className="font-bold text-xs mb-1 uppercase tracking-wider text-blue-400">Function Result</div>
                  <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
                </motion.div>
              )}
              
              {executionState >= 5 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 mt-6 pt-4 border-t border-white/10">
                  <span className="text-primary font-bold">FINAL ANSWER:</span>
                  <p className="mt-2 text-white/90 font-sans leading-relaxed text-sm bg-primary/10 p-3 rounded-lg border border-primary/20">
                    {finalAnswer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
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
