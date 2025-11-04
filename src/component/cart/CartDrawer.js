import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  setQty,
} from "../../redux/reducer/cartSlice";
import { Link } from "react-router";

const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const cart = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const items = Object.values(cart);
  const subtotal = items.reduce((s, it) => s + it.product.price * it.qty, 0);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
      >
        Cart ({items.length})
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 z-50 animate-slideIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-blue-700">Shopping Cart</h3>
            <div className="text-sm text-gray-600 font-medium">
              Total: ${subtotal.toFixed(2)}
            </div>
          </div>

          <div className="space-y-4 max-h-64 overflow-auto pr-2">
            {items.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Cart is empty
              </div>
            )}
            {items.map((it) => (
              <div
                key={it.product.id}
                className="flex items-center gap-3 border-b pb-3"
              >
                <img
                  src={it.product.image}
                  className="w-12 h-12 object-contain rounded"
                  alt={it.product.title}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{it.product.title}</div>
                  <div className="text-xs text-gray-500">
                    ${it.product.price}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      dispatch(setQty({ id: it.product.id, qty: it.qty - 1 }))
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-sm">
                    {it.qty}
                  </span>
                  <button
                    onClick={() =>
                      dispatch(setQty({ id: it.product.id, qty: it.qty + 1 }))
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(it.product.id))}
                  className="text-red-600 hover:text-red-700 text-xs ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="mt-5 flex justify-end items-center">
            <Link
              to="/cart"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
              onClick={() => setOpen(false)}
            >
              View Cart
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
