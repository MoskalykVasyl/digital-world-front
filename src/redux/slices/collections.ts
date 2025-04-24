import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { readLaterPost } from "../../types/types";

interface InitialState {
    readLater: readLaterPost[];
}

const initialState: InitialState = {
    readLater: [],
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState,
    reducers: {
        addReadLater: (state, action: PayloadAction<readLaterPost>) => {
            const exist = state.readLater.some(post => post._id === action.payload._id)
            if(!exist) {
            state.readLater.push(action.payload);
            }
        },
        removeReadLater: (state, action: PayloadAction<string>) => {
            state.readLater = state.readLater.filter(item => item._id !== action.payload);
        }
    }
})



export const collectionsReducer = collectionsSlice.reducer;

export const { addReadLater, removeReadLater} = collectionsSlice.actions;