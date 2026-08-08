import { Check } from "lucide-react";
import { todayChallenge } from "@/data/mockData";

export function Checklist({
  done,
  onToggle,
}: {
  done: string[];
  onToggle: (id: string) => void;
}) {
  const total = todayChallenge.requirements.length;
  const complete = done.length === total;

  return (
    <section className="card-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
          WHAT TO BUILD
        </h2>
        <p className="shrink-0 text-sm font-extrabold text-primary">
          {done.length}/{total}
        </p>
      </div>
      <ul className="mt-4 space-y-2">
        {todayChallenge.requirements.map((r) => {
          const checked = done.includes(r.id);
          return (
            <li key={r.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-elevated p-3 transition-colors hover:border-primary/40">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(r.id)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary ${
                    checked
                      ? "animate-pop border-primary bg-primary text-primary-foreground"
                      : "border-input bg-card"
                  }`}
                >
                  {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-bold ${checked ? "text-muted-foreground line-through" : ""}`}
                  >
                    {r.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{r.detail}</span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      {complete && (
        <p
          className="animate-fade-up mt-4 rounded-xl bg-primary-soft p-3 text-sm font-bold text-primary"
          role="status"
        >
          All requirements complete 🎉
        </p>
      )}
    </section>
  );
}