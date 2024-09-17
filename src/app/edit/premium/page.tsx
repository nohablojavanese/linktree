import ProductList from "@/components/BuyButton";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 text-blue-500">
      <h1 className="text-2xl font-bold mb-4">Our Products</h1>
      <ProductList />
    </div>
  );
}
