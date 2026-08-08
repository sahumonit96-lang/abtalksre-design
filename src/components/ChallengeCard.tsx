import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { todayChallenge } from "@/data/mockData";

export function ChallengeCard() {
  return (
    <Link
      to="/day/$day"
      params={{ day: String(todayChallenge.day) }}
      className="group block rounded-2xl border border-primary/25 bg-elevated p-5 shadow-glow transition-transform active:scale-[0.99]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold tracking-widest text-primary">TODAY&apos;S CHALLENGE</p>
        <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] font-bold tracking-widest text-muted-foreground">
          DAY {todayChallenge.day}
        </span>
      </div>
      <h2 className="mt-3 text-xl font-extrabold leading-snug tracking-tight">
        {todayChallenge.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {todayChallenge.minutes} min · {todayChallenge.track}
      </p>
      <p className="mt-3 inline-flex rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary">
        {todayChallenge.status}
      </p>
      <span className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground">
        Continue Challenge
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}