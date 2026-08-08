import { Link } from "@tanstack/react-router";
import { Home, BarChart3, User } from "lucide-react";

const items = [
  { to: "/dashboard", label: "HOME", icon: Home },
  { to: "/progress", label: "PROGRESS", icon: BarChart3 },
  { to: "/profile", label: "PROFILE", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur"
    >
      <ul className="mx-auto grid w-full max-w-md grid-cols-3">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={label}>
            <Link
              to={to}
              className="flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[10px] font-bold tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}