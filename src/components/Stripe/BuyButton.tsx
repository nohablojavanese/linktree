/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button } from "@nextui-org/react";
import { CheckIcon } from "lucide-react";
import type { Tables } from "../../../type_db";
import { getStripe } from "@/lib/stripe/client";
import { checkoutWithStripe } from "@/lib/stripe/server";
import { getErrorRedirect } from "@/lib/helpers";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Card } from "../shadcn/ui/card";

type Subscription = Tables<"subscriptions">;
type Product = Tables<"products">;
type Price = Tables<"prices">;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}

type BillingInterval = "lifetime" | "year" | "month";

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    const DEBUG_PREFIX = "DEBUG_STRIPE_CHECKOUT_CLIENT:";
    
    setPriceIdLoading(price.id);

    if (!user) {
      console.log(`${DEBUG_PREFIX} No user, redirecting to login`);
      setPriceIdLoading(undefined);
      return router.push("/login");
    }

    console.log(`${DEBUG_PREFIX} Initiating checkout for price:`, price.id);

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    console.log(`${DEBUG_PREFIX} Checkout response:`, { errorRedirect, sessionId });

    if (errorRedirect) {
      console.log(`${DEBUG_PREFIX} Redirecting to error page:`, errorRedirect);
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      console.log(`${DEBUG_PREFIX} No session ID received, redirecting to error page`);
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        )
      );
    }

    console.log(`${DEBUG_PREFIX} Attempting to redirect to Stripe checkout`);

    const stripe = await getStripe();
    if (stripe) {
      console.log(`${DEBUG_PREFIX} Stripe loaded, redirecting to checkout`);
      stripe.redirectToCheckout({ sessionId });
    } else {
      console.error(`${DEBUG_PREFIX} Failed to load Stripe`);
    }

    setPriceIdLoading(undefined);
  };

  if (!products.length) {
    return (
      <Card className="bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 backdrop-filter backdrop-blur-md rounded-xl transition-colors duration-200">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 dark:text-white text-center">
            We currently don't have subscription plans available. Please check
            back later for exciting new offerings!{" "}
            <a
              className="text-blue-500 dark:text-blue-400 underline hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
              href="/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Plans
            </a>
            .
          </p>
        </div>
      </Card>
    );
  } else {
    return (
      <Card className="my-10 w-full  mx-auto p-6 shadow-lg  bg-white bg-opacity-70 dark:bg-black dark:bg-opacity-70 backdrop-filter backdrop-blur-md rounded-xl transition-colors duration-200">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-blue-500 dark:text-white sm:text-center sm:text-6xl">
              Pricing Plans
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-700 sm:text-center sm:text-2xl">
              Start building for free, then add a site plan to go live. Account
              plans unlock additional features.
            </p>
            <div className="relative self-center mt-6 bg-zinc-900 rounded-full p-0.5 flex sm:mt-8 border border-zinc-800">
              {intervals.includes("month") && (
                <button
                  onClick={() => setBillingInterval("month")}
                  type="button"
                  className={`${
                    billingInterval === "month"
                      ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                      : "ml-0.5 relative w-1/2 border border-transparent text-zinc-400"
                  } rounded-full m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Monthly billing
                </button>
              )}
              {intervals.includes("year") && (
                <button
                  onClick={() => setBillingInterval("year")}
                  type="button"
                  className={`${
                    billingInterval === "year"
                      ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                      : "ml-0.5 relative w-1/2 border border-transparent text-zinc-400"
                  } rounded-full m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
                >
                  Yearly billing
                </button>
              )}
            </div>
          </div>
          <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {products.map((product, index) => {
              const price = product?.prices?.find(
                (price) => price.interval === billingInterval
              );
              if (!price) return null;
              const priceString = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currency!,
                minimumFractionDigits: 0,
              }).format((price?.unit_amount || 0) / 100);
              const isCurrentPlan =
                subscription?.prices?.products?.name === product.name;
              const isBasicPlan = index === 0; // Assuming the first plan is always the Basic/free plan
              const isDisabled = isCurrentPlan || isBasicPlan;

              let buttonText = "Subscribe";
              if (isBasicPlan) {
                buttonText = "Current Plan";
              } else if (subscription) {
                buttonText = isCurrentPlan ? "Current Plan" : "Upgrade";
              }

              return (
                <div
                  key={product.id}
                  className={cn(
                    "flex flex-col rounded-2xl shadow-sm divide-y divide-zinc-600 bg-zinc-900",
                    {
                      "border-2 border-blue-500": isCurrentPlan || isBasicPlan,
                    },
                    "flex-1",
                    "max-w-xs",
                    "relative", // Add relative positioning
                    "pb-16" // Add padding at the bottom for the button
                  )}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold leading-6 text-white">
                      {product.name}
                    </h2>
                    <p className="mt-4 text-sm text-zinc-300">
                      {product.description}
                    </p>
                    <p className="mt-8">
                      <span className="text-5xl font-extrabold white">
                        {priceString}
                      </span>
                      <span className="text-base font-medium text-zinc-100">
                        /{billingInterval}
                      </span>
                    </p>

                    {/* Add this new section for features */}
                    {product.features && product.features.length > 0 && (
                      <ul className="mt-6 space-y-4">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon
                                className="h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base text-gray-300">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Button
                      variant="flat"
                      type="button"
                      isLoading={priceIdLoading === price.id}
                      isDisabled={isDisabled}
                      onClick={() => handleStripeCheckout(price)}
                      className={cn(
                        "absolute bottom-2 left-2 right-2 py-2 text-sm font-semibold text-center text-white rounded-2xl",
                        isDisabled
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-blue-500"
                      )}
                    >
                      {buttonText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    );
  }
}
