import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Posts } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";

interface PostState {
    posts : Posts[],
    loading : boolean,
    error : any,
    success : any,
    deleteSuccess : any,
    tokenExpiredError : any,
    postById : any,
}

export const createPosts = createAsyncThunk<Posts , any>('/admin/createPosts' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/admin/post' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});


export const getAdminPost = createAsyncThunk<Posts[]>('/admin/getAdminPost' , async(_, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/admin/post');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const DeleteAdminPost = createAsyncThunk<Posts , any>(
    "/admin/DeleteAdminPost",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.delete(`/admin/post/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const GetPostAdminById =  createAsyncThunk<Posts , any>(
    "/admin/GetPostAdminById",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`/admin/post/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateAdminPost = createAsyncThunk<Posts , any>('/admin/updateAdminPost' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.patch('/admin/post' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});



const initialState : PostState = {
    posts : [],
    loading : false,
    error : null,
    success : null,
    deleteSuccess : null,
    tokenExpiredError : null,
    postById : null
}
const postSlice = createSlice({
    name : "posts",
    initialState : initialState,
    reducers : {
        ClearSuccess : (state) => {
            state.success = null
        },
        ClearDelete : (state) => {
            state.deleteSuccess = null
        },
        ClearError : (state) => {
            state.error = null
        },
    },
    extraReducers(builder) {
        builder.addCase(createPosts.pending , (state) => {
            state.loading = true
        }).addCase(createPosts.fulfilled , (state, action) => {
            state.loading = false
            state.success = action.payload
        }).addCase(createPosts.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getAdminPost.pending , (state) => {
            state.loading = true
        }).addCase(getAdminPost.fulfilled, (state, action : any) => {
            state.loading = false
            state.posts = action.payload.data;
        }).addCase(getAdminPost.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(DeleteAdminPost.fulfilled , (state, action : any) => {
            state.success = action.payload;
        }).addCase(DeleteAdminPost.rejected, (state , action : any) => {
            state.tokenExpiredError = action.payload.data.name
        }).addCase(GetPostAdminById.pending , (state) => {
            state.loading = true
        }).addCase(GetPostAdminById.fulfilled , (state , action) => {
            state.loading = false
            state.postById = action.payload
        }).addCase(GetPostAdminById.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name;
        }).addCase(updateAdminPost.pending , (state) => {
            state.loading = true
        }).addCase(updateAdminPost.fulfilled, (state, action : any) => {
            state.loading = false
            state.success = action.payload
        }).addCase(updateAdminPost.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer