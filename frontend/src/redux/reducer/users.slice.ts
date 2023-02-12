import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Users , User } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";
import { getItem, removeItem, setItem } from "../../utils/useLocalStorage";
interface UserState {
    users : Users[],
    loading : boolean,
    error : any,
    user : any,
    success : any,
    userById : any,
    deleteSuccess : any,
    tokenExpiredError : any,
    userByEmail : any
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

export const forgotPassword = createAsyncThunk<User , any>('forgotPassword' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/forgot-password' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const resetPassword = createAsyncThunk<User , any>('resetPassword' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post(`/reset-password/${data.email}` , data.password);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const updateProfile = createAsyncThunk<User , any>('updateProfile' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.patch("/update-profile" , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const GetUserByEmail =  createAsyncThunk<Users , any>(
    "GetUserByEmail",
    async (email, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`user/${email}` , );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateProfilePic = createAsyncThunk<User , any>('updateProfilePic' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post("/image-profile" , data);
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

export const DeleteAdminUser = createAsyncThunk<Users , any>(
    "/admin/DeleteAdminUser",
    async (data, thunkAPI) => {
        try {
            const response = await axiosConfig.delete("/admin/users" , data);
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
    userById : null,
    deleteSuccess : null,
    tokenExpiredError : null,
    userByEmail : null
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
        },
        ClearDelete : (state) => {
            state.deleteSuccess = null
        },
        CleartokenExpiredError : (state) => {
            state.tokenExpiredError = null
        }
    },
    extraReducers(builder) {
        builder.addCase(loginUser.pending , (state) => {
            state.loading = true
        }).addCase(loginUser.fulfilled , (state, action) => {
            state.loading = false
            if(action.payload.success){
                state.user = action.payload;
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
            state.users = action.payload.data;
        }).addCase(getAllUsersAdmin.rejected, (state, action : any) => {
            state.loading = false;
            state.tokenExpiredError = action.payload.data.name;
        }).addCase(CreateUsersAdmin.pending , (state) => {
            state.loading = true
        }).addCase(CreateUsersAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.success = action.payload
        }).addCase(CreateUsersAdmin.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(GetUserById.pending , (state) => {
            state.loading = true
        }).addCase(GetUserById.fulfilled , (state , action) => {
            state.loading = false
            state.userById = action.payload
        }).addCase(GetUserById.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name;
        }).addCase(UpdatedAdminUser.fulfilled , (state, action : any) => {
            state.success = action.payload.message;
        }).addCase(UpdatedAdminUser.rejected , (state , action : any) => {
            state.tokenExpiredError = action.payload.data.name
        }).addCase(DeleteAdminUser.fulfilled , (state, action : any) => {
            state.deleteSuccess = action.payload.message;
        }).addCase(DeleteAdminUser.rejected, (state , action : any) => {
            state.tokenExpiredError = action.payload.data.name
        }).addCase(forgotPassword.pending , (state) => {
            state.loading = true;
        }).addCase(forgotPassword.fulfilled , (state, action : any) => {
            state.success = action.payload;
        }).addCase(forgotPassword.rejected , (state, action : any) => {
            state.error = action.payload.data;
        }).addCase(resetPassword.pending , (state) => {
            state.loading = true;
        }).addCase(resetPassword.fulfilled , (state, action : any) => {
            state.success = action.payload;
        }).addCase(resetPassword.rejected , (state, action : any) => {
            state.error = action.payload.data;
        }).addCase(updateProfile.pending , (state) => {
            state.loading = true
        }).addCase(updateProfile.fulfilled, (state, action : any) => {
            state.loading = false
            state.success = action.payload.message
        }).addCase(updateProfile.rejected , (state, action : any) => {
            state.loading = false
            state.error = action.payload.data
        }).addCase(GetUserByEmail.pending , (state) => {
            state.loading = true
        }).addCase(GetUserByEmail.fulfilled , (state , action : any) => {
            state.loading = false
            state.userByEmail = action.payload.data
            setItem('userbyemail', state.userByEmail);
        }).addCase(GetUserByEmail.rejected , (state, action : any) => {
            state.loading = false
            state.error = action.payload.data;
        }).addCase(updateProfilePic.pending , (state) => {
            state.loading = true
        }).addCase(updateProfilePic.fulfilled, (state, action : any) => {
            state.loading = false
            state.success = action.payload.message
        }).addCase(updateProfilePic.rejected , (state, action : any) => {
            state.loading = false
            state.error = action.payload.data
        })
    }
})

export const {  LogoutUser , ClearError , ClearSuccess , ClearDelete , CleartokenExpiredError } =  userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer