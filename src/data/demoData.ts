import type {
  Achievement,
  Builder,
  Challenge,
  DailyProgress,
  DayStatus,
  LeaderboardEntry,
  Post,
  Project,
  Proof,
  User,
} from "./types";

export const TOTAL_DAYS = 60;
export const CURRENT_DAY = 12;
export const BASE_STREAK = 11;
export const BASE_PROJECTS = 7;
export const BASE_RANK = 18;

export const demoUser: User = {
  id: "u-monit",
  name: "Monit",
  handle: "monit",
  college: "SRM Institute of Technology",
  avatarInitials: "M",
  bio: "College builder focused on AI, web development, and shipping products.",
  buildingSince: "2026",
  githubConnected: true,
  githubUsername: "monitbuilds",
  goal: "Build in public",
};

export const todaysChallenge: Challenge = {
  id: "c-12",
  day: CURRENT_DAY,
  totalDays: TOTAL_DAYS,
  title: "Ship something meaningful.",
  description: "Build one feature today that a real user could experience.",
  track: "Web Development",
  difficulty: "Intermediate",
  minutes: 45,
  checklist: [
    { id: "code", label: "Write or update code" },
    { id: "commit", label: "Push a GitHub commit" },
    { id: "deploy", label: "Deploy your work" },
    { id: "share", label: "Share your progress" },
  ],
};

const missedDays = [7];

export function buildProgress(currentDay: number): DailyProgress[] {
  const start = new Date("2026-07-28T00:00:00Z");
  return Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const day = i + 1;
    let status: DayStatus = "upcoming";
    if (day === currentDay) status = "today";
    else if (missedDays.includes(day)) status = "missed";
    else if (day < currentDay) status = "completed";
    const date = new Date(start.getTime() + i * 86400000);
    return { day, status, date: date.toISOString().slice(0, 10) };
  });
}

const verifiedChecks = [
  { id: "activity", label: "GitHub activity detected", passed: true },
  { id: "repo", label: "Repository active", passed: true },
  { id: "deploy", label: "Deployment available", passed: true },
  { id: "progress", label: "Daily progress recorded", passed: true },
];

export const seedProofs: Proof[] = [
  {
    id: "p-11",
    day: 11,
    title: "Portfolio redesign",
    summary: "Rebuilt the case-study layout and shipped a dark theme with real project metrics.",
    repoUrl: "https://github.com/monitbuilds/portfolio",
    deploymentUrl: "https://monit.dev",
    date: "2026-08-07",
    verified: true,
    checks: verifiedChecks,
    streakAtSubmission: 11,
    kind: "project",
  },
  {
    id: "p-10",
    day: 10,
    title: "AI study planner",
    summary: "Added weekly plan generation and persisted schedules per user.",
    repoUrl: "https://github.com/monitbuilds/studyflow",
    deploymentUrl: "https://studyflow-demo.vercel.app",
    date: "2026-08-06",
    verified: true,
    checks: verifiedChecks,
    streakAtSubmission: 10,
    kind: "project",
  },
  {
    id: "p-09",
    day: 9,
    title: "Campus Connect events feed",
    summary: "Shipped realtime event listings with RSVP counts.",
    repoUrl: "https://github.com/monitbuilds/campus-connect",
    deploymentUrl: "https://campus-connect-demo.vercel.app",
    date: "2026-08-05",
    verified: true,
    checks: verifiedChecks,
    streakAtSubmission: 9,
    kind: "project",
  },
  {
    id: "p-08",
    day: 8,
    title: "Responsive layout challenge",
    summary: "Completed the responsive grid challenge and documented the breakpoints.",
    repoUrl: "https://github.com/monitbuilds/daily-challenges",
    deploymentUrl: "https://daily-challenges-monit.vercel.app",
    date: "2026-08-04",
    verified: true,
    checks: verifiedChecks,
    streakAtSubmission: 8,
    kind: "challenge",
  },
  {
    id: "p-06",
    day: 6,
    title: "Auth flow polish",
    summary: "Refined the sign-in states and added inline validation everywhere.",
    repoUrl: "https://github.com/monitbuilds/campus-connect",
    deploymentUrl: "https://campus-connect-demo.vercel.app",
    date: "2026-08-02",
    verified: true,
    checks: verifiedChecks,
    streakAtSubmission: 6,
    kind: "challenge",
  },
];

export const demoProjects: Project[] = [
  {
    id: "pr-1",
    name: "AI Resume Analyzer",
    description: "Scores a resume against a job description and suggests concrete rewrites.",
    stack: ["React", "TypeScript", "AI"],
    repoUrl: "https://github.com/monitbuilds/ai-resume-analyzer",
    liveUrl: "https://ai-resume-analyzer-demo.vercel.app",
    daysBuilt: 5,
  },
  {
    id: "pr-2",
    name: "Campus Connect",
    description: "A campus events and clubs directory with RSVPs and realtime updates.",
    stack: ["React", "Supabase"],
    repoUrl: "https://github.com/monitbuilds/campus-connect",
    liveUrl: "https://campus-connect-demo.vercel.app",
    daysBuilt: 4,
  },
  {
    id: "pr-3",
    name: "StudyFlow",
    description: "Turns a syllabus into a day-by-day study plan you can actually follow.",
    stack: ["Next.js", "AI"],
    repoUrl: "https://github.com/monitbuilds/studyflow",
    liveUrl: "https://studyflow-demo.vercel.app",
    daysBuilt: 3,
  },
  {
    id: "pr-4",
    name: "Proof Cards",
    description: "Generates shareable build-in-public cards from commit activity.",
    stack: ["React", "Canvas"],
    repoUrl: "https://github.com/monitbuilds/proof-cards",
    liveUrl: "https://proof-cards-demo.vercel.app",
    daysBuilt: 2,
  },
];

export const builders: Builder[] = [
  {
    id: "b-1",
    name: "Aarav Sharma",
    handle: "aarav",
    college: "IIT Delhi",
    avatarInitials: "AS",
    streak: 47,
    daysCompleted: 47,
    projectsShipped: 23,
    xp: 5850,
  },
  {
    id: "b-2",
    name: "Priya Singh",
    handle: "priya",
    college: "BITS Pilani",
    avatarInitials: "PS",
    streak: 43,
    daysCompleted: 43,
    projectsShipped: 19,
    xp: 5250,
  },
  {
    id: "b-3",
    name: "Rahul Mehta",
    handle: "rahul",
    college: "NIT Trichy",
    avatarInitials: "RM",
    streak: 39,
    daysCompleted: 39,
    projectsShipped: 17,
    xp: 4750,
  },
  {
    id: "b-4",
    name: "Ananya Rao",
    handle: "ananya",
    college: "VIT Vellore",
    avatarInitials: "AR",
    streak: 34,
    daysCompleted: 36,
    projectsShipped: 15,
    xp: 4350,
  },
  {
    id: "b-5",
    name: "Kabir Nair",
    handle: "kabir",
    college: "IIIT Hyderabad",
    avatarInitials: "KN",
    streak: 32,
    daysCompleted: 32,
    projectsShipped: 14,
    xp: 3900,
  },
  {
    id: "b-6",
    name: "Ishita Verma",
    handle: "ishita",
    college: "SRM Institute of Technology",
    avatarInitials: "IV",
    streak: 28,
    daysCompleted: 30,
    projectsShipped: 12,
    xp: 3600,
  },
  {
    id: "b-7",
    name: "Dev Patel",
    handle: "dev",
    college: "DAIICT",
    avatarInitials: "DP",
    streak: 24,
    daysCompleted: 25,
    projectsShipped: 11,
    xp: 3050,
  },
  {
    id: "b-8",
    name: "Sneha Iyer",
    handle: "sneha",
    college: "PSG Tech",
    avatarInitials: "SI",
    streak: 21,
    daysCompleted: 23,
    projectsShipped: 9,
    xp: 2750,
  },
  {
    id: "b-9",
    name: "Aditya Bose",
    handle: "aditya",
    college: "Jadavpur University",
    avatarInitials: "AB",
    streak: 18,
    daysCompleted: 20,
    projectsShipped: 8,
    xp: 2400,
  },
  {
    id: "b-10",
    name: "Meera Joshi",
    handle: "meera",
    college: "COEP Pune",
    avatarInitials: "MJ",
    streak: 16,
    daysCompleted: 18,
    projectsShipped: 8,
    xp: 2200,
  },
  {
    id: "b-11",
    name: "Rohan Gupta",
    handle: "rohan",
    college: "SRM Institute of Technology",
    avatarInitials: "RG",
    streak: 14,
    daysCompleted: 16,
    projectsShipped: 7,
    xp: 1950,
  },
];

export const posts: Post[] = [
  {
    id: "f-1",
    builderId: "b-3",
    builderName: "Rahul Mehta",
    avatarInitials: "RM",
    day: 18,
    body: "Built an AI study planner today. It now turns a syllabus PDF into a 30-day plan.",
    githubVerified: true,
    deploymentVerified: true,
    likes: 24,
    comments: 6,
    postedAt: "2 hours ago",
  },
  {
    id: "f-2",
    builderId: "b-2",
    builderName: "Priya Singh",
    avatarInitials: "PS",
    day: 43,
    body: "Day 43. Shipped payment webhooks for my campus marketplace — 11 commits, all green.",
    githubVerified: true,
    deploymentVerified: true,
    likes: 61,
    comments: 14,
    postedAt: "4 hours ago",
  },
  {
    id: "f-3",
    builderId: "b-5",
    builderName: "Kabir Nair",
    avatarInitials: "KN",
    day: 32,
    body: "Rewrote my search to use embeddings. Results went from useless to genuinely good.",
    githubVerified: true,
    deploymentVerified: false,
    likes: 38,
    comments: 9,
    postedAt: "6 hours ago",
  },
  {
    id: "f-4",
    builderId: "b-1",
    builderName: "Aarav Sharma",
    avatarInitials: "AS",
    day: 47,
    body: "47 days straight. Today: onboarding rebuild, activation jumped in my own testing.",
    githubVerified: true,
    deploymentVerified: true,
    likes: 92,
    comments: 21,
    postedAt: "8 hours ago",
  },
  {
    id: "f-5",
    builderId: "b-6",
    builderName: "Ishita Verma",
    avatarInitials: "IV",
    day: 30,
    body: "Shipped a dark mode that actually respects contrast. Small win, real users noticed.",
    githubVerified: true,
    deploymentVerified: true,
    likes: 44,
    comments: 7,
    postedAt: "11 hours ago",
  },
  {
    id: "f-6",
    builderId: "b-8",
    builderName: "Sneha Iyer",
    avatarInitials: "SI",
    day: 23,
    body: "Deployed my first Postgres-backed API today. Learned more in 3 hours than a full week of tutorials.",
    githubVerified: true,
    deploymentVerified: true,
    likes: 29,
    comments: 5,
    postedAt: "yesterday",
  },
];

export function buildLeaderboard(user: {
  streak: number;
  daysCompleted: number;
  projects: number;
  xp: number;
}): LeaderboardEntry[] {
  const rows: LeaderboardEntry[] = builders.slice(0, 10).map((b, i) => ({
    rank: i + 1,
    builderId: b.id,
    name: b.name,
    college: b.college,
    avatarInitials: b.avatarInitials,
    streak: b.streak,
    daysCompleted: b.daysCompleted,
    projects: b.projectsShipped,
    xp: b.xp,
  }));

  rows.push({
    rank: BASE_RANK,
    builderId: demoUser.id,
    name: demoUser.name,
    college: demoUser.college,
    avatarInitials: demoUser.avatarInitials,
    streak: user.streak,
    daysCompleted: user.daysCompleted,
    projects: user.projects,
    xp: user.xp,
    isCurrentUser: true,
  });

  return rows;
}

export function buildAchievements(
  streak: number,
  projects: number,
  rank: number,
  daysCompleted = 0,
): Achievement[] {
  return [
    {
      id: "a-first-build",
      icon: "🏗️",
      title: "First Build",
      detail: daysCompleted >= 1 ? "Day 1 submitted" : "Submit your first proof",
      unlocked: daysCompleted >= 1,
    },
    {
      id: "a-first-project",
      icon: "🚀",
      title: "First Project Shipped",
      detail: projects >= 1 ? `${projects} shipped so far` : "Ship a project",
      unlocked: projects >= 1,
    },
    {
      id: "a-7",
      icon: "🔥",
      title: "7-Day Streak",
      detail: streak >= 7 ? "One week unbroken" : `${7 - streak} days to go`,
      unlocked: streak >= 7,
    },
    {
      id: "a-14",
      icon: "🔥",
      title: "14-Day Streak",
      detail: streak >= 14 ? "Two weeks unbroken" : `${Math.max(0, 14 - streak)} days to go`,
      unlocked: streak >= 14,
    },
    {
      id: "a-30",
      icon: "🏅",
      title: "30-Day Builder",
      detail: streak >= 30 ? "Halfway habit locked in" : `${Math.max(0, 30 - streak)} days to go`,
      unlocked: streak >= 30,
    },
    {
      id: "a-60",
      icon: "🏆",
      title: "60-Day Finisher",
      detail:
        daysCompleted >= 60 ? "Full run complete" : `${Math.max(0, 60 - daysCompleted)} days left`,
      unlocked: daysCompleted >= 60,
    },
    {
      id: "a-top10",
      icon: "👑",
      title: "Top 10 Builder",
      detail: rank <= 10 ? `Rank #${rank}` : `Currently #${rank}`,
      unlocked: rank <= 10,
    },
  ];
}
