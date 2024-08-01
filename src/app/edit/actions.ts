'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from 'next/cache';

async function getAuthenticatedUser() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');
  return user;
}

export async function createLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const { error } = await supabase
    .from('links')
    .insert({ 
      user_id: user.id, 
      title: formData.get('title') as string, 
      url: formData.get('url') as string, 
      description: formData.get('description') as string 
    });

  if (error) throw error;
  revalidatePath('/edit');
}

export async function updateLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get('id') as string;
  const updateData: { title: string, url: string, description?: string } = { 
    title: formData.get('title') as string, 
    url: formData.get('url') as string 
  };
  
  const description = formData.get('description') as string;
  if (description) {
    updateData.description = description;
  }

  const { error } = await supabase
    .from('links')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  revalidatePath('/edit');
}

export async function deleteLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  revalidatePath('/edit');
}

export async function createSocialLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const { error } = await supabase
    .from('social_links')
    .insert({ 
      user_id: user.id, 
      platform: formData.get('platform') as string, 
      url: formData.get('url') as string 
    });

  if (error) throw error;
  revalidatePath('/edit');
}

export async function updateSocialLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get('id') as string;
  const updateData = { 
    platform: formData.get('platform') as string, 
    url: formData.get('url') as string 
  };

  const { error } = await supabase
    .from('social_links')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  revalidatePath('/edit');
}

export async function deleteSocialLink(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = createClient();

  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('social_links')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;
  revalidatePath('/edit');
}