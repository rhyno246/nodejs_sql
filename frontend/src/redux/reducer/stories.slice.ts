import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Stories, StoriesById } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";

interface StoriesState {
    stories : Stories[],
    loading : boolean,
    error : any,
    success : any,
    deleteSuccess : any,
    tokenExpiredError : any,
    StoriesById : StoriesById[],
}

const initialState : StoriesState = {
    stories : [],
    loading : false,
    error : null,
    success : null,
    deleteSuccess : null,
    tokenExpiredError : null,
    StoriesById : []
}

export const createStories = createAsyncThunk<Stories , any>('/admin/createStories' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/admin/stories' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});


export const createListImage = createAsyncThunk<StoriesById , any>('/admin/createListImage' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/admin/list' , data);
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

export const getAdminListImage = createAsyncThunk<StoriesById[], string>('/admin/getAdminListImage' , async( id , thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/admin/list/${id}`);
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
        }).addCase(createListImage.pending , (state) => {
            state.loading = true
        }).addCase(createListImage.fulfilled , (state, action) => {
            state.loading = false
            state.success = action.payload
        }).addCase(createListImage.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getAdminListImage.pending , (state) => {
            state.loading = true
        }).addCase(getAdminListImage.fulfilled, (state, action : any) => {
            state.loading = false
            state.StoriesById = action.payload.data;
        }).addCase(getAdminListImage.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  StoriesSlice.actions;
const storiesReducer = StoriesSlice.reducer;
export default storiesReducer