import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/type";
import axiosConfig from "../axiosConfig/axiosConfig";

interface CategoryState {
    category : Category[],
    loading : boolean,
    error : any,
    success : any,
    deleteSuccess : any,
    tokenExpiredError : any,
    CategoryById : any,
    
}


const initialState : CategoryState = {
    category : [],
    loading : false,
    error : null,
    success : null,
    deleteSuccess : null,
    tokenExpiredError : null,
    CategoryById : null
}

export const createCategory = createAsyncThunk<Category , any>('/admin/createCategory' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.post('/admin/category' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const getAdminCategory = createAsyncThunk<Category[]>('/admin/getAdminCategory' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/admin/category');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const DeleteAdminCategory = createAsyncThunk<Category , any>(
    "/admin/DeleteAdminCategory",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.delete(`/admin/category/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const GetCategoryById =  createAsyncThunk<Category , any>(
    "/admin/GetCategoryById",
    async (id, thunkAPI) => {
        try {
            const response = await axiosConfig.get(`/admin/category/${id}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);



export const updateAdminCategory = createAsyncThunk<Category , any>('/admin/updateAdminCategory' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.patch('/admin/category' , data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

// client

export const getMenu = createAsyncThunk<Category[]>('/admin/getMenu' , async(data, thunkAPI) => {
    try {
        const response = await axiosConfig.get('/category');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});






const CategorySlice = createSlice({
    name : "category",
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
        builder.addCase(createCategory.pending , (state) => {
            state.loading = true
        }).addCase(createCategory.fulfilled , (state, action) => {
            state.loading = false
            state.success = action.payload
        }).addCase(createCategory.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getAdminCategory.pending , (state) => {
            state.loading = true
        }).addCase(getAdminCategory.fulfilled, (state, action : any) => {
            state.loading = false
            state.category = action.payload.data;
        }).addCase(getAdminCategory.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        }).addCase(DeleteAdminCategory.fulfilled , (state, action : any) => {
            state.success = action.payload;
        }).addCase(DeleteAdminCategory.rejected, (state , action : any) => {
            state.tokenExpiredError = action.payload.data.name
        }).addCase(GetCategoryById.pending , (state) => {
            state.loading = true
        }).addCase(GetCategoryById.fulfilled , (state , action) => {
            state.loading = false
            state.CategoryById = action.payload
        }).addCase(GetCategoryById.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name;
        }).addCase(updateAdminCategory.pending , (state) => {
            state.loading = true
        }).addCase(updateAdminCategory.fulfilled, (state, action : any) => {
            state.loading = false
            state.success = action.payload
        }).addCase(updateAdminCategory.rejected , (state, action : any) => {
            state.loading = false
            state.tokenExpiredError = action.payload.data.name
        }).addCase(getMenu.pending , (state) => {
            state.loading = true
        }).addCase(getMenu.fulfilled, (state, action : any) => {
            state.loading = false
            state.category = action.payload.data;
        }).addCase(getMenu.rejected, (state, action : any) => {
            state.loading = false;
            state.error = action.payload.data;
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  CategorySlice.actions;
const categoryReducer = CategorySlice.reducer;
export default categoryReducer