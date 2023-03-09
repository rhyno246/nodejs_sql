import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";

interface CommentState {
    comments : Comment[],
    loading : boolean,
    error : any,
    success : any,
    deleteSuccess : any,
    tokenExpiredError : any,
    
}


const initialState : CommentState = {
    comments : [],
    loading : false,
    error : null,
    success : null,
    deleteSuccess : null,
    tokenExpiredError : null,
}

export const createComment = createAsyncThunk<Comment , any>('/createComment' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/comment' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getComment = createAsyncThunk<Comment[] , any>('/getComment' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/comment/all/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getAdminComment = createAsyncThunk<Comment[]>('/getAdminComment' , async(_, thunkAPI) => {
    try {
        const response = await axiosConfig.get('admin/comment');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const DeleteCommentAdmin = createAsyncThunk<Comment , any>('/DeleteCommentAdmin' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.delete(`/admin/comment/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getProfileComment = createAsyncThunk<Comment[] , any>('/getProfileComment' , async(id, thunkAPI) => {
    try {
        const response = await axiosConfig.get(`/comment/profile/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});







const CommentSlice = createSlice({
    name : "comment",
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
        builder.addCase(createComment.pending , (state) => {
            state.loading = true
        }).addCase(createComment.fulfilled , (state, action) => {
            state.loading = false
            state.success = action.payload
        }).addCase(createComment.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getComment.pending , (state) => {
            state.loading = true
        }).addCase(getComment.fulfilled , (state , action : any) => {
            state.loading = false
            state.comments = action.payload.data
        }).addCase(getComment.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name;
        }).addCase(getAdminComment.pending , (state) => {
            state.loading = true
        }).addCase(getAdminComment.fulfilled , (state , action : any) => {
            state.loading = false
            state.comments = action.payload.data
        }).addCase(getAdminComment.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name;
        }).addCase(DeleteCommentAdmin.fulfilled , (state, action : any) => {
            state.success = action.payload;
        }).addCase(DeleteCommentAdmin.rejected, (state , action : any) => {
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getProfileComment.pending , (state) => {
            state.loading = true
        }).addCase(getProfileComment.fulfilled , (state , action : any) => {
            state.loading = false
            state.comments = action.payload.data
        }).addCase(getProfileComment.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name;
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  CommentSlice.actions;
const commentReducer = CommentSlice.reducer;
export default commentReducer