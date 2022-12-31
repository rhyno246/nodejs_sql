import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users , User } from "../../types/type";
import axiosConfig from "../../utils/axiosConfig";
import { getItem, removeItem, setItem } from "../../utils/useLocalStorage";
interface UserState {
    users : Users[],
    loading : boolean,
    error : any,
    user : any,
    success : any
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

export const loginUser = createAsyncThunk<User , any>('users/loginUser' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('users/login' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});
export const registerUser = createAsyncThunk<Users , any>('/users' , async(data, thunkAPI) => {
    try {
       const response = await axiosConfig.post('/users', data);
       return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});



const initialState : UserState = {
    users : [],
    loading : false,
    error : null,
    user : getItem('user') || null,
    success : null
}
const userSlice = createSlice({
    name : "users",
    initialState : initialState,
    reducers : {
        LogoutUser : (state) => {
            state.user = null
            removeItem('user')
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllUsers.pending , (state) => {
            state.loading = true
        }).addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload;
            state.loading = false
        }).addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        }).addCase(loginUser.pending , (state) => {
            state.loading = true
        }).addCase(loginUser.fulfilled , (state, action) => {
            if(action.payload.success){
                state.user = action.payload
                setItem('user', state.user)
            }else{
                state.error = action.payload;
            }
        }).addCase(loginUser.rejected , (state, action) => {
            state.error = action.payload
        }).addCase(registerUser.pending , (state) => {
            state.loading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.success = action.payload.success
        }).addCase(registerUser.rejected , (state, action : any) => {
            state.error = action.payload.data
        })
    }
})

export const {  LogoutUser } =  userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer