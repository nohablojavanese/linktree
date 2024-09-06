"use server";

import { createClient } from "@/lib/supabase/server";
import { rateLimit, resetRateLimit } from "@/lib/rateLimit";

export async function requestPasswordReset(email: string, ip: string) {
  const { success, remainingAttempts } = await rateLimit(ip);
  if (!success) {
    return { 
      success: false, 
      message: `Too many attempts. Please try again later. Remaining attempts: ${remainingAttempts}`,
      remainingAttempts
    };
  }

  const supabase = createClient();

  try {
    // Check if the email exists in the database
    const { data, error: db_error } = await supabase
      .from('auth_users_emails')
      .select('email')
      .eq('email', email)
      .single();

    if (db_error || !data) {
      console.error("Email not found:", email);
      return { 
        success: false, 
        message: `Email ${email} does not exist in our records.`,
        remainingAttempts
      };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/request/update-password`,
    });

    if (error) {
      console.error("Error sending reset password email:", error);
      return { 
        success: false, 
        message: "Error sending reset password email. Please try again.",
        remainingAttempts
      };
    }

    await resetRateLimit(ip);
    return { 
      success: true, 
      message: "Password reset email sent. Check your inbox.",
      remainingAttempts
    };
  } catch (error) {
    console.error("Unexpected error during password reset request:", error);
    return { 
      success: false, 
      message: "An unexpected error occurred. Please try again later.",
      remainingAttempts
    };
  }
}