import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users , User } from "../../types/type";
import axiosConfig from "../../utils/axiosConfig";
import { getItem, removeItem, setItem } from "../../utils/useLocalStorage";
interface UserState {
    users : Users[],
    loading : boolean,
    error : any,
    user : any,
    success : any,
    userById : any
}
export const loginUser = createAsyncThunk<User , any>('loginUser' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/login' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});
export const registerUser = createAsyncThunk<Users , any>('/CreateUsers' , async(data, thunkAPI) => {
    try {
       const response = await axiosConfig.post('/users', data);
       return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});



//admin

export const getAllUsersAdmin = createAsyncThunk<Users[]>(
    "/admin/getAllAdminUsers",
    async (_, thunkAPI) => {
        try {
            const response = await axiosConfig.get("/admin/users");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const CreateUsersAdmin = createAsyncThunk<Users , any>(
    "/admin/CreateUsersAdmin",
    async (data, thunkAPI) => {
        try {
            const response = await axiosConfig.post("/admin/users" , data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const GetUserById =  createAsyncThunk<Users , any>(
    "/admin/getUserById",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`/admin/users/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const UpdatedAdminUser = createAsyncThunk<Users , any>(
    "/admin/UpdatedAdminUser",
    async (data, thunkAPI) => {
        try {
            const response = await axiosConfig.patch("/admin/users" , data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)





const initialState : UserState = {
    users : [],
    loading : false,
    error : null,
    user : getItem('user') || null,
    success : null,
    userById : null
}
const userSlice = createSlice({
    name : "users",
    initialState : initialState,
    reducers : {
        LogoutUser : (state) => {
            state.user = null
            removeItem('user')
        },
        ClearError : (state) => {
            state.error = null
        },
        ClearSuccess : (state) => {
            state.success = null
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending , (state) => {
            state.loading = true
        }).addCase(loginUser.fulfilled , (state, action) => {
            state.loading = false
            if(action.payload.success){
                state.user = action.payload
                setItem('user', state.user)
            }else{
                state.error = action.payload;
            }
        }).addCase(loginUser.rejected , (state, action : any) => {
            state.error = action.payload.data
            state.loading = false
        }).addCase(registerUser.pending , (state) => {
            state.loading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload.success
        }).addCase(registerUser.rejected , (state, action : any) => {
            state.loading = false
            state.error = action.payload.data
        }).addCase(getAllUsersAdmin.pending , (state) => {
            state.loading = true
        }).addCase(getAllUsersAdmin.fulfilled, (state, action : any) => {
            state.loading = false
            state.users = action.payload.data
        }).addCase(getAllUsersAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(CreateUsersAdmin.pending , (state) => {
            state.loading = true
        }).addCase(CreateUsersAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload
        }).addCase(CreateUsersAdmin.rejected , (state, action : any) => {
            state.loading = false
            state.error = action.payload.data
        }).addCase(GetUserById.pending , (state) => {
            state.loading = true
        }).addCase(GetUserById.fulfilled , (state , action) => {
            state.loading = false
            state.userById = action.payload
        }).addCase(GetUserById.rejected , (state, action) => {
            state.loading = false
            state.error = action.payload
        }).addCase(UpdatedAdminUser.fulfilled , (state, action : any) => {
            state.success = action.payload.message;
        }).addCase(UpdatedAdminUser.rejected , (state , action : any) => {
            state.error = action.payload.data
        })
    }
})

export const {  LogoutUser , ClearError , ClearSuccess } =  userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer