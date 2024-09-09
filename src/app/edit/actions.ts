"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const urlSchema = z
  .string()
  .transform((url) => {
    if (!/^https?:\/\//.test(url)) {
      return `http://${url}`;
    }
    return url;
  })
  .optional();

export async function getAuthenticatedUser() {
  const supabase = createClient();
  const session = await supabase.auth.getSession();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  if (!session) redirect("/login");

  return user;
}

export async function createLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const description = formData.get("description") as string;

  try {
    z.string()
      .min(1, "Title is required")
      .max(100, "Title must be at most 100 characters long")
      .parse(title);
    urlSchema.parse(url);
    z.string()
      .max(500, "Description must be at most 500 characters long")
      .optional()
      .parse(description);

    const { data: maxOrderData, error: maxOrderError } = await supabase
      .from("links")
      .select("order")
      .eq("user_id", user.id)
      .order("order", { ascending: false })
      .limit(1);

    if (maxOrderError) throw maxOrderError;

    const newOrder =
      maxOrderData && maxOrderData.length > 0 ? maxOrderData[0].order + 1 : 0;

    const { error } = await supabase.from("links").insert({
      user_id: user.id,
      title: title,
      url: url,
      description: description,
      order: newOrder, 
    });
    if (error) throw new Error("Failed to create link");
    revalidatePath("/edit");
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
}

export async function updateLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get("id") as string;
  const updateData: { title: string; url: string; description?: string } = {
    title: formData.get("title") as string,
    url: formData.get("url") as string,
  };

  const description = formData.get("description") as string;
  if (description) {
    updateData.description = description;
  }

  const { error } = await supabase
    .from("links")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
  revalidatePath("/edit");
}

export async function deleteLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
  revalidatePath("/edit");
}

export async function createSocialLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const { error } = await supabase.from("social_links").insert({
    user_id: user.id,
    platform: formData.get("platform") as string,
    url: formData.get("url") as string,
  });

  if (error) throw error;
  revalidatePath("/edit");
}

export async function updateSocialLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get("id") as string;
  const updateData = {
    platform: formData.get("platform") as string,
    url: formData.get("url") as string,
  };

  const { error } = await supabase
    .from("social_links")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
  revalidatePath("/edit");
}

export async function deleteSocialLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get("id") as string;

  const { error } = await supabase
    .from("social_links")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
  revalidatePath("/edit");
}

export async function updateLinkVisibility(id: string, isVisible: boolean) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const { error } = await supabase
    .from("links")
    .update({ isVisible: isVisible })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw error;
  revalidatePath("/edit");
}

export async function updateLinkOrder(
  newOrder: { id: string; order: number }[]
) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const { error } = await supabase.rpc("update_links_order", {
    updates: newOrder,
    user_id: user.id,
  });

  if (error) throw error;
  revalidatePath("/edit");
}
