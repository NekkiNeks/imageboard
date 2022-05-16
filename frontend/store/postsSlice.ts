import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//types
import type { iComment, iPost } from "../types/types";

type PostsState = {
  posts: iPost[];
  currentPost: iPost | null;
  comments: iComment[];
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
};

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  comments: [],
  loading: false,
  error: false,
  errorMessage: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<iPost[]>) => {
      state.posts = action.payload;
    },
    setCurrentPost: (state, action: PayloadAction<iPost>) => {
      state.currentPost = action.payload;
    },
    setComments: (state, action: PayloadAction<iComment[]>) => {
      state.comments = action.payload;
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

export const {
  setPosts,
  setCurrentPost,
  setComments,
  setLoading,
  setError,
  setErrorMessage,
} = postsSlice.actions;

export default postsSlice.reducer;
