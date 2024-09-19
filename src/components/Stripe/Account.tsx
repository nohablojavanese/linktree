"use client";

import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { createStripePortal } from "@/lib/stripe/server";
import Link from "next/link";
import { Card } from "../shadcn/ui/card";
import { Tables } from "../../../type_db";

type Subscription = Tables<"subscriptions">;
type Price = Tables<"prices">;
type Product = Tables<"products">;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Card className="w-full  text-black  dark:text-white mx-auto p-6 shadow-lg text-center bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 backdrop-filter backdrop-blur-md rounded-xl transition-colors duration-200">
      <h2 className="text-3xl font-bold mb-4 ">Your Plan</h2>
      <p className="text-md mb-6">
        {subscription
          ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
          : "You are not currently subscribed to any plan."}
      </p>
      <div className="mt-6 mb-6 text-2xl font-semibold">
        {subscription ? (
          `${subscriptionPrice}/${subscription?.prices?.interval}`
        ) : (
          <Link
            href="/"
            className="hover:underline"
          >
            Choose your Plan
          </Link>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          color="primary"
          variant="shadow"
          onClick={handleStripePortalRequest}
          isLoading={isSubmitting}
          className="w-full sm:w-auto bg-blue-500 text-white"
        >
          {isSubmitting ? "Loading..." : "Open customer portal"}
        </Button>
      </div>
    </Card>
  );
}
