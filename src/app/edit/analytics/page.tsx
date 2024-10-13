import { createClient } from "@/lib/supabase/server";
import { getSubscription, getUser } from "@/lib/supabase/queries";
import PremiumContent from "@/app/edit/analytics/analytics";
import SubscriptionRequired from "@/app/edit/analytics/default";

export default async function PremiumDashboardPage() {
  const supabase = createClient();
  const [user, subscription] = await Promise.all([
    getUser(supabase),
    getSubscription(supabase),
  ]);

  const hasActiveSubscription = subscription?.status === 'active';

  return (
    <div className="w-full h-full mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Premium Dashboard</h1>
      {hasActiveSubscription ? (
        <PremiumContent user={user} />
      ) : (
        <SubscriptionRequired />
      )}
    </div>
  );
}