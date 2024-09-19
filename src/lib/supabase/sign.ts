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
