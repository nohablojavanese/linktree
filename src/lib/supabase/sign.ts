import { toast } from "sonner";
import { createClient } from "./client";

export async function signOut() {
  const supabase = createClient();

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    toast.success("Successfully signed out");
    
    // Redirect to the login page
    window.location.href = '/login';
    
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error("Error signing out");
    return { success: false, error };
  }
}
interface Counts {
  links: number;
  profiles: number;
}

async function fetchCounts(): Promise<Counts> {
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

export async function CounterData(): Promise<Counts> {
  try {
    const counts = await fetchCounts();
    return counts;
  } catch (error) {
    console.error("Error fetching counts:", error);
    return { links: 0, profiles: 0 };
  }
}

export const revalidate = 3600 * 6; // Cache for 6 hours
