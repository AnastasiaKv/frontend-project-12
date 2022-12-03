import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchData = createAsyncThunk('channelsInfo/fetchData', async (headers) => {
  const response = await axios.get(routes.getDataPath(), headers);
  return response.data;
});

/* eslint no-param-reassign: ["error", { "props": false }] */
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
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      const channel = state.channels.find((ch) => ch.id === id);
      channel.name = name;
    },
    updateCurrentChannel: (state, { payload }) => { state.currentChannel.id = payload.id; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        state.channels = channels;
        state.currentChannel.id = currentChannelId;
        state.currentChannel.defaultId = currentChannelId;
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
