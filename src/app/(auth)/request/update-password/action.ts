'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function resetPassword(formData: FormData, code: string | null) {
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const supabase = createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return { error: "Unable to reset Password. Link expired!" };
    }
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    // console.log(error);
    return { error: "Unable to reset Password. Try again!" };
  }

  redirect('/auth/success?status=Success&message=Your%20password%20has%20been%20reset%20successfully');
}
