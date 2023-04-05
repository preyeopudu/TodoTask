import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

export const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const {setLoading} = LoadingSlice.actions;
export default LoadingSlice.reducer;
