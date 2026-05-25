import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  name: string;
  emailId?: string;
  phoneNumber?: string;
}

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAdmin: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User | null; isAdmin?: boolean }>
    ) => {
      state.user = action.payload.user;
      if (action.payload.isAdmin !== undefined) {
        state.isAdmin = action.payload.isAdmin;
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAdmin = false;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setInitialized } = authSlice.actions;
export default authSlice.reducer;
