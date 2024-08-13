import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { rateLimit, resetRateLimit } from "@/lib/rateLimit";

const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = authSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function handleAuth(action: 'login' | 'signup', formData: FormData, ip: string) {
  const supabase = createClient();

  const rateLimitResult = await rateLimit(ip);
  if (!rateLimitResult.success) {
    return {
      success: false,
      errors: { general: ["Too many attempts. Please try again later."] },
      remainingAttempts: rateLimitResult.remainingAttempts,
    };
  }

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    ...(action === 'signup' && { confirmPassword: formData.get("confirmPassword") as string }),
  };

  const schema = action === 'login' ? authSchema : signupSchema;
  const parsedData = schema.safeParse(data);
  
  if (!parsedData.success) {
    const errors: { [key: string]: string[] } = {};
    parsedData.error.errors.forEach((err) => {
      const path = err.path[0] as string;
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });
    return {
      success: false,
      errors,
      remainingAttempts: rateLimitResult.remainingAttempts,
    };
  }

  try {
    if (action === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
    } else {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
    }

    await resetRateLimit(ip);
    redirect("/edit");
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String(error.message);
    }
    
    return {
      success: false,
      errors: { general: [errorMessage] },
      remainingAttempts: rateLimitResult.remainingAttempts,
    };
  }
}