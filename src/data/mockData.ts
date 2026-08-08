export type DayStatus = "completed" | "today" | "upcoming" | "missed";

export const CURRENT_DAY = 12;
export const TOTAL_DAYS = 60;
export const STREAK = 11;
export const TRACK = "Web Development";
export const USER_NAME = "Monit";

const missedDays = [7];

export const days: { day: number; status: DayStatus }[] = Array.from(
  { length: TOTAL_DAYS },
  (_, i) => {
    const day = i + 1;
    let status: DayStatus = "upcoming";
    if (day === CURRENT_DAY) status = "today";
    else if (missedDays.includes(day)) status = "missed";
    else if (day < CURRENT_DAY) status = "completed";
    return { day, status };
  },
);

export const completedCount = days.filter((d) => d.status === "completed").length;
export const progressPercent = Math.round((CURRENT_DAY / TOTAL_DAYS) * 100);
export const daysRemaining = TOTAL_DAYS - CURRENT_DAY;

export const weekDays = [
  { label: "M", done: true },
  { label: "T", done: true },
  { label: "W", done: true },
  { label: "T", done: true },
  { label: "F", done: true },
  { label: "S", done: true },
  { label: "S", done: false },
];

export const achievements = [
  { icon: "✓", title: "First Commit", detail: "Day 1 shipped", unlocked: true },
  { icon: "🔥", title: "7 Day Streak", detail: "One week strong", unlocked: true },
  { icon: "💻", title: "First Project", detail: "Shipped to GitHub", unlocked: true },
  { icon: "🔒", title: "30 Day Streak", detail: "18 days to go", unlocked: false },
];

export const todayChallenge = {
  day: CURRENT_DAY,
  title: "Build a Responsive Landing Page",
  minutes: 45,
  track: TRACK,
  difficulty: "Intermediate",
  status: "IN PROGRESS",
  goal: "Build a responsive landing page from scratch with clear navigation, a strong hero section, a primary CTA, and a mobile-friendly layout.",
  requirements: [
    { id: "nav", title: "Navigation", detail: "Create a clear path through the page." },
    { id: "hero", title: "Hero section", detail: "Create a strong visual introduction." },
    { id: "cta", title: "Primary CTA", detail: "Add a clear call-to-action." },
    {
      id: "responsive",
      title: "Responsive layout",
      detail: "Make the experience work across screen sizes.",
    },
    { id: "footer", title: "Footer", detail: "Finish the page with useful links." },
  ],
};

export const howItWorks = [
  { step: "01", title: "PICK A TRACK", detail: "Choose the skill you want to compound daily." },
  { step: "02", title: "BUILD DAILY", detail: "One focused challenge, every single day." },
  { step: "03", title: "SUBMIT PROOF", detail: "Ship to GitHub, share it on LinkedIn." },
  { step: "04", title: "COMPLETE 60 DAYS", detail: "Walk away with real proof of work." },
];

export const whyABTalks = [
  { title: "CONSISTENCY", detail: "Build the habit." },
  { title: "PORTFOLIO", detail: "Create real proof of your skills." },
  { title: "VISIBILITY", detail: "Share your progress publicly." },
];