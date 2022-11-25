import { createSlice } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload }) => { state.messages = [...state.messages, payload]; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        const restMessages = state.messages.filter(({ channelId }) => channelId !== id);
        state.messages = restMessages;
      })
      .addCase(channelsActions.setChannels, (state, { payload }) => {
        const { messages } = payload;
        state.messages = messages;
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
