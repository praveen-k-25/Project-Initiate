import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  auth: boolean;
  user: {
    email: string;
    username: string;
    id: string;
  };
  theme: string | null;
}

const initialState: initialState = {
  auth: false,
  user: {
    email: "",
    username: "",
    id: "",
  },
  theme: "",
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
    setSliceTheme: (state, action: PayloadAction<string | null>) => {
      state.theme = action.payload;
    },
    logout: (state) => {
      state.auth = false;
    },
  },
});

export const { setAuth, setUser, setSliceTheme, logout } = authSlice.actions;
export default authSlice.reducer;
