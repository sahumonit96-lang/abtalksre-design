import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary-soft text-sm font-extrabold text-primary">
            AB
          </span>
          <span className="truncate text-base font-extrabold tracking-tight">ABTalks</span>
        </Link>
        <span className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground">
          For college builders
        </span>
      </nav>
    </header>
  );
}