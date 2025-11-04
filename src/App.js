import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./component/Product/Home";
import ProductDetail from "./component/Product/ProductDetail";
import CartPage from "./component/cart/cartPage";
import CartDrawer from "./component/cart/CartDrawer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Store
          </Link>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500 border-t mt-12">
        © {new Date().getFullYear()} Store. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
