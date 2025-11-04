'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { getToken, removeToken } from '@/lib/auth';
import { Dog } from '@/lib/types';

export default function DogsPage() {
  const router = useRouter();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }
    fetchDogs();
  }, [router]);

  const fetchDogs = async () => {
    try {
      const data = await api.getDogs();
      setDogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this dog?')) return;

    try {
      await api.deleteDog(id);
      setDogs(dogs.filter((dog) => dog.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete dog');
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Dogs</h1>
          <div className="flex gap-4">
            <Link
              href="/cats"
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700"
            >
              View Cats
            </Link>
            <Link
              href="/dogs/create"
              className="px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded hover:bg-zinc-800 dark:hover:bg-zinc-200"
            >
              Add Dog
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {dogs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-lg">
            <p className="text-zinc-600 dark:text-zinc-400">No dogs found. Add your first dog!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dogs.map((dog) => (
              <div
                key={dog.id}
                className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      {dog.name}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{dog.breed}</p>
                  </div>
                  {dog.isActive !== undefined && (
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        dog.isActive
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                          : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                      }`}
                    >
                      {dog.isActive ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </div>
                {dog.age !== undefined && (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Age: {dog.age} {dog.age === 1 ? 'year' : 'years'}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link
                    href={`/dogs/${dog.id}/edit`}
                    className="flex-1 text-center px-3 py-2 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(dog.id)}
                    className="flex-1 px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded text-sm hover:bg-red-200 dark:hover:bg-red-900/40"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

