'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

type Link = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export async function createLink(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated');

  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  const description = formData.get('description') as string;

  const { error } = await supabase
    .from('links')
    .insert({ user_id: user.id, title, url, description });

  if (error) throw error;

  revalidatePath('/edit');
}

export async function updateLink(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated');

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const url = formData.get('url') as string;
  const description = formData.get('description') as string;

  const { error } = await supabase
    .from('links')
    .update({ title, url, description })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/edit');
}

export async function deleteLink(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('User not authenticated');

  const id = formData.get('id') as string;

  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) throw error;

  revalidatePath('/edit');
}