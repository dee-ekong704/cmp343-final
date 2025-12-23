"use client";

import { useState } from "react";

const TAGS = ["Too fast", "Need examples", "Audio issues", "More practice", "Confusing topic"];

export default function SubmitPage() {
  const [className, setClassName] = useState("CMP 343");
  const [mood, setMood] = useState<"good" | "okay" | "bad">("okay");
  const [rating, setRating] = useState(3);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<string>("");

  const toggleTag = (t: string) => {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const submit = async () => {
    setStatus("Submitting...");
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        class_name: className,
        mood,
        rating,
        tags,
        comment,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setStatus(`Error: ${json.error || "Something went wrong"}`);
      return;
    }

    setStatus("✅ Submitted anonymously!");
    setComment("");
    setTags([]);
    setMood("okay");
    setRating(3);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-semibold">Real-Time Student Feedback</h1>
        <p className="mt-2 text-zinc-300">
          Submit anonymous feedback during class so the professor can adjust in real time.
        </p>

        <div className="mt-8 space-y-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <label className="block">
            <span className="text-sm text-zinc-300">Class</span>
            <input
              className="mt-1 w-full rounded-xl bg-black border border-zinc-800 px-3 py-2"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </label>

          <div>
            <span className="text-sm text-zinc-300">Mood</span>
            <div className="mt-2 flex gap-2">
              {(["good", "okay", "bad"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`rounded-xl px-3 py-2 border ${
                    mood === m ? "bg-white text-black" : "border-zinc-700"
                  }`}
                >
                  {m === "good" ? "👍 Good" : m === "okay" ? "😐 Okay" : "👎 Bad"}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm text-zinc-300">Rating (1–5)</span>
            <input
              type="range"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mt-2 w-full"
            />
            <div className="text-sm text-zinc-400 mt-1">Selected: {rating}</div>
          </label>

          <div>
            <span className="text-sm text-zinc-300">Tags</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`rounded-xl px-3 py-2 text-sm border ${
                    tags.includes(t) ? "bg-white text-black" : "border-zinc-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm text-zinc-300">Optional comment</span>
            <textarea
              className="mt-1 w-full rounded-xl bg-black border border-zinc-800 px-3 py-2"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What should change right now?"
            />
          </label>

          <button
            onClick={submit}
            className="w-full rounded-xl bg-white text-black font-medium py-2 hover:opacity-90"
          >
            Submit
          </button>

          {status && <div className="text-sm text-zinc-300">{status}</div>}
        </div>
      </div>
    </main>
  );
}
