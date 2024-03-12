'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Lyrics {
  [x: string]: any;
}

const initialState: Lyrics = {};

const lyricsSlice = createSlice({
  name: 'lyrics',
  initialState,
  reducers: {
    setLyrics: (state, action: PayloadAction<Lyrics>) => {
      state.lyrics = action.payload.lyrics;
    },
    clearLyrics: (state) => {
      state.lyrics = {};
    }
  }
});

export const { setLyrics, clearLyrics } = lyricsSlice.actions;
export default lyricsSlice.reducer;
