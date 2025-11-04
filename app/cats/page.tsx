'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { getToken, removeToken } from '@/lib/auth';

export default function CatsPage() {
  const router = useRouter();
  const [cats, setCats] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }
    fetchCats();
  }, [router]);

  const fetchCats = async () => {
    try {
      const data = await api.getCats();
      setCats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cats');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Cats</h1>
          <div className="flex gap-4">
            <Link
              href="/dogs"
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700"
            >
              View Dogs
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Logout
            </button>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded">
            {error}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">Available Cats</h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 font-mono">{cats || 'No cats available'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

