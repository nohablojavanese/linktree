import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = async () => {
  const DEBUG_PREFIX = "DEBUG_GET_STRIPE:";

  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    
    console.log(`${DEBUG_PREFIX} Checking for Stripe publishable key`);
    
    if (!publishableKey) {
      console.error(`${DEBUG_PREFIX} Stripe publishable key is not set in the environment variables.`);
      throw new Error("Stripe publishable key is not set in the environment variables.");
    }

    console.log(`${DEBUG_PREFIX} Stripe publishable key found. Loading Stripe...`);
    stripePromise = loadStripe(publishableKey);
  }

  try {
    const stripe = await stripePromise;
    if (stripe) {
      console.log(`${DEBUG_PREFIX} Stripe loaded successfully`);
    } else {
      console.warn(`${DEBUG_PREFIX} Stripe loaded, but returned null`);
    }
    return stripe;
  } catch (error) {
    console.error(`${DEBUG_PREFIX} Error loading Stripe:`, error);
    throw error; // Re-throw the error to be handled by the caller
  }
};