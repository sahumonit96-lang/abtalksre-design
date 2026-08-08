import { useEffect, useState } from "react";

const KEY = "abtalks:scratchpad:day12";
const MAX = 500;

export function Scratchpad() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored) setNote(stored);
  }, []);

  const save = () => {
    window.localStorage.setItem(KEY, note);
    setSaved(true);
  };

  return (
    <section className="card-surface p-5">
      <h2 className="text-[11px] font-bold tracking-widest text-muted-foreground">
        DEVELOPER SCRATCHPAD
      </h2>
      <label htmlFor="scratchpad" className="mt-3 block text-sm font-semibold">
        What did you build today?
      </label>
      <textarea
        id="scratchpad"
        value={note}
        maxLength={MAX}
        rows={4}
        onChange={(e) => {
          setNote(e.target.value);
          setSaved(false);
        }}
        placeholder="Today I shipped…"
        className="mt-2 block w-full resize-y rounded-xl border border-input bg-elevated p-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus-visible:border-primary"
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {note.length} / {MAX}
        </p>
        <button
          type="button"
          onClick={save}
          className="min-h-11 shrink-0 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform active:scale-[0.97]"
        >
          Save Note
        </button>
      </div>
      {saved && (
        <p className="animate-fade-up mt-3 text-sm font-semibold text-success" role="status">
          ✓ Saved locally
        </p>
      )}
    </section>
  );
}