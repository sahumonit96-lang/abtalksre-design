import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CURRENT_DAY, TOTAL_DAYS, STREAK } from "@/data/mockData";

const cta =
  "mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-primary/40 bg-primary-soft px-4 text-sm font-bold text-primary transition-transform active:scale-[0.98]";

export function RecoveryCard() {
  return (
    <section className="rounded-2xl border border-flame/30 bg-flame/5 p-5">
      <h2 className="text-[11px] font-bold tracking-widest text-flame">MISSED YESTERDAY?</h2>
      <p className="mt-3 text-sm font-semibold">
        No worries. Your 60-day journey is still here.
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        You completed {STREAK} days. Let&apos;s keep building.
      </p>
      <Link to="/day/$day" params={{ day: String(CURRENT_DAY) }} className={cta}>
        Continue Day {CURRENT_DAY} <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

export function FirstDayCard() {
  return (
    <section className="card-surface p-5">
      <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">YOUR FIRST DAY</h2>
      <p className="mt-3 text-sm font-semibold">Every streak starts with one.</p>
      <p className="mt-1 text-sm text-muted-foreground">0 / {TOTAL_DAYS} challenges complete</p>
      <Link to="/day/$day" params={{ day: "1" }} className={cta}>
        Start Day 1 <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

export function EmptyProfileCard() {
  return (
    <section className="card-surface p-6 text-center">
      <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
        NO PROJECTS YET
      </h2>
      <p className="mt-3 text-sm text-muted-foreground">
        Your builds will appear here as you complete challenges.
      </p>
      <Link to="/day/$day" params={{ day: String(CURRENT_DAY) }} className={cta}>
        Start Building <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}