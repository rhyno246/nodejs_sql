import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users } from "../../types/type";
import axiosConfig from "../../utils/axiosConfig";
interface UserState {
    users : Users[]
}

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, thunkApi) => {
    const res = await axiosConfig.get<Users[]>('/users' ,{ 
        signal : thunkApi.signal
    })
    return res.data
})

const initialState : UserState = {
    users : []
}
const userSlice = createSlice({
    name : "users",
    initialState : initialState,
    reducers : {
    },
    extraReducers(builder) {
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})

export const { } =  userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer