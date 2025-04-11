import { Product } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addOrder: (state, action: PayloadAction<Product>) => {},
    removeOrder: (state, action: PayloadAction<Product>) => {},
  },
});

export const { initial, addOrder, removeOrder } = productSlice.actions;

export default productSlice.reducer;
