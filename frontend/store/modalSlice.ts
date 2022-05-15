import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  id: number | null;
  show: boolean;
  loading: boolean;
  error: boolean;
  errorMessage: string | null;
}

const initialState: ModalState = {
  id: null,
  show: false,
  loading: false,
  error: false,
  errorMessage: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<{ id: number | null }>) => {
      state.id = action.payload.id;
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
      state.id = null;
      state.show = false;
      state.loading = false;
      state.error = false;
      state.errorMessage = null;
    },
  },
});

export const { setId, setShow, setLoading, setError, setDefault } =
  modalSlice.actions;

export default modalSlice.reducer;
