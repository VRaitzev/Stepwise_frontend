import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from './usersAPI';
import { physicalPlansApi } from './physicalPlansAPI';
import { resourceApi } from './ResourceAPI';
import { mentalPlansApi } from './mentalPlanAPI'
import { outherTasksApi } from './outherTasksAPI'
import authReducer from './authSlice';

// BEGIN (write your solution here)
const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        [physicalPlansApi.reducerPath]: physicalPlansApi.reducer,
        [resourceApi.reducerPath]: resourceApi.reducer,
        [mentalPlansApi.reducerPath]: mentalPlansApi.reducer,
        [outherTasksApi.reducerPath]: outherTasksApi.reducer,
        auth: authReducer, // Добавляем редьюсер аутентификации в store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(usersApi.middleware)
        .concat(physicalPlansApi.middleware)
        .concat(resourceApi.middleware)
        .concat(mentalPlansApi.middleware)
        .concat(outherTasksApi.middleware)
});

export default store;

// END