import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Posts } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";

interface PostState {
    posts : Posts[],
    loading : boolean,
    error : any,
    success : any,
    deleteSuccess : any,
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


const initialState : PostState = {
    posts : [],
    loading : false,
    error : null,
    success : null,
    deleteSuccess : null,
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
            state.error = action.payload.data
        }).addCase(getAdminPost.pending , (state) => {
            state.loading = true
        }).addCase(getAdminPost.fulfilled, (state, action : any) => {
            state.loading = false
            state.posts = action.payload.data;
        }).addCase(getAdminPost.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  postSlice.actions;
const postReducer = postSlice.reducer;
export default postReducer