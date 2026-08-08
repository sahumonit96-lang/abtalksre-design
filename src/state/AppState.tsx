import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BASE_PROJECTS,
  BASE_RANK,
  BASE_STREAK,
  CURRENT_DAY,
  TOTAL_DAYS,
  buildAchievements,
  buildProgress,
  demoUser,
  seedProofs,
  todaysChallenge,
} from "@/data/demoData";
import type { Achievement, DailyProgress, Proof, User } from "@/data/types";

/**
 * Single client-side store for user-generated state (proofs, streak, checklist,
 * onboarding). Persisted to localStorage so the demo survives reloads.
 *
 * When Lovable Cloud is added, replace the localStorage read/write below with
 * queries/mutations — the context API surface stays identical.
 */

const STORAGE_KEY = "abtalks.state.v1";

interface PersistedState {
  proofs: Proof[];
  currentDay: number;
  streak: number;
  projectsShipped: number;
  checklist: string[];
  onboarded: boolean;
  goal: string | null;
  githubConnected: boolean;
}

const initialState: PersistedState = {
  proofs: seedProofs,
  currentDay: CURRENT_DAY,
  streak: BASE_STREAK,
  projectsShipped: BASE_PROJECTS,
  checklist: [],
  onboarded: false,
  goal: demoUser.goal,
  githubConnected: demoUser.githubConnected,
};

interface AppStateValue {
  hydrated: boolean;
  user: User;
  challenge: typeof todaysChallenge;
  progress: DailyProgress[];
  achievements: Achievement[];
  proofs: Proof[];
  currentDay: number;
  totalDays: number;
  streak: number;
  projectsShipped: number;
  rank: number;
  daysCompleted: number;
  daysRemaining: number;
  progressPercent: number;
  todaySubmitted: boolean;
  checklist: string[];
  toggleChecklistItem: (id: string) => void;
  addProof: (proof: Proof) => void;
  onboarded: boolean;
  goal: string | null;
  setGoal: (goal: string) => void;
  githubConnected: boolean;
  setGithubConnected: (connected: boolean) => void;
  completeOnboarding: () => void;
  resetDemo: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...(JSON.parse(raw) as PersistedState) });
    } catch {
      /* corrupt storage — fall back to demo defaults */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable (private mode) — state stays in memory */
    }
  }, [state, hydrated]);

  const toggleChecklistItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      checklist: prev.checklist.includes(id)
        ? prev.checklist.filter((x) => x !== id)
        : [...prev.checklist, id],
    }));
  }, []);

  const addProof = useCallback((proof: Proof) => {
    setState((prev) => {
      if (prev.proofs.some((p) => p.day === proof.day)) return prev;
      return {
        ...prev,
        proofs: [proof, ...prev.proofs],
        streak: prev.streak + 1,
        projectsShipped: proof.kind === "project" ? prev.projectsShipped + 1 : prev.projectsShipped,
        checklist: prev.challengeChecklistReset ? [] : prev.checklist,
      } as PersistedState;
    });
  }, []);

  const setGoal = useCallback((goal: string) => setState((p) => ({ ...p, goal })), []);
  const setGithubConnected = useCallback(
    (githubConnected: boolean) => setState((p) => ({ ...p, githubConnected })),
    [],
  );
  const completeOnboarding = useCallback(() => setState((p) => ({ ...p, onboarded: true })), []);
  const resetDemo = useCallback(() => setState(initialState), []);

  const value = useMemo<AppStateValue>(() => {
    const todaySubmitted = state.proofs.some((p) => p.day === state.currentDay);
    const daysCompleted = todaySubmitted ? state.currentDay : state.currentDay - 1 + 1;
    const progress = buildProgress(state.currentDay).map((d) =>
      todaySubmitted && d.day === state.currentDay ? { ...d, status: "completed" as const } : d,
    );

    return {
      hydrated,
      user: {
        ...demoUser,
        goal: state.goal,
        githubConnected: state.githubConnected,
      },
      challenge: todaysChallenge,
      progress,
      achievements: buildAchievements(state.streak, state.projectsShipped, BASE_RANK),
      proofs: state.proofs,
      currentDay: state.currentDay,
      totalDays: TOTAL_DAYS,
      streak: state.streak,
      projectsShipped: state.projectsShipped,
      rank: BASE_RANK,
      daysCompleted,
      daysRemaining: TOTAL_DAYS - daysCompleted,
      progressPercent: Math.round((daysCompleted / TOTAL_DAYS) * 100),
      todaySubmitted,
      checklist: state.checklist,
      toggleChecklistItem,
      addProof,
      onboarded: state.onboarded,
      goal: state.goal,
      setGoal,
      githubConnected: state.githubConnected,
      setGithubConnected,
      completeOnboarding,
      resetDemo,
    };
  }, [
    state,
    hydrated,
    toggleChecklistItem,
    addProof,
    setGoal,
    setGithubConnected,
    completeOnboarding,
    resetDemo,
  ]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}