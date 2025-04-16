import { User } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  users: User[];
}

const initialState: UserState = {
  name: "?",
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    initialUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { initial, initialUsers } = userSlice.actions;

export default userSlice.reducer;
