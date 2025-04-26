import { configureStore } from "@reduxjs/toolkit";
import  {postsReducer} from './slices/posts'
import { authReducer } from "./slices/auth";
import { tagsReducer } from "./slices/tags";
import { collectionsReducer } from "./slices/collections";
import { toastReducer } from "./slices/toast";

export const store = configureStore({
    reducer:{
        postsReducer,
        authReducer,
        tagsReducer,
        collectionsReducer,
        toastReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch