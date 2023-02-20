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
        })
    }
})

export const { ClearSuccess , ClearDelete ,ClearError } =  CategorySlice.actions;
const categoryReducer = CategorySlice.reducer;
export default categoryReducer