import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black p-4">
      <main className="text-center">
        <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Welcome to B-API Frontend
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          Manage your dogs and cats with ease
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-lg font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Create Account
          </Link>
        </div>
      </main>
    </div>
  );
}
