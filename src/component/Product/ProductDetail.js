import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducer/cartSlice";
import { Star, ArrowLeft, ShoppingCart, SquareCheckBig } from "lucide-react";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const inCart = !!cartItems[id];

 useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || err.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product)
    return (
      <div className="text-center py-10 text-gray-500">No product found</div>
    );

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors duration-200"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="bg-white shadow-lg rounded-2xl p-2 md:p-4 flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl p-6">
            <img
              src={product.image}
              alt={product.title}
              className="w-64 md:w-80 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                {product.category}
              </span>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {product.title}
              </h2>

              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.round(product.rating?.rate)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating?.rate} ({product.rating?.count} reviews)
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-3xl font-bold text-blue-700">
                  ${product.price}
                </span>
                <span className="text-sm text-gray-500">incl. taxes</span>
              </div>
            </div>

            {inCart ? (
              <Link
                to="/cart"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
              >
                 <SquareCheckBig size={18} className="mb-[1px]"/> Go to Cart
              </Link>
            ) : (
              <button
                onClick={() => dispatch(addToCart(product))}
               className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-sm"
              >
                 <ShoppingCart size={18} className="mb-[1px]" /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
