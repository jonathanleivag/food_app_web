import { MetaProduct, Product } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  products: Product[];
  meta: MetaProduct;
}

const initialState: ProductState = {
  products: [],
  meta: {
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setMeta: (state, action: PayloadAction<MetaProduct>) => {
      state.meta = action.payload;
    },
    addTotalPages: (state) => {
      state.meta.totalPages++;
    },
    addPage: (state) => {
      state.meta.page++;
    },
    setHasNextPage: (state, action: PayloadAction<boolean>) => {
      state.meta.hasNextPage = action.payload;
    },
  },
});

export const {
  initial,
  addProduct,
  setMeta,
  addTotalPages,
  addPage,
  setHasNextPage,
} = productSlice.actions;

export default productSlice.reducer;
