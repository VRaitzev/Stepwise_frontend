import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const outherTasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000', // Замените на ваш базовый URL
    }),
    tagTypes: ['Task'], // Для управления кэшированием
    endpoints: (builder) => ({
        // Получить все задачи
        getAllTasks: builder.query({
            query: () => '/outherTasks',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Task', id })), { type: 'Task', id: 'LIST' }]
                    : [{ type: 'Task', id: 'LIST' }],
        }),

        // Обновить задачу по ID
        updateTaskById: builder.mutation({
            query: ({ taskId, taskData }) => ({
                url: `/outherTasks/${taskId}`,
                method: 'PATCH',
                body: taskData,
            }),
            invalidatesTags: (result, error, { taskId }) => [{ type: 'Task', id: taskId }],
        }),

        // Удалить задачу по ID
        deleteTaskById: builder.mutation({
            query: (taskId) => ({
                url: `/outherTasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, taskId) => [{ type: 'Task', id: taskId }, { type: 'Task', id: 'LIST' }],
        }),
        createOuterTask: builder.mutation({
            query: (data) => ({
                url: "/outherTasks/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["OuterTask"],
        }),
    }),
});

export const {
    useGetAllTasksQuery,
    useUpdateTaskByIdMutation,
    useDeleteTaskByIdMutation,
    useCreateOuterTaskMutation
} = outherTasksApi;
