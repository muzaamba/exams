'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // During build time/prerendering, these might be missing.
    // We return null to avoid crashing the build.
    return null;
  }

  return createBrowserClient(url, key);
}

// In Next.js, we should be careful about creating the client at the module level
// if it depends on env vars that might be missing during static optimization.
export const supabase = typeof window !== 'undefined' ? createClient() : null;
