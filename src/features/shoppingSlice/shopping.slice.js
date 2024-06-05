import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  userInfo: null,
  totalQuantity: 0,
  totalPrice: 0,
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const alreadyExists = state.products.find(
        (item) => item._id === payload._id
      );
      if (alreadyExists) {
        alreadyExists.quantity += payload.quantity;
      } else {
        state.products.push(payload);
      }
    },
    increaseQuantity: (state, { payload }) => {
      const existingProduct = state.products.find(
        (item) => item._id === payload._id
      );
      existingProduct && existingProduct.quantity++;
    },
    decreaseQuantity: (state, { payload }) => {
      const existingProduct = state.products.find(
        (item) => item._id === payload._id
      );
      if (existingProduct?.quantity === Number(1)) {
        existingProduct.quantity = 1;
      } else {
        existingProduct && existingProduct.quantity--;
      }
    },
    deleteProduct: (state, { payload }) => {
      state.products = state.products.filter(
        (item) => item._id !== payload._id
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    submitTotalQuantity: (state, {payload}) => {
      state.totalQuantity = payload;
    },
    submitTotalPrice: (state, {payload}) => {
      state.totalPrice = payload;
    },
    addUser: (state, {payload}) => {
      state.userInfo = payload;
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  submitTotalPrice,
  submitTotalQuantity,
  addUser,
  deleteUser,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
