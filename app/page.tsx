import Image from "next/image";
import ClientCounter from "./ClientCounter";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16 bg-white dark:bg-black text-center">

        {/* Title */}
        <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
          Real-Time Student Feedback Dashboard
        </h1>

        {/* Description */}
        <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
          An anonymous feedback system that allows students to submit live
          feedback during class and lets professors view real-time analytics.
        </p>

        {/* Client-side interactivity */}
        <ClientCounter />

        {/* Navigation Links — THIS IS STEP 8 */}
        <div className="flex gap-6 mt-4">
          <a
            href="/submit"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Submit Feedback
          </a>

          <a
            href="/dashboard"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            View Dashboard
          </a>

          <a
            href="/about"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            About Project
          </a>
        </div>

        {/* Logo (optional, harmless) */}
        <Image
          className="dark:invert mt-8"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </main>
    </div>
  );
}
