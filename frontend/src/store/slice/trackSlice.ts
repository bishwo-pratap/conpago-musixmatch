'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Tracks {
  [x: string]: any;
}

const initialState: Tracks = {};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<Tracks>) => {
      state.track_list = action.payload.track_list;
    },
    setTrackName:(state, action: PayloadAction<Tracks>) => {
      state.track_name = action.payload.name;
    } ,
    clearTracks: (state) => {
      state.track_list = [];
    }
  }
});

export const { setTracks, clearTracks, setTrackName } = tracksSlice.actions;
export default tracksSlice.reducer;
