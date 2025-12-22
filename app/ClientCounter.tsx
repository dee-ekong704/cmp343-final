"use client";

import { useEffect, useState } from "react";

export default function ClientCounter() {
  const [count, setCount] = useState(0);
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message));
  }, []);

  return (
    <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Client Component
      </p>

      {apiMessage && (
        <p className="mt-2 text-sm font-medium text-green-600">
          API says: {apiMessage}
        </p>
      )}

      <div className="mt-3 flex items-center gap-3">
        <button
          className="rounded-lg bg-black px-3 py-2 text-white hover:opacity-90 dark:bg-white dark:text-black"
          onClick={() => setCount((c) => c + 1)}
        >
          Clicked: {count}
        </button>
        <button
          className="rounded-lg border border-zinc-300 px-3 py-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
