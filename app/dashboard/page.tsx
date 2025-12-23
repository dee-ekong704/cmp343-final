"use client";

import { useEffect, useMemo, useState } from "react";

type Feedback = {
  id: string;
  created_at: string;
  class_name: string;
  mood: "good" | "okay" | "bad";
  rating: number;
  tags: string[];
  comment: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<Feedback[]>([]);
  const [error, setError] = useState<string>("");

  const load = async () => {
    setError("");
    const res = await fetch("/api/feedback");
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Failed to load");
      return;
    }
    setData(json.feedback || []);
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, []);

  const stats = useMemo(() => {
    const total = data.length;
    const avg = total ? data.reduce((s, x) => s + x.rating, 0) / total : 0;
    const moods = { good: 0, okay: 0, bad: 0 };
    const tags: Record<string, number> = {};

    data.forEach((f) => {
      moods[f.mood]++;
      (f.tags || []).forEach((t) => (tags[t] = (tags[t] || 0) + 1));
    });

    const topTags = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { total, avg, moods, topTags };
  }, [data]);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold">Professor Dashboard</h1>
        <p className="mt-2 text-zinc-300">
          Live anonymous feedback (auto-refreshes every 3 seconds).
        </p>

        {error && <div className="mt-4 text-sm text-red-400">{error}</div>}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm text-zinc-400">Total submissions</div>
            <div className="mt-2 text-3xl font-semibold">{stats.total}</div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm text-zinc-400">Average rating</div>
            <div className="mt-2 text-3xl font-semibold">{stats.avg.toFixed(2)}</div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="text-sm text-zinc-400">Mood counts</div>
            <div className="mt-2 space-y-1 text-sm">
              <div>👍 Good: {stats.moods.good}</div>
              <div>😐 Okay: {stats.moods.okay}</div>
              <div>👎 Bad: {stats.moods.bad}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-lg font-medium">Top Tags</h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              {stats.topTags.length === 0 && <li className="text-zinc-500">No tags yet.</li>}
              {stats.topTags.map(([tag, count]) => (
                <li key={tag} className="flex justify-between">
                  <span>{tag}</span>
                  <span className="text-zinc-400">{count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-lg font-medium">Latest Submissions</h2>
            <div className="mt-3 space-y-3">
              {data.slice(0, 6).map((f) => (
                <div key={f.id} className="rounded-xl border border-zinc-800 p-3">
                  <div className="text-xs text-zinc-500">
                    {new Date(f.created_at).toLocaleString()} • {f.class_name} • {f.mood} • {f.rating}/5
                  </div>
                  <div className="mt-1 text-sm text-zinc-200">
                    {f.comment ? f.comment : <span className="text-zinc-500">No comment.</span>}
                  </div>
                </div>
              ))}
              {data.length === 0 && <div className="text-sm text-zinc-500">No submissions yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
