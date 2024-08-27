"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getAuthenticatedUser } from "../actions";
import { z } from "zod";

const usernameSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/);

const urlSchema = z
  .string()
  .transform((url) => {
    if (!/^https?:\/\//.test(url)) {
      return `https://${url}`;
    }
    return url;
  })
  .optional();

export async function updateProfile(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const username = formData.get("username") as string;
  const imageUrl = formData.get("imageUrl");

  try {
    usernameSchema.parse(username);
    const validatedImageUrl = imageUrl
      ? urlSchema.parse(imageUrl as string)
      : null;

    const { error } = await supabase
      .from("user_profiles")
      .update({
        username: username,
        image_url: validatedImageUrl,
      })
      .eq("id", user.id);

    if (error) {
      if (error.code === "23505") {
        throw new Error("Username is already taken");
      }
      throw new Error("Failed to update profile");
    }

    revalidatePath("/edit");
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
}

export async function updateTheme(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const ThemeData = {
    theme: formData.get("theme") as string,
    font_family: formData.get("font_family") as string,
  };

  const { error } = await supabase
    .from("themes")
    .update(ThemeData)
    .eq("user_id", user.id);

  if (error) throw error;
  revalidatePath("/edit");
}

