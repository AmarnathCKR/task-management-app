/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, type PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import type { Reducer } from 'redux';

// Define the shape of your auth state (from your authSlice)
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: Record<string, any> | null;
}

const persistConfig: PersistConfig<AuthState> = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'refreshToken', 'user'],
};
const persistedAuthReducer = persistReducer<AuthState>(persistConfig, authReducer as Reducer<AuthState>);
// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
