import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  auth: boolean;
  user: {
    email: string;
    username: string;
    id: string;
  };
}

const initialState: initialState = {
  auth: false,
  user: {
    email: "",
    username: "",
    id: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.auth = false;
    },
  },
});

export const { setAuth, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
