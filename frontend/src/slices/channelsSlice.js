import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: [],
    currentChannel: {
      id: null,
      defaultId: null,
    },
  },
  reducers: {
    setChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      state.channels = channels;
      state.currentChannel.id = currentChannelId;
      state.currentChannel.defaultId = currentChannelId;
    },
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload];
      state.currentChannel.id = payload.id;
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (state.currentChannel.id === id) {
        state.currentChannel.id = state.currentChannel.defaultId;
      }
    },
    updateChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find((ch) => ch.id === id);
      channel.name = name;
    },
    updateCurrentChannel: (state, { payload }) => { state.currentChannel.id = payload.id; },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
