import { configureStore } from '@reduxjs/toolkit';

// Kita buat reducer kosong dulu biar Redux-nya nggak komplain
const rootReducer = {
  // Nanti di sini kita tambah auth: authReducer, dll.
  app: (state = { status: 'ready' }) => state,
};

export const store = configureStore({
  reducer: rootReducer,
});