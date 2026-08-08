import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function EmptyState({
  title,
  detail,
  action,
}: {
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <div className="card-surface p-8 text-center">
      <h3 className="text-base font-extrabold tracking-tight">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{detail}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-surface animate-pulse p-5">
      <div className="h-3 w-24 rounded-full bg-elevated" />
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-3 rounded-full bg-elevated" style={{ width: `${90 - i * 18}%` }} />
        ))}
      </div>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-destructive/40 bg-card p-6 text-center">
      <h3 className="text-sm font-extrabold tracking-tight">Something went wrong</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
      >
        Try again
      </button>
    </div>
  );
}

export function GithubDisconnectedNotice() {
  return (
    <div className="rounded-2xl border border-primary/25 bg-card p-5">
      <p className="text-sm font-bold">Connect GitHub to verify your building activity.</p>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Verification reads commit activity only. ABTalks never writes to your repositories.
      </p>
      <Link
        to="/settings"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-elevated px-4 text-sm font-bold transition-colors hover:border-primary/40"
      >
        Connect GitHub
      </Link>
    </div>
  );
}