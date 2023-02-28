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
    listChildImage : any,
    StoriesDetail : any
}

const initialState : StoriesState = {
    stories : [],
    loading : false,
    error : null,
    success : null,
    deleteSuccess : null,
    tokenExpiredError : null,
    StoriesById : [],
    listChildImage : null,
    StoriesDetail : null
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

export const getAdminListChildImage = createAsyncThunk<StoriesById, string>('/admin/getAdminListChildImage' , async( id , thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/admin/list/child/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const updateAdminListChildImage = createAsyncThunk<StoriesById , any>('/admin/updateAdminListChildImage' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.patch('/admin/list/child' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getAdminStoriesDetail = createAsyncThunk<StoriesById[], string>('/admin/getAdminStoriesDetail' , async( id , thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/admin/stories/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const updateAdminStories = createAsyncThunk<StoriesById , any>('/admin/updateAdminStories' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.patch('/admin/stories' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const deleteAdminStories = createAsyncThunk<StoriesById[], string>('/admin/deleteAdminStories' , async( id , thunkAPI) => {
    try {
        const response = await axiosConfig.delete(`/admin/list/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const deleteStories = createAsyncThunk<StoriesById , any>('/admin/deleteStories' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.delete(`/admin/stories/${id}`);
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
        }).addCase(getAdminListChildImage.pending , (state) => {
            state.loading = true
        }).addCase(getAdminListChildImage.fulfilled, (state, action : any) => {
            state.loading = false
            state.listChildImage = action.payload.data;
        }).addCase(getAdminListChildImage.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(updateAdminListChildImage.pending , (state) => {
            state.loading = true
        }).addCase(updateAdminListChildImage.fulfilled, (state, action : any) => {
            state.loading = false
            state.success = action.payload
        }).addCase(updateAdminListChildImage.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getAdminStoriesDetail.pending , (state) => {
            state.loading = true
        }).addCase(getAdminStoriesDetail.fulfilled, (state, action : any) => {
            state.loading = false
            state.StoriesDetail = action.payload.data;
        }).addCase(getAdminStoriesDetail.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(updateAdminStories.pending , (state) => {
            state.loading = true
        }).addCase(updateAdminStories.fulfilled, (state, action : any) => {
            state.loading = false
            state.success = action.payload
        }).addCase(updateAdminStories.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(deleteAdminStories.fulfilled , (state, action : any) => {
            state.success = action.payload;
        }).addCase(deleteAdminStories.rejected, (state , action : any) => {
            state.tokenExpiredError = action.payload.data.name
        }).addCase(deleteStories.fulfilled , (state, action : any) => {
            state.success = action.payload;
        }).addCase(deleteStories.rejected, (state , action : any) => {
            state.tokenExpiredError = action.payload.data.name
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  StoriesSlice.actions;
const storiesReducer = StoriesSlice.reducer;
export default storiesReducer