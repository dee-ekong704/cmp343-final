import Image from "next/image";
import ClientCounter from "./ClientCounter";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-4xl px-6 py-14">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={90}
            height={20}
            className="invert"
            priority
          />
          <span className="text-sm text-zinc-400">CMP 343 Final Project</span>
        </div>

        {/* Title + description */}
        <h1 className="mt-10 text-4xl font-semibold tracking-tight">
        Next.js Full-Stack Web Application

        </h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          This project demonstrates Server Components, Client Components, an API
          route, and frontend-to-backend communication, deployed on Vercel.
        </p>

        {/* Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-lg font-medium">Client Component</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Interactive UI using state + fetching from an API route.
            </p>
            <div className="mt-4">
              <ClientCounter />
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-lg font-medium">Routing + API</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Navigate to another route and view the API endpoint.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/about"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                About Page →
              </a>

              <a
                href="/api/hello"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-900"
              >
                View API JSON →
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <p className="mt-12 text-xs text-zinc-500">
          Built with Next.js (App Router), Tailwind CSS, API Routes, and deployed
          on Vercel.
        </p>
      </main>
    </div>
  );
}
