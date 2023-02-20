import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import categoryReducer from './reducer/category.slice';
import postReducer from './reducer/posts.slice';
import switchReducer from './reducer/switch.slice';
import userReducer from './reducer/users.slice';

export const store = configureStore({
    reducer : {
        switch : switchReducer,
        users : userReducer,
        posts : postReducer,
        category : categoryReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;