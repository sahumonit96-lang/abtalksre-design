import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const githubOk = (v: string) => /^https:\/\/github\.com\/.+/.test(v.trim());
const linkedinOk = (v: string) => /^https:\/\/(www\.)?linkedin\.com\/.+/.test(v.trim());

export function ProofForm({ onSuccess }: { onSuccess: () => void }) {
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const githubError = submitted && !githubOk(github) ? "Enter a valid GitHub URL." : "";
  const linkedinError = submitted && !linkedinOk(linkedin) ? "Enter a valid LinkedIn post URL." : "";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (githubOk(github) && linkedinOk(linkedin)) onSuccess();
  };

  const inputClass =
    "mt-2 block w-full min-w-0 rounded-xl border border-input bg-elevated px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:border-primary";

  return (
    <section className="card-surface p-5">
      <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">PROOF OF WORK</h2>
      <form onSubmit={submit} noValidate className="mt-4 space-y-5">
        <div>
          <label htmlFor="github" className="text-sm font-bold">
            GitHub
          </label>
          <input
            id="github"
            type="url"
            inputMode="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="Paste your repository or commit URL"
            aria-invalid={Boolean(githubError)}
            aria-describedby={githubError ? "github-error" : undefined}
            className={inputClass}
          />
          {githubError && (
            <p id="github-error" className="mt-2 text-xs font-semibold text-destructive">
              {githubError}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="linkedin" className="text-sm font-bold">
            LinkedIn
          </label>
          <input
            id="linkedin"
            type="url"
            inputMode="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Paste your LinkedIn post URL"
            aria-invalid={Boolean(linkedinError)}
            aria-describedby={linkedinError ? "linkedin-error" : undefined}
            className={inputClass}
          />
          {linkedinError && (
            <p id="linkedin-error" className="mt-2 text-xs font-semibold text-destructive">
              {linkedinError}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Submit Today&apos;s Proof
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}