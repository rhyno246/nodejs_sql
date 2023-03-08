import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Posts, Stories } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";

interface HomeState {
    posts : Posts[],
    stories : Stories[],
    loading : boolean,
    error : any,
    success : any,
}

export const getHomeClientPost = createAsyncThunk<Posts[]>('/client/getHomeClientPost' , async(_, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/news');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getClientStories = createAsyncThunk<Stories[]>('/admin/getClientStories' , async(_, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/admin/stories');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});




const initialState : HomeState = {
    posts : [],
    stories : [],
    loading : false,
    error : null,
    success : null,
}
const homeSlice = createSlice({
    name : "home",
    initialState : initialState,
    reducers : {
        ClearSuccess : (state) => {
            state.success = null
        },
        ClearError : (state) => {
            state.error = null
        },
    },
    extraReducers(builder) {
        builder.addCase(getHomeClientPost.pending , (state) => {
            state.loading = true
        }).addCase(getHomeClientPost.fulfilled, (state, action : any) => {
            state.loading = false
            state.posts = action.payload.data;
        }).addCase(getHomeClientPost.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getClientStories.pending , (state) => {
            state.loading = true
        }).addCase(getClientStories.fulfilled, (state, action : any) => {
            state.loading = false
            state.stories = action.payload.data;
        }).addCase(getClientStories.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        })
    }
})

export const { ClearSuccess , ClearError } =  homeSlice.actions;
const homeReducer = homeSlice.reducer;
export default homeReducer