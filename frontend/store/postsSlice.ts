import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//types
import type { iPost } from "../types/types";

type PostsState = {
  posts: iPost[];
  loading: boolean;
  modal: {
    id: number | null;
    show: boolean;
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
  };
  error: boolean;
  errorMessage: string | null;
};

const initialState: PostsState = {
  posts: [],
  modal: {
    id: null,
    show: false,
    loading: false,
    error: false,
    errorMessage: null,
  },
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
    setModal: (
      state,
      action: PayloadAction<{
        id: number | null;
        show: boolean;
        loading: boolean;
        error: boolean;
        errorMessage: string | null;
      }>
    ) => {
      state.modal = { ...state.modal, ...action.payload };
      // state.modal.id = action.payload.id;
      // state.modal.show = action.payload.show;
      // state.modal.loading = action.payload.loading;
      // state.modal.error = action.payload.error;
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

export const { updatePosts, setLoading, setModal, setError, setErrorMessage } =
  postsSlice.actions;

export default postsSlice.reducer;
