import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Stories } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";

interface StoriesState {
    stories : Stories[],
    loading : boolean,
    error : any,
    success : any,
    deleteSuccess : any,
    tokenExpiredError : any,
    StoriesById : any,
}

const initialState : StoriesState = {
    stories : [],
    loading : false,
    error : null,
    success : null,
    deleteSuccess : null,
    tokenExpiredError : null,
    StoriesById : null
}

export const createStories = createAsyncThunk<Stories , any>('/admin/createStories' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/admin/stories' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getAdminStories = createAsyncThunk<Stories[]>('/admin/getAdminStories' , async(_, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/admin/stories');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});




const StoriesSlice = createSlice({
    name : "stories",
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
        builder.addCase(createStories.pending , (state) => {
            state.loading = true
        }).addCase(createStories.fulfilled , (state, action) => {
            state.loading = false
            state.success = action.payload
        }).addCase(createStories.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getAdminStories.pending , (state) => {
            state.loading = true
        }).addCase(getAdminStories.fulfilled, (state, action : any) => {
            state.loading = false
            state.stories = action.payload.data;
        }).addCase(getAdminStories.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  StoriesSlice.actions;
const storiesReducer = StoriesSlice.reducer;
export default storiesReducer