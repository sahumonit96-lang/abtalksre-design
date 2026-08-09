import { Check } from "lucide-react";
import { toast } from "sonner";
import { tracks } from "@/data/tracks";
import { useAppState } from "@/state/AppState";
import type { TrackId } from "@/data/types";

export function TrackPicker({ onSelected }: { onSelected?: (id: TrackId) => void }) {
  const { trackId, setTrack, daysCompleted, totalDays } = useAppState();

  const choose = (id: TrackId) => {
    setTrack(id);
    const name = tracks.find((t) => t.id === id)?.name ?? "track";
    toast.success(`Track set to ${name}`, { description: "Your daily challenges updated." });
    onSelected?.(id);
  };

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tracks.map((t) => {
        const active = t.id === trackId;
        return (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => choose(t.id)}
              aria-pressed={active}
              className={`flex h-full w-full flex-col items-start rounded-2xl border p-5 text-left transition-colors ${
                active
                  ? "border-primary bg-primary-soft shadow-glow"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <span className="text-2xl" aria-hidden="true">
                  {t.icon}
                </span>
                {active && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold tracking-widest text-primary-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} /> ACTIVE
                  </span>
                )}
              </div>
              <p className="mt-3 text-base font-extrabold tracking-tight">{t.name}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {t.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border px-2.5 py-1 text-[10px] font-bold tracking-widest text-muted-foreground"
                  >
                    {s.toUpperCase()}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11px] font-bold tracking-widest text-muted-foreground">
                {active ? `${daysCompleted} / ${totalDays} DAYS DONE` : `${totalDays} DAY PROGRAM`}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
