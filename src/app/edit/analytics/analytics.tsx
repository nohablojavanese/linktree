/* eslint-disable react/no-unescaped-entities */
import { User } from '@supabase/supabase-js';

interface Props {
  user: User | null;
}

export default function PremiumContent({ user }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Welcome to Premium Content, {user?.email}!</h2>
      <p className="mb-4">Here's your exclusive premium dashboard content:</p>
      <ul className="list-disc pl-5">
        <li>Advanced analytics</li>
        <li>Exclusive reports</li>
        <li>Priority support</li>
        {/* Add more premium features here */}
      </ul>
    </div>
  );
}