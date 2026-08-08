import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  BarChart3,
  Flame,
  Home,
  Menu,
  Rss,
  Settings,
  Target,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { useAppState } from "@/state/AppState";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/challenge", label: "Today's Challenge", icon: Target },
  { to: "/proof", label: "My Proof", icon: BadgeCheck },
  { to: "/projects", label: "Projects", icon: BarChart3 },
  { to: "/builders", label: "Builders", icon: Users },
  { to: "/feed", label: "Feed", icon: Rss },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const mobileItems = [
  { to: "/dashboard", label: "HOME", icon: Home },
  { to: "/challenge", label: "TODAY", icon: Target },
  { to: "/proof", label: "PROOF", icon: BadgeCheck },
  { to: "/leaderboard", label: "RANKS", icon: Trophy },
  { to: "/profile", label: "YOU", icon: User },
] as const;

function Brand() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-2">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-extrabold text-primary">
        AB
      </span>
      <span className="truncate text-base font-extrabold tracking-tight">ABTalks</span>
    </Link>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="space-y-1">
      {navItems.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <Link
            to={to}
            onClick={onNavigate}
            className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
            activeProps={{ className: "bg-primary-soft text-primary hover:text-primary" }}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function AppShell({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const { currentDay, totalDays, streak, user } = useAppState();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
        <Brand />
        <nav aria-label="Main" className="mt-8 flex-1 overflow-y-auto">
          <NavList />
        </nav>
        <p className="mt-4 border-t border-border pt-4 text-[10px] font-bold tracking-widest text-muted-foreground">
          BUILD · VERIFY · PROVE
        </p>
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur"
          />
          <div className="animate-fade-up absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-border bg-card px-4 py-6">
            <div className="flex items-center justify-between gap-3">
              <Brand />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav aria-label="Main" className="mt-6 flex-1 overflow-y-auto">
              <NavList onNavigate={() => setMenuOpen(false)} />
            </nav>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="hidden lg:block" />
            <p className="min-w-0 truncate text-[11px] font-bold tracking-widest text-muted-foreground">
              {title ? title.toUpperCase() : `DAY ${currentDay} OF ${totalDays}`}
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary sm:inline-flex">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" /> {streak}
              </span>
              <Link
                to="/profile"
                aria-label="Your profile"
                className="grid h-9 w-9 place-items-center rounded-full bg-elevated text-sm font-extrabold text-primary transition-colors hover:bg-primary-soft"
              >
                {user.avatarInitials}
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-16">
          {children}
        </main>

        <nav
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden"
        >
          <ul className="mx-auto grid w-full max-w-lg grid-cols-5">
            {mobileItems.map(({ to, label, icon: Icon }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[9px] font-bold tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-primary" }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}