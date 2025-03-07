import axios from "../../axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../../types/enums";


export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get<string[]>('/tags');
    return data;
  });

interface InitialState  {
    
        tags: string[];
        status: Status;
   
}

const initialState: InitialState = {
    
        tags: [],
        status: Status.Loading
    
}
export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder
      .addCase(fetchTags.pending, (state) => {
          state.tags = [];
          state.status = Status.Loading;
      })
      .addCase(fetchTags.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.tags = action.payload;
        state.status = Status.Success;
      })
      .addCase(fetchTags.rejected, (state) => {
          state.tags = [];
          state.status = Status.Error;
      });
    },
})

export const tagsReducer = tagsSlice.reducer;