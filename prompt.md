# ABTalks — AI Usage / Vibe-Coding Prompt Log

Project: ABTalks — 60-Day Build in Public Challenge
Repository: https://github.com/sahumonit96-lang/abtalksre-design

## Purpose

This file documents the prompts used during development of the ABTalks project with AI/vibe-coding tools. It is included as part of the hackathon submission to make the AI-assisted development process transparent and reproducible.

---

## Prompt 1 — Product Direction

Build a polished hackathon-ready web app called ABTalks.

ABTalks is a 60-Day Build in Public Challenge for college builders. The core loop is:

Challenge → Build → Verify → Proof → Streak → Share → Build Again

The product should help students build consistently, prove their work, and create a public portfolio of verified progress.

Use a premium developer-focused visual style:
- near-black background
- lavender/purple primary accent
- white typography
- muted gray secondary text
- dark charcoal cards
- subtle borders
- rounded corners
- generous spacing
- responsive mobile-first layout

The landing page should communicate the challenge immediately and include:
- 60-day challenge messaging
- Build every day headline
- Start the challenge CTA
- See how it works CTA
- current day/streak/progress preview

---

## Prompt 2 — Landing Page

Improve the ABTalks landing page while preserving the existing design language.

Use:

Eyebrow:
60-DAY CODING CHALLENGE · BUILD IN PUBLIC

Headline:
Build every day.
Prove your progress.

Description:
Turn 60 days of consistent building into verifiable proof of work, a public portfolio, and a reputation that compounds.

Primary CTA:
Start the challenge →

Secondary CTA:
See how it works

Show:
DAY 12 / 60
20% COMPLETE
🔥 11 DAY STREAK

Keep the page clean, premium, minimal, and suitable for a hackathon demo.

---

## Prompt 3 — Dashboard

Create a functional ABTalks dashboard.

Include:
- current streak
- days completed
- projects shipped
- leaderboard rank
- today's challenge
- recent proof
- current progress
- 60-day progress indicator

Use demo data:
Day 12 / 60
11-day streak
7 projects
Rank #18

The dashboard should feel like a real product rather than a static landing page.

---

## Prompt 4 — Daily Challenge and Proof

Create a functional Today's Challenge flow.

Show:

DAY 12
Ship something meaningful.

Checklist:
- Write/update code
- Push a GitHub commit
- Deploy work
- Share progress

Add:
Submit today's proof →

Create a proof submission modal/form with:
- What did you build?
- GitHub repository URL
- Live deployment URL
- What changed today?

After submission show:
✓ GitHub activity detected
✓ Repository active
✓ Deployment available
✓ Daily progress recorded

Then display:
DAY 12 VERIFIED
🔥 12 DAY STREAK

For the hackathon demo, use mock verification so the complete flow works without external APIs. Keep the architecture ready for real GitHub API/OAuth integration later.

---

## Prompt 5 — Proof Card

Create a polished shareable proof card.

Content:

ABTalks
DAY 12 / 60
VERIFIED BUILD

AI Resume Analyzer

✓ GitHub commit
✓ Live deployment
✓ Daily progress

🔥 12 DAY STREAK

12 / 60 DAYS

Built in public.

Add:
- Share on LinkedIn
- Copy proof link

The proof card should be visually strong enough to demonstrate the product's core value to hackathon judges.

---

## Prompt 6 — Community Features

Create:
- Builders page
- Build in Public feed
- Leaderboard
- Public profile
- Projects page
- Achievements

Builders should show:
- name
- college
- streak
- days completed
- projects shipped

Feed posts should show:
- builder
- day/streak
- what they built
- verification status
- engagement actions

Leaderboard should support:
- Global
- College
- Friends

Profile should contain:
- avatar
- name
- college
- bio
- days completed
- current streak
- projects
- proof of work
- activity
- share profile

---

## Prompt 7 — Navigation and Routes

Make the main product navigation functional.

Routes:

/
 /dashboard
 /challenge
 /proof
 /builders
 /feed
 /leaderboard
 /profile
 /projects
 /settings

Do not leave dead buttons or broken navigation.

Create a clean responsive navigation system that works on desktop and mobile.

---

## Prompt 8 — Data Architecture

Create clean TypeScript models for:

User
Challenge
DailyProgress
Proof
Project
Builder
Post
Achievement
LeaderboardEntry

Use mock data/local state for the hackathon demo.

Create a service abstraction for future GitHub integration:

getUserProfile()
getRepositories()
getRecentCommits()
verifyDailyActivity()
getRepositoryStats()

Do not expose secrets in frontend code.

---

## Prompt 9 — Responsive Design

Make the entire ABTalks experience responsive for:

375px mobile
768px tablet
1440px desktop

On mobile:
- sidebar becomes mobile navigation
- cards stack
- dashboard remains readable
- buttons remain touch-friendly
- proof cards remain shareable
- no horizontal overflow

Preserve the existing visual identity across screen sizes.

---

## Prompt 10 — Production Readiness

Before finishing:

- fix TypeScript errors
- fix build errors
- remove lorem ipsum
- remove dead buttons
- remove console errors
- make navigation work
- validate forms
- make modals close correctly
- test mobile layouts
- keep dependencies reasonable
- do not introduce unnecessary complexity

The project must be ready for deployment.

---

## Prompt 11 — GitHub and Vercel Compatibility

Prepare the project for standard production deployment from GitHub to Vercel.

Ensure:
- package.json has a valid build script
- npm run build succeeds
- Vite/React configuration is correct
- output directory is dist for Vite
- no local-only paths are required
- no secrets are hardcoded
- environment variables are documented if required
- the app works when deployed from the GitHub main branch

After completing changes, sync/push the latest working version to the connected GitHub repository's main branch.

Do not change the repository name.
Do not remove existing working features.

---

## Prompt 12 — Final Hackathon Polish

Give ABTalks a final hackathon-quality polish.

The product should communicate one clear idea:

ABTalks makes daily building:

VISIBLE → VERIFIABLE → SHAREABLE → REWARDING

The demo flow must work end-to-end:

Landing
→ Start Challenge
→ Dashboard
→ Today's Challenge
→ Submit Proof
→ Verification
→ Streak increases
→ Proof Card
→ Leaderboard
→ Profile
→ Builders Feed

Prioritize reliability, clarity, visual polish, and a strong 2-minute judge demo over unnecessary features.

---

## Development Notes

AI-assisted development was used to accelerate:
- product ideation
- UI implementation
- component structure
- responsive design
- mock data
- user flows
- deployment preparation
- GitHub/Vercel compatibility

External APIs should remain mocked for the hackathon demo unless explicitly configured.

The intended future architecture can replace the mock GitHub verification layer with real GitHub OAuth/API verification.

---

## Final Product Principle

ABTalks is not simply a website telling students to code for 60 days.

It is a system designed to make consistent building visible, verifiable, shareable, and rewarding.
