import { createClient } from "@/lib/supabase/client";

async function fetchCounts() {
  const supabase = createClient();

  const [{ count: linkCount }, { count: profileCount }] = await Promise.all([
    supabase.from("links").select("*", { count: "exact", head: true }),
    supabase.from("user_profiles").select("*", { count: "exact", head: true }),
  ]);

  return {
    links: linkCount ?? 0,
    profiles: profileCount ?? 0,
  };
}

export async function getLinkAndProfileCount() {
  const counts = await fetchCounts();
  return counts;
}

export const revalidate = 3600; // Cache for 1 hour
