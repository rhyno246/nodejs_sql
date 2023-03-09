import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Posts, StoriesById, Story } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";


interface HomeState {
    posts : Posts[],
    story : Story[],
    loading : boolean,
    error : any,
    success : any,
    soccer : Posts[],
    basketball : Posts[],
    guess : Posts[],
    behind : Posts[],
    transfer : Posts[],
    newsgame : Posts[],
    listChildImage : StoriesById[],
    StoriesDetail : any
}

export const getHomeClientPost = createAsyncThunk<Posts[]>('/client/getHomeClientPost' , async(_, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/news');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getClientStories = createAsyncThunk<Story[]>('/admin/getClientStories' , async(_, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/admin/stories');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});



export const getHomeSoccer = createAsyncThunk<Posts , any>('/client/getHomeSoccer' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/news/category/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getHomeBasketball = createAsyncThunk<Posts , any>('/client/getHomeBasketball' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/news/category/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getHomeGuess = createAsyncThunk<Posts , any>('/client/getHomeGuess' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/news/category/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getHomeBehind = createAsyncThunk<Posts , any>('/client/getHomeBehind' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/news/category/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getHomeTransfer = createAsyncThunk<Posts , any>('/client/getHomeTransfer' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/news/category/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getHomeNewsGame = createAsyncThunk<Posts , any>('/client/getHomeNewsGame' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/news/category/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getClientListImage = createAsyncThunk<StoriesById, any>('/client/getClientListImage' , async( id , thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/stories/list/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getClientStoriesDetail = createAsyncThunk<StoriesById, any>('/client/getClientStoriesDetail' , async( id , thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/stories/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});




const initialState : HomeState = {
    posts : [],
    story : [],
    loading : false,
    error : null,
    success : null,
    soccer : [],
    basketball :[],
    guess :[],
    behind : [],
    transfer : [],
    newsgame : [],
    listChildImage : [],
    StoriesDetail : null
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
        }
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
            state.story = action.payload.data;
        }).addCase(getClientStories.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getHomeSoccer.pending , (state) => {
            state.loading = true
        }).addCase(getHomeSoccer.fulfilled, (state, action : any) => {
            state.loading = false
            state.soccer = action.payload.data;
        }).addCase(getHomeSoccer.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getHomeBasketball.pending , (state) => {
            state.loading = true
        }).addCase(getHomeBasketball.fulfilled, (state, action : any) => {
            state.loading = false
            state.basketball = action.payload.data;
        }).addCase(getHomeBasketball.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getHomeGuess.pending , (state) => {
            state.loading = true
        }).addCase(getHomeGuess.fulfilled, (state, action : any) => {
            state.loading = false
            state.guess = action.payload.data;
        }).addCase(getHomeGuess.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getHomeBehind.pending , (state) => {
            state.loading = true
        }).addCase(getHomeBehind.fulfilled, (state, action : any) => {
            state.loading = false
            state.behind = action.payload.data;
        }).addCase(getHomeBehind.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getHomeTransfer.pending , (state) => {
            state.loading = true
        }).addCase(getHomeTransfer.fulfilled, (state, action : any) => {
            state.loading = false
            state.transfer = action.payload.data;
        }).addCase(getHomeTransfer.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getHomeNewsGame.pending , (state) => {
            state.loading = true
        }).addCase(getHomeNewsGame.fulfilled, (state, action : any) => {
            state.loading = false
            state.newsgame = action.payload.data;
        }).addCase(getHomeNewsGame.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getClientListImage.pending , (state) => {
            state.loading = true
        }).addCase(getClientListImage.fulfilled, (state, action : any) => {
            state.loading = false
            state.listChildImage = action.payload.data;
        }).addCase(getClientListImage.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(getClientStoriesDetail.pending , (state) => {
            state.loading = true
        }).addCase(getClientStoriesDetail.fulfilled, (state, action : any) => {
            state.loading = false
            state.StoriesDetail = action.payload.data;
        }).addCase(getClientStoriesDetail.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        })
    }
})

export const { ClearSuccess , ClearError  } =  homeSlice.actions;
const homeReducer = homeSlice.reducer;
export default homeReducer