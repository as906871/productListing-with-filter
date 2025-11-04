import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const raw = localStorage.getItem("cart_v1");
    return raw ? JSON.parse(raw) : { items: {} };
  } catch (e) {
    return { items: {} };
  }
};

const saveCart = (state) => {
  try {
    localStorage.setItem("cart_v1", JSON.stringify(state));
  } catch (e) {}
};

const initialState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const id = product.id;
      if (!state.items[id]) state.items[id] = { product, qty: 0 };
      state.items[id].qty += 1;
      saveCart(state);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      delete state.items[id];
      saveCart(state);
    },
    setQty(state, action) {
      const { id, qty } = action.payload;
      if (state.items[id]) {
        state.items[id].qty = qty;
        if (state.items[id].qty <= 0) delete state.items[id];
      }
      saveCart(state);
    },
    clearCart(state) {
      state.items = {};
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, setQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
