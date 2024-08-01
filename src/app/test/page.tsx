import React from 'react';
import { createClient } from '@/lib/supabase/server';

async function getLinks(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export default async function TestPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in to view your links.</div>;
  }

  const links = await getLinks(user.id);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Links</h1>
      <div className="space-y-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white dark:bg-black rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{link.title}</h2>
            {link.description && <p className="text-gray-600 mb-2">{link.description}</p>}
            <p className="text-blue-500">{link.url}</p>
          </a>
        ))}
      </div>
    </div>
  );
}