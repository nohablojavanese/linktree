import Pricing from "@/components/Stripe/BuyButton";
import { createClient } from "@/lib/supabase/server";
import { getProducts, getSubscription, getUser } from "@/lib/supabase/queries";
import CustomerPortalForm from "@/components/Stripe/Account";

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase),
  ]);

  return (
    <div className="w-full mx-auto text-blue-500 space-y-10">
      {/* <h1 className="text-2xl font-bold mb-4">Our Products</h1> */}
      <CustomerPortalForm subscription={subscription} />
      <Pricing
        user={user}
        products={products ?? []}
        subscription={subscription}
      />
    </div>
  );
}
