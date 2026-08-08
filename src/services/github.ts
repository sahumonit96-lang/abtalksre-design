/**
 * GitHub service abstraction.
 *
 * All GitHub reads in the app go through this module so a real integration can
 * replace the mock implementations without touching UI code.
 *
 * TO CONNECT A REAL GITHUB INTEGRATION LATER:
 *  1. Enable Lovable Cloud and store the GitHub OAuth client secret / PAT as a
 *     backend secret. Never put a GitHub secret in this file — it ships to the
 *     browser.
 *  2. Add a server function (e.g. `src/lib/github.functions.ts`) that calls the
 *     GitHub REST API server-side using that secret.
 *  3. Replace each mock body below with a call to that server function. The
 *     return shapes are already the shapes the UI consumes.
 */

export interface GitHubProfile {
  username: string;
  name: string;
  avatarUrl: string | null;
  publicRepos: number;
  followers: number;
}

export interface GitHubRepository {
  id: string;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string;
  language: string;
  stars: number;
  pushedAt: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  committedAt: string;
  repo: string;
}

export interface GitHubRepositoryStats {
  commitsLast7Days: number;
  openPullRequests: number;
  contributors: number;
  defaultBranch: string;
}

export interface DailyActivityVerification {
  verifiedAt: string;
  commitCount: number;
  repoActive: boolean;
  deploymentReachable: boolean;
  checks: { id: string; label: string; passed: boolean }[];
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_REPOS: GitHubRepository[] = [
  {
    id: "r-1",
    name: "ai-resume-analyzer",
    fullName: "monitbuilds/ai-resume-analyzer",
    htmlUrl: "https://github.com/monitbuilds/ai-resume-analyzer",
    description: "Resume scoring against a job description.",
    language: "TypeScript",
    stars: 41,
    pushedAt: "2026-08-08T09:12:00Z",
  },
  {
    id: "r-2",
    name: "campus-connect",
    fullName: "monitbuilds/campus-connect",
    htmlUrl: "https://github.com/monitbuilds/campus-connect",
    description: "Campus events and clubs directory.",
    language: "TypeScript",
    stars: 27,
    pushedAt: "2026-08-05T16:40:00Z",
  },
  {
    id: "r-3",
    name: "studyflow",
    fullName: "monitbuilds/studyflow",
    htmlUrl: "https://github.com/monitbuilds/studyflow",
    description: "Syllabus to study plan.",
    language: "TypeScript",
    stars: 18,
    pushedAt: "2026-08-06T11:05:00Z",
  },
];

/** GET /user — replace with a server-side authenticated GitHub call. */
export async function getUserProfile(username = "monitbuilds"): Promise<GitHubProfile> {
  await delay(220);
  return {
    username,
    name: "Monit",
    avatarUrl: null,
    publicRepos: 14,
    followers: 132,
  };
}

/** GET /user/repos */
export async function getRepositories(): Promise<GitHubRepository[]> {
  await delay(260);
  return MOCK_REPOS;
}

/** GET /repos/{owner}/{repo}/commits */
export async function getRecentCommits(repo = "monitbuilds/ai-resume-analyzer"): Promise<
  GitHubCommit[]
> {
  await delay(240);
  return [
    {
      sha: "9f2c1ab",
      message: "feat: score breakdown per section",
      committedAt: "2026-08-08T09:12:00Z",
      repo,
    },
    {
      sha: "3d81e4c",
      message: "fix: handle empty job description",
      committedAt: "2026-08-08T08:31:00Z",
      repo,
    },
    { sha: "c07b9de", message: "chore: bump deps", committedAt: "2026-08-07T21:04:00Z", repo },
  ];
}

/** Aggregated repo stats used on the proof card. */
export async function getRepositoryStats(): Promise<GitHubRepositoryStats> {
  await delay(200);
  return { commitsLast7Days: 23, openPullRequests: 2, contributors: 1, defaultBranch: "main" };
}

/**
 * Verifies that the builder actually did work today.
 *
 * Real implementation: compare today's commit timestamps for `repoUrl` against
 * the user's local day, then HEAD the deployment URL. For the demo this derives
 * a realistic result from the submitted URLs so the flow is fully functional
 * without any external API configured.
 */
export async function verifyDailyActivity(input: {
  repoUrl: string;
  deploymentUrl: string;
}): Promise<DailyActivityVerification> {
  await delay(320);
  const repoActive = /github\.com\/[^/]+\/[^/]+/.test(input.repoUrl);
  const deploymentReachable = /^https?:\/\/.+\..+/.test(input.deploymentUrl);
  const commitCount = repoActive ? 4 : 0;

  return {
    verifiedAt: new Date().toISOString(),
    commitCount,
    repoActive,
    deploymentReachable,
    checks: [
      { id: "activity", label: "GitHub activity detected", passed: commitCount > 0 },
      { id: "repo", label: "Repository active", passed: repoActive },
      { id: "deploy", label: "Deployment available", passed: deploymentReachable },
      { id: "progress", label: "Daily progress recorded", passed: true },
    ],
  };
}