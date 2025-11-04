import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products.length)
    return <div className="text-center py-20">No products found</div>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductGrid;
