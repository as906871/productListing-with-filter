import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  setQty,
} from "../../redux/reducer/cartSlice";

const CartPage = () => {
  const cart = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  const items = Object.values(cart);
  const total = items.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  if (!items.length)
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Your Cart</h2>

      <div className="space-y-6">
        {items.map((it) => (
          <div
            key={it.product.id}
            className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
          >
            <img
              src={it.product.image}
              alt={it.product.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-sm sm:text-base">
                {it.product.title}
              </h3>
              <p className="text-gray-500">${it.product.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  dispatch(setQty({ id: it.product.id, qty: it.qty - 1 }))
                }
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded"
              >
                -
              </button>
              <span className="font-semibold w-6 text-center">{it.qty}</span>
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
              className="text-red-600 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-gray-600 hover:text-red-600 transition"
        >
          Clear Cart
        </button>
        <div className="text-lg font-bold text-blue-700">
          Total: ${total.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
