import { create } from 'zustand';
import { Badge, WORKSHOP_MODULES } from '../types/workshop';

interface WorkshopState {
  participantName: string;
  xp: number;
  completedModules: string[];
  badges: Badge[];
  quizScore: number;
  challengeScore: number;
  presentationMode: boolean;
  demoMode: boolean;

  // Actions
  setParticipantName: (name: string) => void;
  addXP: (amount: number) => void;
  completeModule: (moduleId: string) => void;
  unlockBadge: (badge: Badge) => void;
  addQuizScore: (points: number) => void;
  addChallengeScore: (points: number) => void;
  togglePresentationMode: () => void;
  setDemoMode: (isDemo: boolean) => void;
  resetProgress: () => void;
}

const initialState = {
  participantName: 'Engineer',
  xp: 0,
  completedModules: [],
  badges: [],
  quizScore: 0,
  challengeScore: 0,
  presentationMode: false,
  demoMode: true,
};

export const useWorkshopStore = create<WorkshopState>()(
  (set) => ({
    ...initialState,
    setParticipantName: (name) => set({ participantName: name }),
    addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
    completeModule: (moduleId) => 
      set((state) => ({
        completedModules: state.completedModules.includes(moduleId)
          ? state.completedModules
          : [...state.completedModules, moduleId],
      })),
    unlockBadge: (badge) =>
      set((state) => ({
        badges: state.badges.includes(badge)
          ? state.badges
          : [...state.badges, badge],
      })),
    addQuizScore: (points) => set((state) => ({ quizScore: state.quizScore + points })),
    addChallengeScore: (points) => set((state) => ({ challengeScore: state.challengeScore + points })),
    togglePresentationMode: () => set((state) => ({ presentationMode: !state.presentationMode })),
    setDemoMode: (isDemo) => set({ demoMode: isDemo }),
    resetProgress: () => set({ ...initialState }),
  })
);
