import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../feature/order.slice";
import productReducer from "../feature/product.slice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
