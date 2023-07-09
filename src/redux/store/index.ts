import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from '../reducers/moviesReducer';

export const store = configureStore({
	reducer: { userState: usersReducer },
});

export type StoreType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
