import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { rateLimit, resetRateLimit } from "@/lib/rateLimit";
import { redirect } from "next/navigation";

const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = authSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type AuthAction = "login" | "signup";

interface AuthResult {
  success: boolean;
  redirectUrl?: string;
  errors?: { [key: string]: string[] };
  remainingAttempts: number;
  shouldRedirect?: boolean; // Add this line
  TTL?: number | null
}

export async function handleAuth(
  action: AuthAction,
  formData: FormData,
  ip: string
): Promise<AuthResult> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (session || user) {
    redirect("/edit");
  }

  // Rate limiting
  const rateLimitResult = await rateLimit(ip);
  if (!rateLimitResult.success) {
    return {
      success: false,
      errors: { general: ["Too many attempts. Please try again later."] },
      remainingAttempts: rateLimitResult.remainingAttempts,
      TTL: rateLimitResult.ttl
    };
  }

  // Data validation
  const schema = action === "login" ? authSchema : signupSchema;
  const data = Object.fromEntries(formData);
  const validationResult = schema.safeParse(data);

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
      remainingAttempts: rateLimitResult.remainingAttempts,
    };
  }

  try {
    // SignIn process
    if (action === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email as string,
        password: data.password as string,
      });
      if (error) {
        let errorMessage: string;

        // Customize error messages based on error code
        switch (error.message) {
          case "Invalid login credentials":
            errorMessage = "The email or password you entered is incorrect.";
            break;
          case "User not found":
            errorMessage = "No account found with this email address.";
            break;
          case "Too many login attempts":
            errorMessage = "Too many login attempts. Please try again later.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }

        return {
          success: false,
          errors: { general: [errorMessage] },
          remainingAttempts: rateLimitResult.remainingAttempts,
        };
      }
    } else {
      // Signup process
      const { error } = await supabase.auth.signUp({
        email: data.email as string,
        password: data.password as string,
      });
      if (error) {
        return {
          success: false,
          // errors: { general: ["This email is already registered."] },
          errors: { general: [error.message] },
          remainingAttempts: rateLimitResult.remainingAttempts,
        };
      }
    }

    await resetRateLimit(ip);

    const redirectUrl =
      action === "login"
        ? "/edit?onboard=false"
        : `/auth/success?status=Waiting+for+confirmation&message=Please+check+your+email+(${encodeURIComponent(
            data.email as string)})+for+a+confirmation+link.+Please+note+that+the+email+might+be+in+your+spam+folder. `;

    return {
      success: true,
      redirectUrl,
      remainingAttempts: rateLimitResult.remainingAttempts,
      shouldRedirect: true, // Add this line
    };
  } catch (error) {
    console.error("Auth Error:", error);
    return {
      success: false,
      errors: { general: ["An unexpected error occurred. Please try again."] },
      remainingAttempts: rateLimitResult.remainingAttempts,
    };
  }
}

export async function handleGoogleSignIn(next: string = "/edit") {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL
        }/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) throw error;

    return { success: true, url: data.url };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during Google Sign-In";
    return {
      success: false,
      errors: { general: [errorMessage] },
    };
  }
}
