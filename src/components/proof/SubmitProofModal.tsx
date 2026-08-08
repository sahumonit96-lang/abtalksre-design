import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, BadgeCheck, Check, Flame, Loader2, X } from "lucide-react";
import { verifyDailyActivity } from "@/services/github";
import { useAppState } from "@/state/AppState";
import type { Proof, VerificationCheck } from "@/data/types";
import { ProofCard } from "./ProofCard";

type Stage = "form" | "verifying" | "result" | "card";

const githubOk = (v: string) => /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(v.trim());
const urlOk = (v: string) => /^https?:\/\/[^\s.]+\.[^\s]+$/.test(v.trim());

function StreakCounter({ from, to }: { from: number; to: number }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (to <= from) {
      setValue(to);
      return;
    }
    let current = from;
    const id = window.setInterval(() => {
      current += 1;
      setValue(current);
      if (current >= to) window.clearInterval(id);
    }, 320);
    return () => window.clearInterval(id);
  }, [from, to]);

  return (
    <span key={value} className="animate-pop inline-flex items-center gap-1.5 text-flame">
      <Flame className="h-5 w-5" aria-hidden="true" /> {value} DAY STREAK
    </span>
  );
}

export function SubmitProofModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { currentDay, totalDays, streak, addProof, challenge, todaySubmitted, proofs } =
    useAppState();
  const [stage, setStage] = useState<Stage>("form");
  const [title, setTitle] = useState("AI Resume Analyzer");
  const [repoUrl, setRepoUrl] = useState("https://github.com/monitbuilds/ai-resume-analyzer");
  const [deploymentUrl, setDeploymentUrl] = useState("https://ai-resume-analyzer-demo.vercel.app");
  const [summary, setSummary] = useState(
    "Added a per-section score breakdown and shipped it to production.",
  );
  const [touched, setTouched] = useState(false);
  const [checks, setChecks] = useState<VerificationCheck[]>([]);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  const existing = useMemo(
    () => proofs.find((p) => p.day === currentDay) ?? null,
    [proofs, currentDay],
  );

  useEffect(() => {
    if (!open) return;
    setStage(todaySubmitted ? "card" : "form");
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
  }, [open, onClose, todaySubmitted]);

  if (!open) return null;

  const titleError = touched && title.trim().length < 3 ? "Tell us what you built." : "";
  const repoError = touched && !githubOk(repoUrl) ? "Enter a valid GitHub repository URL." : "";
  const deployError = touched && !urlOk(deploymentUrl) ? "Enter a valid deployment URL." : "";
  const summaryError = touched && summary.trim().length < 10 ? "Add a short summary (10+ chars)." : "";
  const valid =
    title.trim().length >= 3 &&
    githubOk(repoUrl) &&
    urlOk(deploymentUrl) &&
    summary.trim().length >= 10;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    setError("");
    setStage("verifying");
    try {
      const result = await verifyDailyActivity({ repoUrl, deploymentUrl });
      setChecks(result.checks);
      if (result.checks.some((c) => !c.passed)) {
        setError("We couldn't verify that activity. Check your links and try again.");
        setStage("form");
        return;
      }
      const proof: Proof = {
        id: `p-${currentDay}-${Date.now()}`,
        day: currentDay,
        title: title.trim(),
        summary: summary.trim(),
        repoUrl: repoUrl.trim(),
        deploymentUrl: deploymentUrl.trim(),
        date: new Date().toISOString().slice(0, 10),
        verified: true,
        checks: result.checks,
        streakAtSubmission: streak + 1,
        kind: "project",
      };
      addProof(proof);
      setStage("result");
    } catch {
      setError("Verification service unavailable. Please retry.");
      setStage("form");
    }
  };

  const inputClass =
    "mt-2 block w-full min-w-0 rounded-xl border border-input bg-elevated px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:border-primary";

  const cardProof: Proof | null =
    existing ??
    (stage === "result"
      ? {
          id: "preview",
          day: currentDay,
          title,
          summary,
          repoUrl,
          deploymentUrl,
          date: new Date().toISOString().slice(0, 10),
          verified: true,
          checks,
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
            {stage === "form" && "Prove today's work"}
            {stage === "verifying" && "Verifying your build"}
            {stage === "result" && `Day ${currentDay} verified`}
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
            <p className="text-sm text-muted-foreground">
              Day {currentDay} · {challenge.title}
            </p>
            <div>
              <label htmlFor="proof-title" className="text-sm font-bold">
                What did you build?
              </label>
              <input
                id="proof-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="AI Resume Analyzer"
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
                GitHub repository
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
                Live deployment
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
                What changed today?
              </label>
              <textarea
                id="proof-summary"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Shipped the score breakdown and fixed empty-state handling."
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
            {error && <p className="text-xs font-semibold text-destructive">{error}</p>}
            <button
              type="submit"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              Verify my work <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

        {stage === "verifying" && (
          <div className="mt-8 flex flex-col items-center py-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold">Checking commit activity and deployment…</p>
            <p className="mt-1 text-xs text-muted-foreground">This takes a moment.</p>
          </div>
        )}

        {stage === "result" && (
          <div className="mt-5">
            <ul className="space-y-2.5">
              {checks.map((c, i) => (
                <li
                  key={c.id}
                  className="animate-fade-up flex items-center gap-2.5 text-sm font-semibold"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="min-w-0 truncate">{c.label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-primary/30 bg-elevated p-5 text-center">
              <p className="inline-flex items-center gap-2 text-sm font-extrabold tracking-widest text-primary">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" /> DAY {currentDay} VERIFIED
              </p>
              <p className="mt-3 text-lg font-extrabold tracking-tight">
                <StreakCounter from={streak - 1} to={streak} />
              </p>
            </div>
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
          <p className="mt-6 text-sm text-muted-foreground">No proof recorded for today yet.</p>
        )}
      </div>
    </div>
  );
}