import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import switchReducer from './reducer/switch.slice';
import userReducer from './reducer/users.slice';

export const store = configureStore({
    reducer : {
        switch : switchReducer,
        users : userReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()