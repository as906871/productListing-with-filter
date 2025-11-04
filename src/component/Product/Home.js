import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
} from "../../redux/reducer/productSlice";
import ProductGrid from "../Product/ProductGrid";

const Home = () => {
  const dispatch = useDispatch();
  const { items, status, error, categories } = useSelector((s) => s.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  useEffect(() => {
    if (items.length > 0) {
      const prices = items.map((p) => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setPriceRange({ min, max });
      setMaxPrice(max);
    }
  }, [items]);

  const products = useMemo(() => {
    let p = items.slice();

    if (search)
      p = p.filter((x) => x.title.toLowerCase().includes(search.toLowerCase()));

    if (category !== "all") p = p.filter((x) => x.category === category);

    if (minPrice > 0 || maxPrice < priceRange.max) {
      p = p.filter((x) => x.price >= minPrice && x.price <= maxPrice);
    }
    return p;
  }, [items, search, category, minPrice, maxPrice, priceRange.max]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 rounded-xl shadow-inner">
      <div className="mb-6 bg-white p-6 rounded-2xl shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Search for products..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition duration-200"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm capitalize"
            >
              {["all", ...categories].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col w-1/2">
              <label className="text-xs text-gray-500 mb-1">
                Minimum Price
              </label>
              <input
                type="number"
                min={priceRange.min}
                max={maxPrice - 1}
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 hover:border-gray-400"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-xs text-gray-500 mb-1">
                Maximum Price
              </label>
              <input
                type="number"
                min={minPrice + 1}
                max={priceRange.max}
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 hover:border-gray-400"
              />
            </div>
          </div>

          {products.length === 0 && (
            <p className="text-xs text-red-500 mt-2 text-center font-medium">
              ⚠️ No products found between ${minPrice} – ${maxPrice}
            </p>
          )}
        </div>
      </div>

      {status === "loading" && (
        <div className="text-center py-20 text-gray-600 animate-pulse">
          Loading products...
        </div>
      )}
      {status === "failed" && (
        <div className="text-center py-20 text-red-600 font-medium">
          Error: {error}
        </div>
      )}
      {status === "succeeded" && (
        <div>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20 text-gray-500 font-medium">
              No products found matching your filters 😕
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
