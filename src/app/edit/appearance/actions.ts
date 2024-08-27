"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getAuthenticatedUser } from "../actions";
import { z } from "zod";


const usernameSchema =  z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/)
const urlSchema = z
  .string()
//   .transform((url) => {
//     if (!/^https?:\/\//.test(url)) {
//       return `https://${url}`;
//     }
//     return url;
//   })
  .optional();
  const bioSchema = z.string().max(160).optional();


  export async function updateProfile(data: Partial<{
    username: string;
    background_url: string;
    hero_url: string;
    image_url: string;
    bio: string;
  }>) {
    const user = await getAuthenticatedUser();
    const supabase = createClient();
  
    try {
      const validatedData: typeof data = {};
  
      if ('username' in data) {
        validatedData.username = usernameSchema.parse(data.username);
      }
      if ('background_url' in data) {
        validatedData.background_url = urlSchema.parse(data.background_url);
      }
      if ('hero_url' in data) {
        validatedData.hero_url = urlSchema.parse(data.hero_url);
      }
      if ('image_url' in data) {
        validatedData.image_url = urlSchema.parse(data.image_url);
      }
      if ('bio' in data) {
        validatedData.bio = bioSchema.parse(data.bio);
      }
  
      const { error } = await supabase
        .from("user_profiles")
        .update(validatedData)
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

