import {createSlice} from "@reduxjs/toolkit";


const initialState ={
    search: {
        isFetching: false,
        error: false,
        success:false
    }
}

const productSlice = createSlice({
    initialState,
    reducers:{
        searchProduct: (State) => {
            State.search.isFetching = true
        }, 
        searchSuccess: (State, action) => {
            State.search.success = false,
            State.search.isFetching = action.payload,
            State.search.error = false
        },
        searchError: (State, action) => {
            State.search.isFetching = false,
            State.search.error = true
        }
    }
});

export const {
    searchProduct,
    searchSuccess,
    searchError
} = productSlice.actions

export default productSlice.actions;