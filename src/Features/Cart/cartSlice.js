import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addNewItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item.quantity === 1) return;
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addNewItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getQuantity = (state) => state.cart.cart.quantity;

export const getUser = (state) => state.user.userName;

export const getTotalQuantity = (state) => {
  return state.cart.cart.reduce((accV, prevV) => {
    accV += prevV.quantity;
    return accV;
  }, 0);
};

export const getTotalPrice = (state) => {
  return state.cart.cart.reduce((accP, prevP) => {
    return (accP += prevP.totalPrice);
  }, 0);
};

export const getIfIncludes = (id) => (state) => {
  return state.cart.cart.map((item) => item.pizzaId).includes(id);
};

export const getPizzaQty = (id) => (state) => {
  return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? null;
};

export default cartSlice.reducer;
