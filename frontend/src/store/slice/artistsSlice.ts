'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Artists {
  [x: string]: any;
}

const initialState: Artists = {
  loading: true
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    setArtists: (state, action: PayloadAction<Artists>) => {
      state.artist_list = action?.payload?.artist_list || [];
    },
    setArtistName:(state, action: PayloadAction<Artists>) => {
      state.artist_name = action.payload.name;
    },
    setArtistId:(state, action: PayloadAction<Artists>) => {
      state.artist_id = action.payload.id;
    },
    clearArtists: (state) => {
      state.artist_list = [];
    }
  }
});

export const { setArtists, clearArtists, setArtistName, setArtistId } = artistsSlice.actions;
export default artistsSlice.reducer;
