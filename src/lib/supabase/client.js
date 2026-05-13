'use client';

import { createBrowserClient } from '@supabase/ssr';

// Singleton: only create ONE client instance for the entire app
let client = null;

export function createClient() {
  // Return cached client if it exists
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // During build time/prerendering, these might be missing.
    // We return null to avoid crashing the build.
    return null;
  }

  client = createBrowserClient(url, key);
  return client;
}
