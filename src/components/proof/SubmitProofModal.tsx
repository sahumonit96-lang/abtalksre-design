import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, BadgeCheck, Check, Flame, ImagePlus, Loader2, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAppState, type SubmitResult } from "@/state/AppState";
import type { Proof } from "@/data/types";
import { ProofCard } from "./ProofCard";

type Stage = "form" | "saving" | "result" | "card";

const githubOk = (v: string) => /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(v.trim());
const urlOk = (v: string) => /^https?:\/\/[^\s.]+\.[^\s]+$/.test(v.trim());

export function SubmitProofModal({
  open,
  onClose,
  day,
}: {
  open: boolean;
  onClose: () => void;
  day?: number;
}) {
  const {
    currentDay,
    totalDays,
    streak,
    xp,
    submitProof,
    challengeForDay,
    isDayCompleted,
    proofs,
  } = useAppState();
  const targetDay = day ?? currentDay;
  const challenge = challengeForDay(targetDay);
  const alreadyDone = isDayCompleted(targetDay);

  const [stage, setStage] = useState<Stage>("form");
  const [title, setTitle] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const existing = useMemo(
    () => proofs.find((p) => p.day === targetDay) ?? null,
    [proofs, targetDay],
  );

  useEffect(() => {
    if (!open) return;
    setStage(alreadyDone ? "card" : "form");
    setTouched(false);
    setTitle(challenge.title);
    setSummary("");
    setRepoUrl("");
    setDeploymentUrl("");
    setScreenshot(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, targetDay]);

  if (!open) return null;

  const titleError = touched && title.trim().length < 3 ? "Tell us what you built." : "";
  const repoError = touched && !githubOk(repoUrl) ? "Enter a valid GitHub repository URL." : "";
  const deployError =
    touched && deploymentUrl.trim() && !urlOk(deploymentUrl) ? "Enter a valid live URL." : "";
  const summaryError =
    touched && summary.trim().length < 10 ? "Add a short description (10+ characters)." : "";
  const valid =
    title.trim().length >= 3 &&
    githubOk(repoUrl) &&
    (!deploymentUrl.trim() || urlOk(deploymentUrl)) &&
    summary.trim().length >= 10;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setStage("saving");
    await new Promise((r) => window.setTimeout(r, 700));
    const res = submitProof({
      title: title.trim(),
      summary: summary.trim(),
      repoUrl: repoUrl.trim(),
      deploymentUrl: deploymentUrl.trim(),
      day: targetDay,
    });
    setResult(res);
    setStage("result");

    toast.success(`Proof submitted · Day ${targetDay} complete`, {
      description: `+${res.xpEarned} XP · streak now ${res.streak} days 🔥`,
    });
    res.unlocked.forEach((a) =>
      toast(`🏆 Achievement unlocked: ${a.title}`, { description: a.detail }),
    );
  };

  const inputClass =
    "mt-2 block w-full min-w-0 rounded-xl border border-input bg-elevated px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:border-primary";

  const cardProof: Proof | null =
    existing ??
    (stage === "result"
      ? {
          id: "preview",
          day: targetDay,
          title,
          summary,
          repoUrl,
          deploymentUrl,
          date: new Date().toISOString().slice(0, 10),
          verified: false,
          checks: [],
          streakAtSubmission: streak,
          kind: "project",
        }
      : null);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-background/85 backdrop-blur"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="proof-modal-title"
        tabIndex={-1}
        className="animate-fade-up relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-border bg-card p-5 shadow-glow sm:rounded-3xl sm:p-6"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <h2 id="proof-modal-title" className="min-w-0 text-lg font-extrabold tracking-tight">
            {stage === "form" && `Submit proof · Day ${targetDay}`}
            {stage === "saving" && "Saving your proof"}
            {stage === "result" && `Day ${targetDay} complete`}
            {stage === "card" && "Your proof card"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {stage === "form" && (
          <form onSubmit={submit} noValidate className="mt-5 space-y-5">
            <p className="text-sm text-muted-foreground">{challenge.title}</p>
            <div>
              <label htmlFor="proof-title" className="text-sm font-bold">
                What did you build?
              </label>
              <input
                id="proof-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Responsive portfolio card"
                aria-invalid={Boolean(titleError)}
                aria-describedby={titleError ? "proof-title-error" : undefined}
                className={inputClass}
              />
              {titleError && (
                <p id="proof-title-error" className="mt-2 text-xs font-semibold text-destructive">
                  {titleError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="proof-repo" className="text-sm font-bold">
                GitHub repository URL
              </label>
              <input
                id="proof-repo"
                type="url"
                inputMode="url"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/you/project"
                aria-invalid={Boolean(repoError)}
                aria-describedby={repoError ? "proof-repo-error" : undefined}
                className={inputClass}
              />
              {repoError && (
                <p id="proof-repo-error" className="mt-2 text-xs font-semibold text-destructive">
                  {repoError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="proof-deploy" className="text-sm font-bold">
                Live project URL <span className="text-muted-foreground">(optional)</span>
              </label>
              <input
                id="proof-deploy"
                type="url"
                inputMode="url"
                value={deploymentUrl}
                onChange={(e) => setDeploymentUrl(e.target.value)}
                placeholder="https://your-project.vercel.app"
                aria-invalid={Boolean(deployError)}
                aria-describedby={deployError ? "proof-deploy-error" : undefined}
                className={inputClass}
              />
              {deployError && (
                <p id="proof-deploy-error" className="mt-2 text-xs font-semibold text-destructive">
                  {deployError}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="proof-summary" className="text-sm font-bold">
                Short description
              </label>
              <textarea
                id="proof-summary"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="What you built today and what you learned."
                aria-invalid={Boolean(summaryError)}
                aria-describedby={summaryError ? "proof-summary-error" : undefined}
                className={`${inputClass} resize-y`}
              />
              {summaryError && (
                <p id="proof-summary-error" className="mt-2 text-xs font-semibold text-destructive">
                  {summaryError}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-bold">Screenshot</p>
              <label
                htmlFor="proof-screenshot"
                className="mt-2 flex min-h-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-input bg-elevated p-4 text-center text-xs text-muted-foreground transition-colors hover:border-primary/50"
              >
                <ImagePlus className="h-5 w-5 text-primary" aria-hidden="true" />
                {screenshot ? (
                  <span className="max-w-full truncate font-semibold text-foreground">
                    {screenshot}
                  </span>
                ) : (
                  <span>Attach a screenshot (stored locally in this demo)</span>
                )}
              </label>
              <input
                id="proof-screenshot"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => setScreenshot(e.target.files?.[0]?.name ?? null)}
              />
            </div>
            <p className="rounded-xl border border-border bg-elevated p-3 text-xs text-muted-foreground">
              Links are recorded as your proof of work. ABTalks does not inspect your repository in
              this demo — GitHub verification is added when the integration is connected.
            </p>
            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              Submit proof <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {stage === "saving" && (
          <div className="mt-8 flex flex-col items-center py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold">Recording your proof…</p>
            <p className="mt-1 text-xs text-muted-foreground">Updating streak, XP and progress.</p>
          </div>
        )}

        {stage === "result" && result && (
          <div className="mt-5">
            <div className="rounded-2xl border border-primary/30 bg-elevated p-5 text-center">
              <p className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" /> DAY {targetDay} COMPLETE
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="flex items-center justify-center gap-1.5 text-lg font-extrabold text-primary">
                    <Zap className="h-4 w-4" aria-hidden="true" /> +{result.xpEarned}
                  </p>
                  <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground">
                    XP EARNED
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="flex items-center justify-center gap-1.5 text-lg font-extrabold text-flame">
                    <Flame className="h-4 w-4" aria-hidden="true" /> {result.streak}
                  </p>
                  <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground">
                    DAY STREAK
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Total XP {xp}</p>
            </div>

            {result.unlocked.length > 0 && (
              <ul className="mt-4 space-y-2">
                {result.unlocked.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-primary-soft p-3 text-sm font-bold text-primary"
                  >
                    <span aria-hidden="true">{a.icon}</span>
                    <span className="min-w-0 truncate">Achievement unlocked · {a.title}</span>
                  </li>
                ))}
              </ul>
            )}

            <ul className="mt-4 space-y-2">
              {["Challenge marked complete", "Progress updated", "Leaderboard updated"].map((l) => (
                <li key={l} className="flex items-center gap-2.5 text-sm font-semibold">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="min-w-0 truncate">{l}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setStage("card")}
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              Generate proof card <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {stage === "card" && cardProof && (
          <div className="mt-5">
            <ProofCard proof={cardProof} totalDays={totalDays} streak={streak} />
            <button
              type="button"
              onClick={onClose}
              className="mt-3 flex min-h-11 w-full items-center justify-center rounded-xl border border-border bg-card px-4 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
            >
              Done
            </button>
          </div>
        )}

        {stage === "card" && !cardProof && (
          <p className="mt-6 text-sm text-muted-foreground">No proof recorded for this day yet.</p>
        )}
      </div>
    </div>
  );
}
