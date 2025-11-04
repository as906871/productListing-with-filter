import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducer/cartSlice";
import { ShoppingCart, SquareCheckBig } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const inCart = !!cartItems[product.id];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex-1">
        <div className="h-44 flex items-center justify-center overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h3 className="mt-4 text-sm font-semibold line-clamp-2 h-10">
          {product.title}
        </h3>
        <div className="mt-2 text-lg font-bold text-blue-700">
          ${product.price}
        </div>
      </Link>

      {inCart ? (
        <Link
          to="/cart"
          className="mt-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-sm"
        >
          <SquareCheckBig size={18} className="mb-[1px]"/> Go to Cart
          
        </Link>
      ) : (
        <button
          onClick={() => dispatch(addToCart(product))}
           className="mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-200 shadow-sm"
        >
          <ShoppingCart size={18} className="mb-[1px]" /> Add to Cart
        </button>
      )}
    </div>
  );
};
export default ProductCard;
