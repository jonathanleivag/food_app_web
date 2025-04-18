import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../feature/order.slice";
import productReducer from "../feature/product.slice";
import userReducer from "../feature/user.slice";
import dashboardReducer from "../feature/dashboard.slice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    product: productReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
