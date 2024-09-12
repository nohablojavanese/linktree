"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getAuthenticatedUser } from "../actions";
import { z } from "zod";

const usernameSchema = z
  .string()
  .min(6)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/);
const urlSchema = z
  .string()
  .url("Invalid URL format")
  .refine(
    (url) => {
      const parsedUrl = new URL(url);
      const pathname = parsedUrl.pathname.toLowerCase();
      return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].some((ext) =>
        pathname.endsWith(ext)
      );
    },
    {
      message:
        "URL must end with a valid image file extension (.jpg, .jpeg, .png, .gif, .webp, .svg)",
    }
  )
  .optional()
  .nullable();
const bioSchema = z.string().max(160).optional();

const profileSchema = z.object({
  username: usernameSchema,
  background_url: urlSchema.nullable(),
  hero_url: urlSchema.nullable(),
  image_url: urlSchema.nullable(),
  bio: bioSchema,
});

type ProfileUpdateData = Partial<z.infer<typeof profileSchema>>;

export async function updateProfile(data: ProfileUpdateData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  try {
    const validatedData = profileSchema.partial().parse(data);

    const { error } = await supabase
      .from("user_profiles")
      .update(validatedData)
      .eq("id", user.id);

    if (error) {
      if (error.code === "23505") {
        throw new Error(ERROR_MESSAGES.USERNAME_TAKEN);
      }
      throw new Error(ERROR_MESSAGES.UPDATE_FAILED);
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

type ImageUrlField = "background_url" | "hero_url" | "image_url";
type ProfileData = {
  [K in ImageUrlField]?: string | null;
};

export async function removeImage(imageType: "image" | "hero" | "background") {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  try {
    const urlField: ImageUrlField = `${imageType}_url`;

    // First, get the current image URL
    const { data, error: profileError } = await supabase
      .from("user_profiles")
      .select(urlField)
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    const profileData = data as ProfileData;
    const currentImageUrl = profileData[urlField];

    if (currentImageUrl) {
      // Extract filename from URL
      const fileName = currentImageUrl.split("/").pop();
      const bucketName = `user_${imageType}`;

      if (!fileName) {
        throw new Error("Invalid file name");
      }

      // Remove file from storage using the Storage API
      const { error: removeError } = await supabase.storage
        .from(bucketName)
        .remove([fileName]);

      if (removeError) throw removeError;

      // Update profile to remove image URL
      const { error: updateError } = await supabase
        .from("user_profiles")
        .update({ [urlField]: null })
        .eq("id", user.id);

      if (updateError) throw updateError;
    }

    revalidatePath("/edit");
    return { success: true };
  } catch (error) {
    console.error("Error removing image:", error);
    return { success: false, error: ERROR_MESSAGES.REMOVE_FAILED };
  }
}

const ERROR_MESSAGES = {
  USERNAME_TAKEN: "Username is already taken",
  UPDATE_FAILED: "Failed to update profile",
  REMOVE_FAILED: "Failed to remove image",
};
