import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: { products: [], quantity: 0, total: 0 },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      if (state.quantity > 0) {
        state.quantity = 0;
      }
      state.total -= action.payload.price * action.payload.quantity;
    },
  },
});
export const { addProduct, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
