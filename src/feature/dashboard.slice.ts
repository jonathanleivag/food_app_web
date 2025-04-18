import { Card } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  carts: Card[];
}

const initialState: DashboardState = {
  carts: [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<Card[]>) => {
      state.carts = action.payload;
    },
  },
});

export const { initial } = dashboardSlice.actions;

export default dashboardSlice.reducer;
