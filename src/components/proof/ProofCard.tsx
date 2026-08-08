import { useState } from "react";
import { BadgeCheck, Check, Copy, Flame, Linkedin } from "lucide-react";
import type { Proof } from "@/data/types";

/** Shareable, screenshot-ready proof card. */
export function ProofCard({
  proof,
  totalDays,
  streak,
  compact = false,
}: {
  proof: Proof;
  totalDays: number;
  streak: number;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const proofLink = `https://abtalks.app/p/${proof.id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(proofLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const shareText = `Day ${proof.day}/${totalDays} of my 60-day build challenge — ${proof.title}. Verified on ABTalks.`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    proofLink,
  )}&summary=${encodeURIComponent(shareText)}`;

  return (
    <div className="w-full min-w-0">
      <article className="relative overflow-hidden rounded-3xl border border-primary/25 bg-card p-5 shadow-glow sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
        />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground">ABTALKS</p>
            <p className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
              DAY {proof.day} <span className="text-muted-foreground">/ {totalDays}</span>
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-[10px] font-bold tracking-widest text-primary">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" /> VERIFIED BUILD
          </span>
        </div>

        <h3 className="relative mt-5 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
          {proof.title}
        </h3>
        {!compact && proof.summary && (
          <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
            {proof.summary}
          </p>
        )}

        <ul className="relative mt-5 space-y-2">
          {["GitHub commit", "Live deployment", "Daily progress"].map((label) => (
            <li key={label} className="flex items-center gap-2 text-sm font-semibold">
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span className="truncate">{label}</span>
            </li>
          ))}
        </ul>

        <div className="relative mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border pt-5">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-extrabold text-flame">
              <Flame className="h-4 w-4 shrink-0" aria-hidden="true" /> {streak} DAY STREAK
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {proof.day} / {totalDays} days
            </p>
          </div>
          <p className="shrink-0 text-[10px] font-bold tracking-widest text-muted-foreground">
            BUILT IN PUBLIC.
          </p>
        </div>

        <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-elevated">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${Math.round((proof.day / totalDays) * 100)}%` }}
          />
        </div>
      </article>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={linkedInHref}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" /> Share on LinkedIn
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-4 text-sm font-bold transition-colors hover:border-primary/40"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? "Link copied" : "Copy proof link"}
        </button>
      </div>
    </div>
  );
}