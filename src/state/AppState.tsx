import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
} from "@/data/demoData";
import {
  XP_CHALLENGE,
  XP_PROOF,
  XP_STREAK_BONUS,
  getChallenge,
  trackById,
} from "@/data/tracks";
import type {
  Achievement,
  ActivityItem,
  DailyProgress,
  Proof,
  Track,
  TrackChallenge,
  TrackId,
  User,
} from "@/data/types";

/**
 * Single client-side store for user-generated state (track, proofs, XP, streak,
 * checklists, activity). Persisted to localStorage so the demo survives reloads.
 *
 * When Lovable Cloud is added, replace the localStorage read/write below with
 * queries/mutations — the context API surface stays identical.
 */

const STORAGE_KEY = "abtalks.state.v2";

const MISSED_DAYS = [7];
const seedCompleted = Array.from({ length: CURRENT_DAY - 1 }, (_, i) => i + 1).filter(
  (d) => !MISSED_DAYS.includes(d),
);
const seedXp = seedCompleted.length * (XP_CHALLENGE + XP_PROOF) + XP_STREAK_BONUS;

interface PersistedState {
  trackId: TrackId;
  proofs: Proof[];
  currentDay: number;
  completedDays: number[];
  streak: number;
  xp: number;
  projectsShipped: number;
  checklists: Record<string, string[]>;
  activities: ActivityItem[];
  onboarded: boolean;
  goal: string | null;
  githubConnected: boolean;
  profileName: string;
  profileCollege: string;
  profileBio: string;
}

const seedActivities: ActivityItem[] = [
  {
    id: "act-seed-1",
    kind: "proof",
    title: "Day 11 proof submitted",
    detail: "Portfolio redesign · repo and live link recorded",
    xp: XP_CHALLENGE + XP_PROOF,
    at: "yesterday",
  },
  {
    id: "act-seed-2",
    kind: "streak",
    title: "Streak reached 11 days",
    detail: "Longest run so far",
    at: "yesterday",
  },
  {
    id: "act-seed-3",
    kind: "proof",
    title: "Day 10 proof submitted",
    detail: "AI study planner · weekly plan generation",
    xp: XP_CHALLENGE + XP_PROOF,
    at: "2 days ago",
  },
  {
    id: "act-seed-4",
    kind: "achievement",
    title: "Achievement unlocked: 7-Day Streak",
    detail: "One week unbroken",
    at: "5 days ago",
  },
];

const initialState: PersistedState = {
  trackId: "web",
  proofs: seedProofs,
  currentDay: CURRENT_DAY,
  completedDays: seedCompleted,
  streak: BASE_STREAK,
  xp: seedXp,
  projectsShipped: BASE_PROJECTS,
  checklists: {},
  activities: seedActivities,
  onboarded: false,
  goal: demoUser.goal,
  githubConnected: demoUser.githubConnected,
  profileName: demoUser.name,
  profileCollege: demoUser.college,
  profileBio: demoUser.bio,
};

export interface SubmitResult {
  xpEarned: number;
  streak: number;
  streakBonus: boolean;
  unlocked: Achievement[];
}

export interface ProofDraft {
  title: string;
  summary: string;
  repoUrl: string;
  deploymentUrl: string;
  day: number;
}

interface AppStateValue {
  hydrated: boolean;
  user: User;
  track: Track;
  trackId: TrackId;
  setTrack: (id: TrackId) => void;
  challenge: TrackChallenge;
  nextChallenge: TrackChallenge;
  challengeForDay: (day: number) => TrackChallenge;
  progress: DailyProgress[];
  achievements: Achievement[];
  activities: ActivityItem[];
  proofs: Proof[];
  currentDay: number;
  totalDays: number;
  streak: number;
  xp: number;
  projectsShipped: number;
  rank: number;
  daysCompleted: number;
  daysRemaining: number;
  progressPercent: number;
  todaySubmitted: boolean;
  isDayCompleted: (day: number) => boolean;
  checklist: string[];
  checklistForDay: (day: number) => string[];
  toggleChecklistItem: (id: string, day?: number) => void;
  submitProof: (draft: ProofDraft) => SubmitResult;
  /** @deprecated use submitProof */
  addProof: (proof: Proof) => void;
  onboarded: boolean;
  goal: string | null;
  setGoal: (goal: string) => void;
  profile: { name: string; college: string; bio: string };
  updateProfile: (next: { name: string; college: string; bio: string }) => void;
  githubConnected: boolean;
  setGithubConnected: (connected: boolean) => void;
  completeOnboarding: () => void;
  resetDemo: () => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

const nowLabel = () => "just now";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;

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

  const toggleChecklistItem = useCallback((id: string, day?: number) => {
    setState((prev) => {
      const key = String(day ?? prev.currentDay);
      const current = prev.checklists[key] ?? [];
      return {
        ...prev,
        checklists: {
          ...prev.checklists,
          [key]: current.includes(id) ? current.filter((x) => x !== id) : [...current, id],
        },
      };
    });
  }, []);

  const setTrack = useCallback((trackId: TrackId) => {
    setState((prev) => {
      if (prev.trackId === trackId) return prev;
      return {
        ...prev,
        trackId,
        activities: [
          {
            id: `act-${Date.now()}`,
            kind: "track",
            title: `Track set to ${trackById(trackId).name}`,
            detail: "Your daily challenges now follow this track",
            at: nowLabel(),
          },
          ...prev.activities,
        ].slice(0, 20),
      };
    });
  }, []);

  const submitProof = useCallback((draft: ProofDraft): SubmitResult => {
    const prev = stateRef.current;
    const already = prev.completedDays.includes(draft.day);
    const streak = already ? prev.streak : prev.streak + 1;
    const streakBonus = !already && streak % 7 === 0;
    const xpEarned = already ? 0 : XP_CHALLENGE + XP_PROOF + (streakBonus ? XP_STREAK_BONUS : 0);
    const completedDays = already
      ? prev.completedDays
      : [...prev.completedDays, draft.day].sort((a, b) => a - b);
    const projectsShipped = already ? prev.projectsShipped : prev.projectsShipped + 1;

    const before = buildAchievements(
      prev.streak,
      prev.projectsShipped,
      BASE_RANK,
      prev.completedDays.length,
    );
    const after = buildAchievements(streak, projectsShipped, BASE_RANK, completedDays.length);
    const unlocked = after.filter(
      (a) => a.unlocked && !before.find((b) => b.id === a.id)?.unlocked,
    );

    const proof: Proof = {
      id: `p-${draft.day}-${Date.now()}`,
      day: draft.day,
      title: draft.title,
      summary: draft.summary,
      repoUrl: draft.repoUrl,
      deploymentUrl: draft.deploymentUrl,
      date: new Date().toISOString().slice(0, 10),
      verified: false,
      checks: [
        { id: "repo", label: "GitHub repository link recorded", passed: true },
        { id: "live", label: "Live project link recorded", passed: true },
        { id: "notes", label: "Build notes added", passed: true },
        { id: "day", label: `Day ${draft.day} marked complete`, passed: true },
      ],
      streakAtSubmission: streak,
      kind: "project",
    };

    const activities: ActivityItem[] = [
      {
        id: `act-${Date.now()}-proof`,
        kind: "proof",
        title: `Day ${draft.day} proof submitted`,
        detail: `${draft.title} · challenge completed`,
        xp: xpEarned,
        at: nowLabel(),
      },
      ...(streakBonus
        ? [
            {
              id: `act-${Date.now()}-bonus`,
              kind: "streak" as const,
              title: `${streak}-day streak bonus`,
              detail: `+${XP_STREAK_BONUS} XP for staying consistent`,
              xp: XP_STREAK_BONUS,
              at: nowLabel(),
            },
          ]
        : []),
      ...unlocked.map((a) => ({
        id: `act-${Date.now()}-${a.id}`,
        kind: "achievement" as const,
        title: `Achievement unlocked: ${a.title}`,
        detail: a.detail,
        at: nowLabel(),
      })),
    ];

    setState((current) => ({
      ...current,
      proofs: current.proofs.some((p) => p.day === draft.day)
        ? current.proofs.map((p) => (p.day === draft.day ? proof : p))
        : [proof, ...current.proofs],
      completedDays,
      streak,
      xp: current.xp + xpEarned,
      projectsShipped,
      activities: [...activities, ...current.activities].slice(0, 20),
    }));

    return { xpEarned, streak, streakBonus, unlocked };
  }, []);

  const addProof = useCallback(
    (proof: Proof) => {
      submitProof({
        title: proof.title,
        summary: proof.summary,
        repoUrl: proof.repoUrl,
        deploymentUrl: proof.deploymentUrl,
        day: proof.day,
      });
    },
    [submitProof],
  );

  const setGoal = useCallback((goal: string) => setState((p) => ({ ...p, goal })), []);
  const updateProfile = useCallback(
    (next: { name: string; college: string; bio: string }) =>
      setState((p) => ({
        ...p,
        profileName: next.name,
        profileCollege: next.college,
        profileBio: next.bio,
      })),
    [],
  );
  const setGithubConnected = useCallback(
    (githubConnected: boolean) => setState((p) => ({ ...p, githubConnected })),
    [],
  );
  const completeOnboarding = useCallback(() => setState((p) => ({ ...p, onboarded: true })), []);
  const resetDemo = useCallback(() => setState(initialState), []);

  const value = useMemo<AppStateValue>(() => {
    const completed = new Set(state.completedDays);
    const todaySubmitted = completed.has(state.currentDay);
    const daysCompleted = state.completedDays.length;

    const progress = buildProgress(state.currentDay).map((d) => {
      if (completed.has(d.day)) return { ...d, status: "completed" as const };
      if (d.day === state.currentDay) return { ...d, status: "today" as const };
      if (d.day < state.currentDay) return { ...d, status: "missed" as const };
      return { ...d, status: "upcoming" as const };
    });

    return {
      hydrated,
      user: {
        ...demoUser,
        name: state.profileName,
        college: state.profileCollege,
        bio: state.profileBio,
        avatarInitials: state.profileName.trim().charAt(0).toUpperCase() || "A",
        goal: state.goal,
        githubConnected: state.githubConnected,
      },
      track: trackById(state.trackId),
      trackId: state.trackId,
      setTrack,
      challenge: getChallenge(state.trackId, state.currentDay),
      nextChallenge: getChallenge(state.trackId, Math.min(TOTAL_DAYS, state.currentDay + 1)),
      challengeForDay: (day: number) =>
        getChallenge(state.trackId, Math.min(TOTAL_DAYS, Math.max(1, day))),
      progress,
      achievements: buildAchievements(
        state.streak,
        state.projectsShipped,
        BASE_RANK,
        daysCompleted,
      ),
      activities: state.activities,
      proofs: state.proofs,
      currentDay: state.currentDay,
      totalDays: TOTAL_DAYS,
      streak: state.streak,
      xp: state.xp,
      projectsShipped: state.projectsShipped,
      rank: BASE_RANK,
      daysCompleted,
      daysRemaining: TOTAL_DAYS - daysCompleted,
      progressPercent: Math.round((daysCompleted / TOTAL_DAYS) * 100),
      todaySubmitted,
      isDayCompleted: (day: number) => completed.has(day),
      checklist: state.checklists[String(state.currentDay)] ?? [],
      checklistForDay: (day: number) => state.checklists[String(day)] ?? [],
      toggleChecklistItem,
      submitProof,
      addProof,
      onboarded: state.onboarded,
      goal: state.goal,
      setGoal,
      profile: {
        name: state.profileName,
        college: state.profileCollege,
        bio: state.profileBio,
      },
      updateProfile,
      githubConnected: state.githubConnected,
      setGithubConnected,
      completeOnboarding,
      resetDemo,
    };
  }, [
    state,
    hydrated,
    setTrack,
    toggleChecklistItem,
    submitProof,
    addProof,
    setGoal,
    updateProfile,
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
