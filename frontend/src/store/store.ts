import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer, { RootState } from './reducers';
import storage from './storage';

const persistConfig = {
  key: 'user',
  storage,
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const makeStore = () => {
  const store = createStore(
    persistedReducer,
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

export type AppDispatch = ReturnType<typeof makeStore>['store']['dispatch'];
export type AppStore = ReturnType<typeof makeStore>

export default makeStore;
