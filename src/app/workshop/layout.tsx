"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkshopStore } from "@/store/useWorkshopStore";
import { WORKSHOP_MODULES } from "@/types/workshop";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, ChevronLeft, LayoutDashboard, Settings2, X } from "lucide-react";
import { motion } from "framer-motion";

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { xp, completedModules, presentationMode, demoMode } = useWorkshopStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const progressPercentage = (completedModules.length / WORKSHOP_MODULES.length) * 100;
  
  // Calculate level based on XP (simple formula)
  const getLevel = (xp: number) => {
    if (xp >= 1000) return { num: 6, title: "Agentic AI Master" };
    if (xp >= 700) return { num: 5, title: "AI Systems Engineer" };
    if (xp >= 450) return { num: 4, title: "Agent Architect" };
    if (xp >= 250) return { num: 3, title: "RAG Builder" };
    if (xp >= 100) return { num: 2, title: "Prompt Engineer" };
    return { num: 1, title: "AI Explorer" };
  };

  const currentLevel = getLevel(xp);

  if (!mounted) return null;

  if (presentationMode) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-hidden">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Workshop Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-4">
            <Image 
              src="/assets/qualcomm logo.png" 
              alt="Qualcomm Logo" 
              width={120} 
              height={32} 
              className="object-contain dark:invert hover:opacity-80 transition-opacity"
            />
            <X className="w-3 h-3 text-muted-foreground/50" />
            <Image 
              src="/assets/be 10 x logo.jpg" 
              alt="Be10x Logo" 
              width={70} 
              height={20} 
              className="object-contain rounded-sm hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="h-6 w-px bg-border hidden md:block" />
          <Link href="/workshop" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          {pathname !== "/workshop" && (
            <>
              <div className="text-muted-foreground">/</div>
              <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px]">
                {WORKSHOP_MODULES.find(m => pathname.includes(m.route))?.title || 'Module'}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-6">
          {demoMode && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-semibold">
              <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              DEMO MODE
            </div>
          )}

          <div className="flex items-center gap-4 border-l border-border/50 pl-6">
            <div className="flex flex-col items-end hidden md:flex">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                Level {currentLevel.num}: {currentLevel.title}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono mt-0.5">
                <Star className="w-3.5 h-3.5 text-yellow-500" />
                {xp} XP
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Trophy className={`w-5 h-5 ${xp > 0 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar (Global) */}
      <div className="h-1 w-full bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-in-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col w-full max-w-[1920px] mx-auto overflow-hidden relative z-10">
        
        {/* Ambient SaaS Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {children}
      </main>
    </div>
  );
}
