import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/";

  // If token_hash and type are present, verify the OTP
  if (token_hash && type) {
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      });

      if (!error) {
        console.log("Successful Authentication");
        // Redirect to the next URL after successful verification
        return NextResponse.redirect(new URL(next, request.url));
      } else {
        let errorMessage = "Unknown error occurred";
        if (error.message.includes("expired")) {
          errorMessage = "Email OTP Expiration";
        } else if (error.message.includes("invalid")) {
          errorMessage = "Invalid OTP";
        }
        return NextResponse.redirect(new URL(`/auth/error?message=${encodeURIComponent(errorMessage)}`, request.url));
      }
    } catch (error) {
      console.error("Unexpected error during OTP verification:", error);
      const errorMessage = encodeURIComponent((error as Error).message || "Unknown error");
      return NextResponse.redirect(new URL(`/auth/error?message=${errorMessage}`, request.url));
    }
  } 
  // If only next is present, the user is already authenticated, so redirect to the next URL
  else if (next) {
    return NextResponse.redirect(new URL(next, request.url));
  }
  // If neither token_hash, type, nor next are present, redirect to the error page
  else {
    return NextResponse.redirect(new URL("/auth/error?message=Invalid or missing parameters", request.url));
  }
}