import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  auth: boolean;
  user: object | null;
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
  },
});

export const {login} = AuthSlice.actions;
export default AuthSlice.reducer;
