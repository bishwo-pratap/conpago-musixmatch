import { combineReducers } from 'redux';
import userReducer from './slice/userSlice'
import artistsReducer from './slice/artistsSlice'
import albumsReducer from './slice/albumsSlice'
import tracksReducer from './slice/trackSlice'
import lyricsReducer from './slice/lyricsSlice'

const rootReducer = combineReducers({
  user: userReducer,
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  lyrics: lyricsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
