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
    addPost: (state, action: PayloadAction<{ post: iPost }>) => {
      state.posts = [action.payload.post, ...state.posts];
    },
    setCurrentPost: (state, action: PayloadAction<iPost>) => {
      state.currentPost = action.payload;
    },
    setComments: (state, action: PayloadAction<iComment[]>) => {
      state.comments = action.payload;
    },
    addComment: (state, action: PayloadAction<{ comment: iComment }>) => {
      state.comments.push(action.payload.comment);
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setError: (
      state,
      action: PayloadAction<{ error: boolean; errorMessage: string | null }>
    ) => {
      state.error = action.payload.error;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {
  setPosts,
  addPost,
  setCurrentPost,
  setComments,
  addComment,
  setLoading,
  setError,
} = postsSlice.actions;

export default postsSlice.reducer;
