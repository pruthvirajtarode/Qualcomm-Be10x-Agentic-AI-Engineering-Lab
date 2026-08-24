"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { WORKSHOP_MODULES } from "@/types/workshop";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Star, Trophy, ArrowRight, Play, CheckCircle2, Lock } from "lucide-react";

export default function WorkshopDashboard() {
  const router = useRouter();
  const { participantName, xp, completedModules, badges } = useWorkshopStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex-1 p-6 md:p-10 overflow-y-auto w-full bg-muted/10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Welcome Section */}
        <section className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Welcome, {participantName} 👋</h1>
              <p className="text-muted-foreground mt-2 text-lg">
                Your Agentic AI Engineering Lab journey awaits.
              </p>
            </div>
            
            <div className="hidden md:flex gap-4">
              <Card className="bg-primary/5 border-primary/20 shadow-none">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/20 text-primary">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{xp}</div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total XP</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card shadow-none">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 rounded-full bg-muted text-foreground">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{badges.length}</div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Badges</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Roadmap Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Workshop Roadmap
            </h2>
            <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {completedModules.length} / {WORKSHOP_MODULES.length} Completed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKSHOP_MODULES.map((mod, idx) => {
              const isCompleted = completedModules.includes(mod.id);
              const isLocked = idx > 0 && !completedModules.includes(WORKSHOP_MODULES[idx - 1].id) && !isCompleted;

              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className={`h-full flex flex-col ${isCompleted ? 'border-primary/30 bg-primary/5' : isLocked ? 'opacity-70 grayscale' : 'hover:border-primary/50 transition-colors'}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-mono text-muted-foreground font-semibold">0{idx + 1}</span>
                        {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {isLocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <CardTitle className="text-xl line-clamp-1">{mod.title}</CardTitle>
                      <CardDescription className="line-clamp-2 min-h-[40px]">
                        {mod.learningObjective}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="flex gap-1.5 items-center">
                          <Clock className="w-3 h-3" /> {mod.duration}
                        </Badge>
                        <Badge variant={mod.difficulty === 'Beginner' ? 'default' : mod.difficulty === 'Intermediate' ? 'secondary' : 'destructive'} className={`${mod.difficulty === 'Beginner' ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' : ''}`}>
                          {mod.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex gap-1.5 items-center font-mono">
                          <Star className="w-3 h-3 text-yellow-500" /> +{mod.xpReward}
                        </Badge>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button 
                        onClick={() => router.push(mod.route)}
                        disabled={isLocked && false} // Disable locking for demo purposes
                        variant={isCompleted ? "secondary" : "default"}
                        className="w-full justify-between group"
                      >
                        {isCompleted ? 'Review Module' : 'Start Module'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
