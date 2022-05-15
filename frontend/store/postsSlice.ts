import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//types
import type { iPost } from "../types/types";

type PostsState = {
  posts: iPost[];
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
};

const initialState: PostsState = {
  posts: [],

  loading: false,
  error: false,
  errorMessage: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<iPost[]>) => {
      state.posts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { updatePosts, setLoading, setError, setErrorMessage } =
  postsSlice.actions;

export default postsSlice.reducer;
