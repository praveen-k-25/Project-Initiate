import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface initialState {
  auth: boolean;
  user: {
    email: string;
    username: string;
    id: string;
  };
  theme: string | null;
  map: string;
}

const initialState: initialState = {
  auth: false,
  user: {
    email: "",
    username: "",
    id: "",
  },
  theme: "",
  map: "street",
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
    setMaps: (state, action: PayloadAction<string>) => {
      state.map = action.payload;
    },
    setLogout: (state) => {
      state.auth = false;
      state.user = {
        email: "",
        username: "",
        id: "",
      };
    },
  },
});

export const { setAuth, setUser, setSliceTheme, setMaps, setLogout } =
  authSlice.actions;
export default authSlice.reducer;
