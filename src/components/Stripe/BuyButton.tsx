"use client";

import { useState } from "react";
import { createStripePaymentLink } from "@/app/edit/actions";
import { toast } from "sonner";

const products = [
  { id: "prod_Qe66Vs4O5LG4g8", name: "Premium", price: "$1" },
  // { id: "price_Qe66Vs4O5LG4g8", name: "Premium", price: "$19.99" },
];    

export default function ProductList() {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (priceId: string) => {
    setLoading(priceId);
    setError(null);
    try {
      const checkoutUrl = await createStripePaymentLink(priceId);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Failed to create checkout session. Please try again.");
      setError("Failed to create checkout session. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.price}</p>
          <button
            onClick={() => handlePayment(product.id)}
            disabled={loading === product.id}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading === product.id ? "Loading..." : "Buy Now"}
          </button>
        </div>
      ))}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
