import { SupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";
import { Profile } from '@/lib/types/type'
import { createClient } from '@/lib/supabase/server'

export const getUser = cache(async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*, prices(*, products(*))")
    .in("status", ["trialing", "active"])
    .maybeSingle();

  return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index", { ascending: true })
    .limit(3); // Assuming we want to limit to 4 products (0 to 3)

  return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
  const { data: userDetails } = await supabase
    .from("user_profiles")
    .select("*")  
    .single();
  return userDetails;
});
