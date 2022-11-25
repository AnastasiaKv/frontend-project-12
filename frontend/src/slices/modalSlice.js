import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    open: (state, { payload }) => {
      const { type, extra } = payload;
      state.isOpened = true;
      state.extra = extra ?? null;
      state.type = type;
    },
    close: (state) => {
      state.isOpened = false;
      state.extra = null;
      state.type = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
