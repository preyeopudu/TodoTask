import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  auth: boolean;
  user: string | null;
}

const initialState: AuthState = {
  user: null,
  auth: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = true;
      state.user = action.payload;
    },
    logout: state => {
      state.auth = false;
    },
  },
});

export const {login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;
