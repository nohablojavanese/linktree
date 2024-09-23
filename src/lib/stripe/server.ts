"use server";

import Stripe from "stripe";
import { stripe } from "./config";
import { createClient } from "../supabase/server";
import { createOrRetrieveCustomer } from "../supabase/admin";
import {
  getURL,
  getErrorRedirect,
  calculateTrialEndUnixTimestamp,
} from "../helpers";
import { Tables } from "../../../type_db";

type Price = Tables<"prices">;

type CheckoutResponse = {
  errorRedirect?: string;
  sessionId?: string;
};

export async function checkoutWithStripe(
  price: Price,
  redirectPath: string = "/edit"
): Promise<CheckoutResponse> {
  try {
    // Get the user from Supabase auth
    const supabase = createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (error || !user) {
      console.error(error);
      throw new Error("Could not get user session.");
    }

    // Retrieve or create the customer in Stripe
    let customer: string;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user?.id || "",
        email: user?.email || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      // billing_address_collection: "required",
      customer,
      customer_update: {
        // address: "auto",
        
      },
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      cancel_url: getURL(),
      success_url: getURL(redirectPath),
    };

    console.log(
      "Trial end:",
      calculateTrialEndUnixTimestamp(price.trial_period_days)
    );
    if (price.type === "recurring") {
      params = {
        ...params,
        mode: "subscription",
        subscription_data: {
          trial_end: calculateTrialEndUnixTimestamp(price.trial_period_days),
        },
      };
    } else if (price.type === "one_time") {
      params = {
        ...params,
        mode: "payment",
      };
    }

    // TODO: REMOVE_DEBUG_LOGS
    const DEBUG_PREFIX = "DEBUG_STRIPE_CHECKOUT:";

    // Create a checkout session in Stripe
    let session;
    try {
      // TODO: REMOVE_DEBUG_LOGS
      console.log(`${DEBUG_PREFIX} Creating Stripe checkout session with params:`, JSON.stringify(params, null, 2));
      session = await stripe.checkout.sessions.create(params);
      // TODO: REMOVE_DEBUG_LOGS
      console.log(`${DEBUG_PREFIX} Checkout session created successfully:`, session.id);
    } catch (err) {
      // TODO: REMOVE_DEBUG_LOGS
      console.error(`${DEBUG_PREFIX} Error creating Stripe checkout session:`, err);
      if (err instanceof Error) {
        // TODO: REMOVE_DEBUG_LOGS
        console.error(`${DEBUG_PREFIX} Error message:`, err.message);
        console.error(`${DEBUG_PREFIX} Error stack:`, err.stack);
      }
      throw new Error("Unable to create checkout session.");
    }

    // Instead of returning a Response, just return the data or error.
    if (session) {
      console.log('Checkout session created:', session.id);
      return { sessionId: session.id };
    } else {
      console.error('Failed to create checkout session');
      throw new Error("Unable to create checkout session.");
    }
  } catch (error) {
    console.error('Error in checkoutWithStripe:', error);
    if (error instanceof Error) {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          error.message,
          "Please try again later or contact a system administrator."
        ),
      };
    } else {
      return {
        errorRedirect: getErrorRedirect(
          redirectPath,
          "An unknown error occurred.",
          "Please try again later or contact a system administrator."
        ),
      };
    }
  }
}

export async function createStripePortal(currentPath: string) {
  try {
    const supabase = createClient();
    const {
      error,
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      if (error) {
        console.error(error);
      }
      throw new Error("Could not get user session.");
    }

    let customer;
    try {
      customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });
    } catch (err) {
      console.error(err);
      throw new Error("Unable to access customer record.");
    }

    if (!customer) {
      throw new Error("Could not get customer.");
    }

    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL("/edit/premium"),
      });
      if (!url) {
        throw new Error("Could not create billing portal");
      }
      return url;
    } catch (err) {
      console.error(err);
      throw new Error("Could not create billing portal");
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return getErrorRedirect(
        currentPath,
        error.message,
        "Please try again later or contact a system administrator."
      );
    } else {
      return getErrorRedirect(
        currentPath,
        "An unknown error occurred.",
        "Please try again later or contact a system administrator."
      );
    }
  }
}
