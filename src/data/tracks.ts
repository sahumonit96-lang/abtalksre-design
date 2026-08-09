import type { Track, TrackChallenge, TrackId } from "./types";

/**
 * Challenge tracks. Each track owns its own 60-day challenge list, generated
 * from a small set of authored briefs so every day has a real problem
 * statement, requirements, expected outcome and resources.
 *
 * When a backend arrives, `getChallenge` / `getTrackChallenges` become queries —
 * the shapes stay identical.
 */

export const TOTAL_DAYS = 60;

export const tracks: Track[] = [
  {
    id: "web",
    name: "Web Development",
    tagline: "Ship real interfaces people can use — HTML, CSS, React.",
    icon: "🌐",
    skills: ["HTML", "CSS", "React"],
  },
  {
    id: "python",
    name: "Python",
    tagline: "Automate, script and build small tools every single day.",
    icon: "🐍",
    skills: ["Python", "APIs", "Automation"],
  },
  {
    id: "cpp",
    name: "C++",
    tagline: "Data structures, algorithms and performance fundamentals.",
    icon: "⚙️",
    skills: ["C++", "DSA", "Memory"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    tagline: "Language mastery through tiny daily browser builds.",
    icon: "✦",
    skills: ["JavaScript", "DOM", "Async"],
  },
  {
    id: "aiml",
    name: "AI / ML",
    tagline: "Models, datasets and applied AI features you can demo.",
    icon: "🧠",
    skills: ["Python", "ML", "LLMs"],
  },
];

export const trackById = (id: TrackId) => tracks.find((t) => t.id === id) ?? tracks[0];

interface Brief {
  title: string;
  description: string;
  problemStatement: string;
  requirements: string[];
  outcome: string;
  minutes: number;
}

const briefs: Record<TrackId, Brief[]> = {
  web: [
    {
      title: "Build a Responsive Portfolio Card",
      description: "A single profile card that looks right on phone, tablet and desktop.",
      problemStatement:
        "Build a portfolio card component showing an avatar, name, role, short bio and two links. It must stay readable from 320px up to a wide desktop screen without horizontal scrolling.",
      requirements: [
        "Card is centred and never overflows the viewport",
        "Avatar, name and role stack on mobile, sit side by side above 640px",
        "Bio truncates gracefully instead of breaking layout",
        "Links are keyboard focusable with a visible focus ring",
      ],
      outcome: "A deployed page with one polished card that survives every breakpoint.",
      minutes: 45,
    },
    {
      title: "Sticky Navbar With Mobile Menu",
      description: "Navigation that works with a thumb, not just a mouse.",
      problemStatement:
        "Build a sticky top navigation with four links, a brand mark and a mobile hamburger menu that opens a full-height panel.",
      requirements: [
        "Nav stays fixed on scroll without covering content",
        "Hamburger appears below 1024px only",
        "Menu closes on link click and on Escape",
        "Active link is visually distinct",
      ],
      outcome: "A navigation bar you can reuse in every future project.",
      minutes: 50,
    },
    {
      title: "Pricing Section With Real States",
      description: "Three plans, one highlighted, all responsive.",
      problemStatement:
        "Build a pricing section with three tiers, a highlighted recommended plan and a monthly/yearly toggle that actually changes the numbers.",
      requirements: [
        "Toggle updates all three prices",
        "Recommended plan is visually emphasised",
        "Cards become a single column below 768px",
        "Feature lists use semantic list markup",
      ],
      outcome: "A conversion-ready pricing block with working interaction.",
      minutes: 60,
    },
    {
      title: "Form With Inline Validation",
      description: "Validation that helps instead of shouting.",
      problemStatement:
        "Build a signup form with name, email and password. Validate on submit, show inline field errors, and show a success state after a valid submission.",
      requirements: [
        "Each invalid field shows its own message",
        "Errors are linked to inputs with aria-describedby",
        "Submit button shows a pending state",
        "Success state replaces the form",
      ],
      outcome: "An accessible form pattern you trust in production.",
      minutes: 55,
    },
    {
      title: "Dashboard Layout With Sidebar",
      description: "The layout every product eventually needs.",
      problemStatement:
        "Build a dashboard shell: persistent sidebar on desktop, bottom navigation on mobile, and a scrollable content area with four metric cards.",
      requirements: [
        "Sidebar collapses to bottom nav under 1024px",
        "Content area scrolls independently",
        "Metric cards form a 2x2 grid on mobile, 4 across on desktop",
        "No layout shift when content is empty",
      ],
      outcome: "A reusable app shell for your next real project.",
      minutes: 70,
    },
    {
      title: "Dark Mode That Respects Contrast",
      description: "Theming done with tokens, not hardcoded colours.",
      problemStatement:
        "Add a light/dark theme to an existing page using CSS variables, persist the choice, and check text contrast in both modes.",
      requirements: [
        "All colours come from tokens, none hardcoded",
        "Choice persists across reloads",
        "Body text meets 4.5:1 contrast in both themes",
        "No flash of wrong theme on load",
      ],
      outcome: "A theme system you can drop into any project.",
      minutes: 50,
    },
    {
      title: "Fetch, Loading, Empty, Error",
      description: "The four states most projects forget.",
      problemStatement:
        "Fetch a list from a public API and render all four states properly: loading skeletons, populated list, empty result, and a retryable error.",
      requirements: [
        "Skeletons match the final layout size",
        "Empty state explains the next action",
        "Error state has a working retry button",
        "No unhandled promise rejections in the console",
      ],
      outcome: "A data-fetching pattern with no dead ends.",
      minutes: 60,
    },
    {
      title: "Ship a Feature End to End",
      description: "Small scope, real user value, deployed today.",
      problemStatement:
        "Pick one feature in your ongoing project, build it fully, and deploy it. It must be something a real user could touch today.",
      requirements: [
        "Feature works on mobile and desktop",
        "Edge cases handled (empty, long text, slow network)",
        "Committed with a clear message",
        "Deployed to a public URL",
      ],
      outcome: "One more shipped feature in your live product.",
      minutes: 75,
    },
  ],
  python: [
    {
      title: "CLI Tool That Solves One Annoyance",
      description: "A script you will actually run again tomorrow.",
      problemStatement:
        "Write a command-line tool that takes arguments and automates one small task you repeat manually — renaming files, summarising a CSV, or fetching a daily value.",
      requirements: [
        "Uses argparse with --help output",
        "Handles missing or bad input without a traceback",
        "Prints a clear success summary",
        "Has at least one unit test",
      ],
      outcome: "A working CLI tool committed with usage instructions.",
      minutes: 50,
    },
    {
      title: "Parse and Clean a Messy Dataset",
      description: "Real data is never tidy.",
      problemStatement:
        "Load a CSV with missing values and inconsistent formats, clean it, and output a normalised file plus a short summary of what changed.",
      requirements: [
        "Missing values handled explicitly, not silently dropped",
        "Dates and numbers normalised to one format",
        "Summary reports rows in, rows out, fields fixed",
        "Script is idempotent when re-run",
      ],
      outcome: "A reusable cleaning script and a clean dataset.",
      minutes: 60,
    },
    {
      title: "Wrap a Public API",
      description: "Turn an API into a tiny library.",
      problemStatement:
        "Build a small client module around a public API with typed functions, retries on failure, and caching of repeated calls.",
      requirements: [
        "Timeouts and retries with backoff",
        "Errors raised as your own exception type",
        "Simple in-memory cache for repeat calls",
        "No secrets committed to the repository",
      ],
      outcome: "A clean API wrapper you can import anywhere.",
      minutes: 65,
    },
    {
      title: "Build a Small REST API",
      description: "From zero to a running endpoint.",
      problemStatement:
        "Create a FastAPI or Flask service with two endpoints: one that lists items and one that creates them, backed by an in-memory store.",
      requirements: [
        "Request bodies validated before use",
        "Correct status codes for success and validation errors",
        "Interactive docs reachable locally",
        "One test per endpoint",
      ],
      outcome: "A running API with documented endpoints.",
      minutes: 70,
    },
    {
      title: "Automate a Daily Report",
      description: "Something that runs without you.",
      problemStatement:
        "Write a script that gathers data from a source, formats a short report, and writes it to a file or sends it somewhere on a schedule.",
      requirements: [
        "Configuration read from environment, not hardcoded",
        "Report includes a timestamp and a delta from last run",
        "Failure logs enough context to debug",
        "Documented how to schedule it",
      ],
      outcome: "An automation you can leave running.",
      minutes: 55,
    },
    {
      title: "Refactor With Tests First",
      description: "Change code without breaking it.",
      problemStatement:
        "Take an existing script of yours, cover the important behaviour with tests, then refactor it into functions or classes without changing behaviour.",
      requirements: [
        "Tests written before the refactor",
        "Test suite green before and after",
        "Functions do one thing each",
        "Commit history shows tests, then refactor",
      ],
      outcome: "Cleaner code and a safety net you keep.",
      minutes: 60,
    },
  ],
  cpp: [
    {
      title: "Implement a Dynamic Array",
      description: "Understand what vector actually does.",
      problemStatement:
        "Implement a growable array with push_back, indexing, size, capacity and correct memory cleanup, then compare its growth behaviour with std::vector.",
      requirements: [
        "Doubling growth strategy with capacity tracking",
        "No memory leaks (verify with a sanitiser)",
        "Copy and move constructors implemented",
        "Short benchmark against std::vector",
      ],
      outcome: "A working container plus notes on what you learned.",
      minutes: 70,
    },
    {
      title: "Two Pointers and Sliding Window",
      description: "Two patterns that solve a hundred problems.",
      problemStatement:
        "Solve three array problems using two pointers or a sliding window, and write down the time and space complexity for each.",
      requirements: [
        "Three problems solved and committed",
        "Complexity documented per solution",
        "Edge cases covered (empty, single element, all equal)",
        "One brute-force comparison for correctness",
      ],
      outcome: "Three solved problems with complexity analysis.",
      minutes: 60,
    },
    {
      title: "Build a Linked List and Reverse It",
      description: "Pointers, carefully.",
      problemStatement:
        "Implement a singly linked list with insert, delete and reverse operations, using smart pointers or explicit ownership rules.",
      requirements: [
        "Insert at head and tail",
        "Delete by value with correct relinking",
        "Iterative reverse in O(n) time, O(1) extra space",
        "No dangling pointers after deletion",
      ],
      outcome: "A tested linked list implementation.",
      minutes: 65,
    },
    {
      title: "Graph Traversal on Real Input",
      description: "BFS and DFS from a file.",
      problemStatement:
        "Read a graph from a text file and implement BFS and DFS traversals, reporting reachable nodes and the shortest hop count from a source.",
      requirements: [
        "Adjacency list built from parsed input",
        "Handles disconnected components",
        "BFS returns shortest hop distances",
        "Input format documented in the README",
      ],
      outcome: "A traversal tool that works on real input files.",
      minutes: 75,
    },
    {
      title: "Profile and Optimise a Hot Loop",
      description: "Measure before you optimise.",
      problemStatement:
        "Take a slow function, measure it, make one targeted optimisation, and record the before/after timings honestly.",
      requirements: [
        "Baseline timing recorded",
        "Exactly one change per measurement",
        "Output verified identical after optimisation",
        "Results written into the README",
      ],
      outcome: "A measured speedup with evidence.",
      minutes: 60,
    },
  ],
  javascript: [
    {
      title: "DOM Component Without a Framework",
      description: "Know what React does for you.",
      problemStatement:
        "Build an interactive tabs component with plain JavaScript: keyboard navigation, ARIA attributes and no library.",
      requirements: [
        "Arrow keys move between tabs",
        "Correct role, aria-selected and aria-controls",
        "Only the active panel is visible",
        "No console errors on rapid clicking",
      ],
      outcome: "An accessible vanilla component you understand fully.",
      minutes: 55,
    },
    {
      title: "Async Patterns Under Pressure",
      description: "Promises, races and cancellation.",
      problemStatement:
        "Build a search box that fetches results as you type, debounces input, cancels stale requests, and never shows out-of-order results.",
      requirements: [
        "Debounce of at least 250ms",
        "Stale requests aborted with AbortController",
        "Latest query always wins",
        "Loading and empty states handled",
      ],
      outcome: "A search input that behaves correctly on a slow network.",
      minutes: 65,
    },
    {
      title: "Array Methods Instead of Loops",
      description: "Transform data, don't mutate it.",
      problemStatement:
        "Given a raw dataset, produce three derived views (grouped, sorted, aggregated) using pure functions and no mutation.",
      requirements: [
        "No input array mutated",
        "Each view built by a named pure function",
        "Results verified with sample assertions",
        "Reduce used at least once, deliberately",
      ],
      outcome: "A small data-transform module with tests.",
      minutes: 50,
    },
    {
      title: "LocalStorage-Backed Mini App",
      description: "State that survives a refresh.",
      problemStatement:
        "Build a small app (notes, habits or bookmarks) that persists to localStorage, handles corrupt data, and works offline.",
      requirements: [
        "Data survives reload",
        "Corrupt storage falls back to defaults",
        "Add, edit and delete all work",
        "Empty state guides the first action",
      ],
      outcome: "A deployed mini app with persistent state.",
      minutes: 60,
    },
    {
      title: "Ship a Browser Utility",
      description: "Small tool, real usefulness.",
      problemStatement:
        "Build and deploy a single-purpose browser tool — a converter, formatter or generator — with copy-to-clipboard and shareable state in the URL.",
      requirements: [
        "State encoded in the query string",
        "Copy button with confirmation feedback",
        "Works on mobile keyboards",
        "Deployed to a public URL",
      ],
      outcome: "A live tool you can share in one link.",
      minutes: 65,
    },
  ],
  aiml: [
    {
      title: "Baseline Model, Honest Metrics",
      description: "Start simple, measure properly.",
      problemStatement:
        "Pick a small dataset, train a simple baseline model, and report accuracy plus one metric that exposes its weakness (confusion matrix, precision/recall).",
      requirements: [
        "Train/test split done before any tuning",
        "Baseline compared against a naive predictor",
        "Metrics reported, including failure cases",
        "Notebook or script committed and runnable",
      ],
      outcome: "A reproducible baseline with honest numbers.",
      minutes: 70,
    },
    {
      title: "Feature Engineering Round",
      description: "Better inputs beat bigger models.",
      problemStatement:
        "Improve your baseline by engineering three new features, measuring the effect of each one separately.",
      requirements: [
        "One feature added per measurement",
        "Effect of each feature recorded",
        "No leakage from the target variable",
        "Final comparison table in the README",
      ],
      outcome: "A measured improvement you can explain.",
      minutes: 65,
    },
    {
      title: "Build an LLM-Powered Feature",
      description: "Applied AI, not a demo toy.",
      problemStatement:
        "Add an AI feature to an app — summarising, classifying or extracting — with prompt handling, retries and a graceful fallback when the model fails.",
      requirements: [
        "API key read from environment, never committed",
        "Timeout and retry handling",
        "Fallback UI when the model is unavailable",
        "Output validated before it is displayed",
      ],
      outcome: "A shipped AI feature that fails safely.",
      minutes: 75,
    },
    {
      title: "Embeddings and Semantic Search",
      description: "Search that understands meaning.",
      problemStatement:
        "Embed a small document set, build similarity search over it, and compare results against keyword search on five real queries.",
      requirements: [
        "Embeddings cached, not recomputed each run",
        "Top-k similarity implemented correctly",
        "Side-by-side comparison with keyword search",
        "Findings written up honestly",
      ],
      outcome: "A working semantic search prototype.",
      minutes: 80,
    },
    {
      title: "Evaluate Before You Ship",
      description: "A tiny eval suite beats a vibe check.",
      problemStatement:
        "Create an evaluation set of at least 20 cases for your model or prompt, score it automatically, and record the pass rate.",
      requirements: [
        "20+ cases including known hard ones",
        "Automatic scoring script",
        "Pass rate recorded per run",
        "Regressions visible between runs",
      ],
      outcome: "An eval suite that catches regressions.",
      minutes: 70,
    },
  ],
};

const difficultyForDay = (day: number) =>
  day <= 15 ? "Beginner" : day <= 40 ? "Intermediate" : "Advanced";

const xpForDay = (day: number) => (day <= 15 ? 100 : day <= 40 ? 150 : 200);

const checklistFor = (requirements: string[]) => [
  { id: "read", label: "Read the problem statement" },
  ...requirements.slice(0, 2).map((r, i) => ({ id: `req-${i}`, label: r })),
  { id: "commit", label: "Commit your work to GitHub" },
  { id: "deploy", label: "Deploy or record the result" },
];

const resourcesFor = (track: Track) => [
  { label: `${track.name} docs & references`, url: "https://developer.mozilla.org/" },
  { label: "Git basics: commit early, commit often", url: "https://git-scm.com/doc" },
  { label: "How to write a good README", url: "https://www.makeareadme.com/" },
];

export function getChallenge(trackId: TrackId, day: number): TrackChallenge {
  const track = trackById(trackId);
  const list = briefs[trackId];
  const brief = list[(day - 1) % list.length]!;
  const round = Math.floor((day - 1) / list.length);

  return {
    id: `${trackId}-${day}`,
    trackId,
    day,
    totalDays: TOTAL_DAYS,
    title: round === 0 ? brief.title : `${brief.title} — Level ${round + 1}`,
    description: brief.description,
    track: track.name,
    skills: track.skills,
    difficulty: difficultyForDay(day),
    minutes: brief.minutes + round * 10,
    problemStatement: brief.problemStatement,
    requirements: brief.requirements,
    outcome: brief.outcome,
    resources: resourcesFor(track),
    checklist: checklistFor(brief.requirements),
    xp: xpForDay(day),
  };
}

export function getTrackChallenges(trackId: TrackId): TrackChallenge[] {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => getChallenge(trackId, i + 1));
}

export const XP_CHALLENGE = 100;
export const XP_PROOF = 50;
export const XP_STREAK_BONUS = 200;
