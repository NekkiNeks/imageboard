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
    thread_id: null, // change!!
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

export const { setData, setShow, setLoading, setError, setDefault } =
  modalSlice.actions;

export default modalSlice.reducer;
