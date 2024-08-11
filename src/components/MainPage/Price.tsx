"use client";

import { Button, Card } from "@nextui-org/react";
import { CheckSquare } from "lucide-react";

export default function ProductPriceSection() {
  const products = [
    {
      name: "Hobi",
      price: "Gratis",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Selebgram",
      price: "Rp. 50.000",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Artist",
      price: "Rp. 100.000",
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
  ];

  return (
    <section className="p-8 flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {products.map((product, index) => (
          <Card
            key={index}
            className="p-6 flex flex-col items-center justify-between bg-gray-100 dark:bg-gray-800"
          >
            <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <p className="text-2xl font-bold text-center my-4 text-gray-900 dark:text-gray-100">
              {product.price}
            </p>
            <div className="my-4">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2 my-1 text-gray-700 dark:text-gray-300"
                >
                  <CheckSquare size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button color="primary" className="mt-4 w-full">
              Buy
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
