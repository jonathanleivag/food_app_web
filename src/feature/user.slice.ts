import { User } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  role: string;
  users: User[];
  workers: User[];
  admins: User[];
}

const initialState: UserState = {
  name: "?",
  role: "",
  users: [],
  workers: [],
  admins: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initial: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    initialUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    initialWorkers: (state, action: PayloadAction<User[]>) => {
      state.workers = action.payload;
    },
    removeWorkers: (state, action: PayloadAction<User>) => {
      state.workers = state.workers.filter(
        (worker) => worker.id !== action.payload.id
      );
    },
    initialAdmins: (state, action: PayloadAction<User[]>) => {
      state.admins = action.payload;
    },
    addWorkers: (state, action: PayloadAction<User>) => {
      state.workers.push(action.payload);
    },
  },
});

export const {
  initial,
  initialUsers,
  initialWorkers,
  addWorkers,
  setRole,
  initialAdmins,
  removeWorkers,
} = userSlice.actions;

export default userSlice.reducer;
