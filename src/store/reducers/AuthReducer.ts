import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  auth: boolean;
}

const initialState: AuthState = {
  auth: false,
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => {
      state.auth = true;
    },
  },
});

export const {login} = AuthSlice.actions;
export default AuthSlice.reducer;
