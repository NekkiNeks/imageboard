import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface iData {
  thread_id: number | null;
  answer_to: number[];
  title: string;
  content: string;
}

interface ModalState {
  data: iData;
  show: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

const initialState: ModalState = {
  data: {
    thread_id: null,
    answer_to: [],
    title: "",
    content: "",
  },
  show: false,
  loading: false,
  error: false,
  errorMessage: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    addId: (state, action: PayloadAction<{ id: number }>) => {
      if (!state.data.answer_to.includes(action.payload.id)) {
        state.data.answer_to = [...state.data.answer_to, action.payload.id];
      }
    },
    setPostId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.data.thread_id = action.payload.id;
    },
    removeId: (state, action: PayloadAction<{ id: number }>) => {
      const filtered = state.data.answer_to.filter(
        (id) => id !== action.payload.id
      );
      state.data.answer_to = filtered;
    },
    setData: (state, action: PayloadAction<iData>) => {
      state.data = action.payload;
    },
    setShow: (state, action: PayloadAction<{ show: boolean }>) => {
      state.show = action.payload.show;
    },
    setLoading: (state, action: PayloadAction<{ loading: boolean }>) => {
      state.loading = action.payload.loading;
    },
    setError: (
      state,
      action: PayloadAction<{ error: boolean; errorMessage?: string }>
    ) => {
      state.error = action.payload.error;
      state.errorMessage = action.payload.errorMessage
        ? action.payload.errorMessage
        : null;
    },
    setDefault: (state) => {
      state.data = initialState.data;
      state.show = false;
      state.loading = false;
      state.error = false;
      state.errorMessage = null;
    },
  },
});

export const {
  setData,
  addId,
  setPostId,
  removeId,
  setShow,
  setLoading,
  setError,
  setDefault,
} = modalSlice.actions;

export default modalSlice.reducer;
