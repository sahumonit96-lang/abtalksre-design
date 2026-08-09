/**
 * Core domain models for ABTalks.
 *
 * These types are the contract between the UI and the data layer.
 * Today the data layer is a mock service (`src/services/*`), backed by
 * localStorage for user-generated state. Swapping in Lovable Cloud later
 * means implementing the same shapes from database rows — no UI changes.
 */

export type DayStatus = "completed" | "today" | "upcoming" | "missed";

export interface User {
  id: string;
  name: string;
  handle: string;
  college: string;
  avatarInitials: string;
  bio: string;
  buildingSince: string;
  githubConnected: boolean;
  githubUsername: string | null;
  goal: string | null;
}

export interface Challenge {
  id: string;
  day: number;
  totalDays: number;
  title: string;
  description: string;
  track: string;
  difficulty: string;
  minutes: number;
  checklist: { id: string; label: string }[];
}

export type TrackId = "web" | "python" | "cpp" | "javascript" | "aiml";

export interface Track {
  id: TrackId;
  name: string;
  tagline: string;
  icon: string;
  skills: string[];
}

export interface TrackChallenge extends Challenge {
  trackId: TrackId;
  skills: string[];
  problemStatement: string;
  requirements: string[];
  outcome: string;
  resources: { label: string; url: string }[];
  xp: number;
}

export type ActivityKind = "proof" | "challenge" | "streak" | "achievement" | "track";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  detail: string;
  xp?: number;
  at: string;
}

export interface DailyProgress {
  day: number;
  status: DayStatus;
  date: string;
}

export interface VerificationCheck {
  id: string;
  label: string;
  passed: boolean;
}

export interface Proof {
  id: string;
  day: number;
  title: string;
  summary: string;
  repoUrl: string;
  deploymentUrl: string;
  date: string;
  verified: boolean;
  checks: VerificationCheck[];
  streakAtSubmission: number;
  kind: "project" | "challenge";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl: string;
  daysBuilt: number;
}

export interface Builder {
  id: string;
  name: string;
  handle: string;
  college: string;
  avatarInitials: string;
  streak: number;
  daysCompleted: number;
  projectsShipped: number;
  xp: number;
}

export interface Post {
  id: string;
  builderId: string;
  builderName: string;
  avatarInitials: string;
  day: number;
  body: string;
  githubVerified: boolean;
  deploymentVerified: boolean;
  likes: number;
  comments: number;
  postedAt: string;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  detail: string;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  builderId: string;
  name: string;
  college: string;
  avatarInitials: string;
  streak: number;
  daysCompleted: number;
  projects: number;
  xp: number;
  isCurrentUser?: boolean;
}