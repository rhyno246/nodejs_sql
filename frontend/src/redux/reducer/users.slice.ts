import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users , User } from "../../types/type";
import axiosConfig from "../../utils/axiosConfig";
import { getItem, setItem } from "../../utils/useLocalStorage";
interface UserState {
    users : Users[],
    loading : boolean,
    error : any,
    user : object
}
export const getAllUsers = createAsyncThunk<Users[]>(
    "users/getAllUsers",
    async (_, thunkAPI) => {
        try {
            const response = await axiosConfig.get("/users");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const loginUser = createAsyncThunk<User , Object>('users/loginUser' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('users/login' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


const initialState : UserState = {
    users : [],
    loading : false,
    error : null,
    user : getItem('user') || null
}
const userSlice = createSlice({
    name : "users",
    initialState : initialState,
    reducers : {
    },
    extraReducers(builder) {
        builder.addCase(getAllUsers.pending , (state) => {
            state.loading = true
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false;
        }).addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload
        }).addCase(loginUser.pending , (state) => {
            state.loading = true;
        }).addCase(loginUser.fulfilled , (state, action) => {
            if(action.payload.success){
                state.user = action.payload;
                setItem('user', state.user)
            }else{
                state.error = action.payload;
            }
        }).addCase(loginUser.rejected , (state, action) => {
            state.error = action.payload
        })
    }
})

export const { } =  userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer