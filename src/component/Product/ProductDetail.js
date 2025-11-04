import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducer/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const inCart = !!cartItems[id];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row gap-6">
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-64 h-64 object-contain"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-3">{product.title}</h2>
        <p className="text-gray-600 mb-3">{product.description}</p>
        <p className="text-xl font-semibold mb-5">${product.price}</p>

        {inCart ? (
          <Link
            to="/cart"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
          >
            Go to Cart
          </Link>
        ) : (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
