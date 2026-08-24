"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Terminal, Brain, Sparkles, Database, Network, Cpu, Bot, CheckCircle2, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, LineChart, Line } from "recharts";

const TIMELINE = [
  {
    id: "rules",
    title: "Rules-Based Systems",
    icon: Terminal,
    year: "1950s+",
    description: "Systems that operate on explicit 'if-then' statements.",
    details: "Expert systems dominated early AI. They required humans to manually encode domain knowledge into rigid logic trees. They were highly interpretable but brittle, unable to handle ambiguity or unseen edge cases.",
    useCase: "Early tax software, basic game bots.",
    chartType: "bar",
    chartTitle: "System Complexity vs Manual Rules",
    chartData: [
      { name: "Tic-Tac-Toe", rules: 10, complexity: 10 },
      { name: "Chess", rules: 50, complexity: 30 },
      { name: "Medical Diagnosis", rules: 400, complexity: 45 },
      { name: "Language Trans.", rules: 2000, complexity: 55 },
      { name: "Self-Driving", rules: 10000, complexity: 60 },
    ]
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: Brain,
    year: "1990s+",
    description: "Algorithms that learn patterns from structured data.",
    details: "Instead of being explicitly programmed, ML models are trained on datasets. They extract statistical patterns to make predictions or classifications. Deep learning (neural networks) later revolutionized this by handling unstructured data like images.",
    useCase: "Spam filters, recommendation engines.",
    chartType: "area",
    chartTitle: "Data Volume & Compute Scaling",
    chartData: [
      { year: "1990", data: 10, compute: 5 },
      { year: "2000", data: 50, compute: 20 },
      { year: "2010", data: 200, compute: 150 },
      { year: "2015", data: 800, compute: 600 },
      { year: "2020", data: 2000, compute: 2500 },
    ]
  },
  {
    id: "genai",
    title: "Generative AI (LLMs)",
    icon: Sparkles,
    year: "2017+",
    description: "Models that generate novel text, code, or images.",
    details: "Following the Transformer architecture, Large Language Models (LLMs) learned the statistical distribution of human language. They can synthesize information, translate, and generate content, but suffer from hallucinations and lack factual grounding.",
    useCase: "ChatGPT, GitHub Copilot, copy generation.",
    chartType: "line",
    chartTitle: "Model Parameter Count (Billions)",
    chartData: [
      { model: "GPT-1 (2018)", params: 0.11 },
      { model: "GPT-2 (2019)", params: 1.5 },
      { model: "GPT-3 (2020)", params: 175 },
      { model: "PaLM (2022)", params: 540 },
      { model: "GPT-4 (2023)", params: 1700 },
    ]
  },
  {
    id: "rag",
    title: "RAG Systems",
    icon: Database,
    year: "2020+",
    description: "Retrieval-Augmented Generation.",
    details: "To fix hallucinations, RAG was introduced. The system first retrieves factual documents from an external knowledge base, then passes them to the LLM to ground its response. The AI now reads facts before speaking.",
    useCase: "Enterprise document search, support bots.",
    chartType: "bar",
    chartTitle: "Hallucination Rate vs Factual Accuracy",
    chartData: [
      { config: "Zero-shot LLM", accuracy: 45, hallucination: 55 },
      { config: "Few-shot LLM", accuracy: 65, hallucination: 35 },
      { config: "Basic RAG", accuracy: 85, hallucination: 15 },
      { config: "Advanced RAG", accuracy: 94, hallucination: 6 },
    ]
  },
  {
    id: "agents",
    title: "Agentic AI",
    icon: Bot,
    year: "Present",
    description: "Autonomous systems that reason, plan, and act.",
    details: "Agentic AI wraps an LLM in a loop of reasoning, tool use, and memory. Instead of just answering a question, an agent receives a goal, breaks it into tasks, uses tools (APIs, calculators, search), and self-corrects until the goal is achieved.",
    useCase: "Devin (AI Software Engineer), Autonomous analysts.",
    chartType: "area",
    chartTitle: "Autonomous Task Completion Success Rate",
    chartData: [
      { steps: "1 Step", llm: 95, agent: 98 },
      { steps: "3 Steps", llm: 40, agent: 85 },
      { steps: "5 Steps", llm: 15, agent: 75 },
      { steps: "10+ Steps", llm: 2, agent: 60 },
    ]
  }
];

export default function AILandscapePage() {
  const router = useRouter();
  const { completeModule, addXP } = useWorkshopStore();
  const [activeItem, setActiveItem] = useState(TIMELINE[0].id);

  const activeData = TIMELINE.find(t => t.id === activeItem);

  const handleComplete = () => {
    completeModule('ai-landscape');
    addXP(100);
    toast.success("Module Completed!", {
      description: "+100 XP Earned",
      icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
    });
    router.push('/workshop/agentic-ai');
  };

  const renderChart = () => {
    if (!activeData || !activeData.chartData) return null;

    if (activeData.chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={activeData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey={Object.keys(activeData.chartData[0])[0]} stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }} itemStyle={{ color: '#fff' }} />
            <Bar dataKey={Object.keys(activeData.chartData[0])[1]} fill="#3b82f6" radius={[4, 4, 0, 0]} />
            {Object.keys(activeData.chartData[0]).length > 2 && (
               <Bar dataKey={Object.keys(activeData.chartData[0])[2]} fill="#10b981" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (activeData.chartType === 'area') {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={activeData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey={Object.keys(activeData.chartData[0])[0]} stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }} />
            <Area type="monotone" dataKey={Object.keys(activeData.chartData[0])[1]} stroke="#3b82f6" fillOpacity={1} fill="url(#colorPrimary)" />
            {Object.keys(activeData.chartData[0]).length > 2 && (
               <Area type="monotone" dataKey={Object.keys(activeData.chartData[0])[2]} stroke="#10b981" fillOpacity={1} fill="url(#colorSec)" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (activeData.chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={activeData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey={Object.keys(activeData.chartData[0])[0]} stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }} />
            <Line type="monotone" dataKey={Object.keys(activeData.chartData[0])[1]} stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#111827", strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="flex-1 p-6 md:p-10 w-full max-w-6xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">The AI Evolution</h1>
          <p className="text-muted-foreground mt-2">
            Understand how we transitioned from simple logic to autonomous agents.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push('/workshop')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Interactive Timeline */}
        <div className="lg:col-span-5 flex flex-col gap-3 relative before:absolute before:inset-y-0 before:left-8 before:w-0.5 before:bg-border z-0">
          {TIMELINE.map((item) => {
            const isActive = activeItem === item.id;
            const Icon = item.icon;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative z-10 flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                  isActive ? 'bg-primary/10 border border-primary/30 shadow-md' : 'hover:bg-muted bg-card border border-border/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-0.5">{item.year}</div>
                  <div className={`font-semibold ${isActive ? 'text-foreground' : 'text-foreground/80'}`}>
                    {item.title}
                  </div>
                </div>
                {isActive && (
                  <motion.div layoutId="active-indicator" className="absolute left-0 inset-y-0 w-1 bg-primary rounded-l-xl" />
                )}
              </button>
            );
          })}
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {activeData && (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-md shadow-2xl overflow-hidden flex flex-col">
                  <CardHeader className="border-b border-border/50 pb-6 bg-gradient-to-b from-primary/10 to-transparent relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <activeData.icon className="w-24 h-24" />
                    </div>
                    <div className="flex items-center gap-4 mb-4 relative z-10">
                      <div className="p-3 rounded-lg bg-primary/20 text-primary border border-primary/30">
                        <activeData.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-sm font-mono text-primary font-semibold tracking-wider">{activeData.year}</div>
                        <CardTitle className="text-3xl tracking-tight">{activeData.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-lg text-foreground/90 font-medium relative z-10">
                      {activeData.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-8 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                          <Cpu className="w-4 h-4" /> How it works
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {activeData.details}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-3 flex items-center gap-2">
                          <Network className="w-4 h-4 text-primary" /> Typical Use Case
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {activeData.useCase}
                        </p>
                      </div>
                    </div>
                    
                    {/* Dynamic Chart Section */}
                    <div className="flex-1 min-h-[260px] p-5 bg-[#0a0f1a] rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-gray-300">
                        <TrendingUp className="w-4 h-4 text-blue-400" /> {activeData.chartTitle}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      {renderChart()}
                    </div>
                    
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
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
