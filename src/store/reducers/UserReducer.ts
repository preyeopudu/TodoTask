import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  user: object;
}

const initialState: UserState = {
  user: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
});

export const {setUser} = UserSlice.actions;
export default UserSlice.reducer;
