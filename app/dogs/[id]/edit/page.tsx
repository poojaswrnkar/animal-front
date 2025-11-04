'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { Dog } from '@/lib/types';

export default function EditDogPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [dog, setDog] = useState<Dog | null>(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
      return;
    }
    fetchDog();
  }, [router, id]);

  const fetchDog = async () => {
    try {
      const data = await api.getDog(id);
      setDog(data);
      setName(data.name);
      setBreed(data.breed);
      setAge(data.age?.toString() || '');
      setIsActive(data.isActive ?? true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dog');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await api.updateDog(id, {
        name,
        breed,
        age: age ? Number(age) : undefined,
        isActive,
      });
      router.push('/dogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update dog');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded">
            Dog not found
          </div>
          <Link href="/dogs" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mt-4 block">
            ← Back to Dogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dogs"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            ← Back to Dogs
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mt-4">Edit Dog</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-md">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
              />
            </div>

            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Breed *
              </label>
              <input
                id="breed"
                type="text"
                required
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Age (optional)
              </label>
              <input
                id="age"
                type="number"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
              />
            </div>

            <div className="flex items-center">
              <input
                id="isActive"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 text-zinc-900 focus:ring-zinc-900 border-zinc-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-zinc-700 dark:text-zinc-300">
                Active
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href="/dogs"
              className="flex-1 py-2 px-4 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

