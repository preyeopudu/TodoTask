import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthReducer';
import LoadingReducer from './reducers/LoadingReducer';
import UserReducer from './reducers/UserReducer';

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    isLoading: LoadingReducer,
    user: UserReducer,
  },
});

export default store;
