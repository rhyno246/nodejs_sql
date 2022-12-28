import { configureStore } from '@reduxjs/toolkit';
import switchReducer from './reducer/switch.reducer';

export const store = configureStore({
    reducer : {
        switch : switchReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =  typeof store.dispatch