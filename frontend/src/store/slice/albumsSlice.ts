'use client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Albums {
  [x: string]: any;
}

const initialState: Albums = {
  loading: true
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbums: (state, action: PayloadAction<Albums>) => {
      state.album_list = action.payload.album_list;
    },
    setAlbumName:(state, action: PayloadAction<Albums>) => {
      state.album_name = action.payload.name;
    },
    setAlbumId:(state, action: PayloadAction<Albums>) => {
      state.album_id = action.payload.id;
    },
    clearAlbums: (state) => {
      state.album_list = [];
    }
  }
});

export const { setAlbums, clearAlbums, setAlbumName, setAlbumId } = albumsSlice.actions;
export default albumsSlice.reducer;
