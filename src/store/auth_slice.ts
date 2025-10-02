import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  auth: boolean;
  user: string;
}

const initialState: initialState = {
  auth: false,
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.auth = false;
    },
  },
});

export const { setAuth, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
