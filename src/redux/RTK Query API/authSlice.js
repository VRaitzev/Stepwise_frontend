import { createSlice } from '@reduxjs/toolkit';

// Инициализация состояния
const initialState = {
  token: null,
  userId: null,
};

// Создание слайса для хранения токена и userId
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      
    },
    clearCredentials: (state) => {
      state.token = null;
      state.userId = null;
    },
  },
});

// Экспорт действий для использования
export const { setCredentials, clearCredentials } = authSlice.actions;

// Экспорт редьюсера для добавления в store
export default authSlice.reducer;
