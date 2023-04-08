import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthReducer';
import LoadingReducer from './reducers/LoadingReducer';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    isLoading: LoadingReducer,
  },
});

export default store;
