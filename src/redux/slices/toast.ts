import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
    message:string;
    isVisible: boolean;
}

const initialState: ToastState = {
    message: '',
    isVisible: false,
}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.isVisible = true;
        },
        hideToast: (state) =>{
            state.isVisible = false;
        }
    }
})

export const { showToast, hideToast} = toastSlice.actions;
export const toastReducer = toastSlice.reducer;