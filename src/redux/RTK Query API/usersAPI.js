import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const usersApi = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    tagTypes: ['User'], 
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['User'],  
        }),
        getUsersPhysicalPlan: builder.query({
            query: ({id, token }) => ({
                url: `/users/${id}/physical-plan`, 
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Передаем токен в заголовке
                },
            }), 
        }),
        getUsersMentalPlan: builder.query({
            query: ({id, token }) => ({
                url: `/users/${id}/mental-plan`, 
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Передаем токен в заголовке
                },
            }),
            providesTags: ['User'],  
        }),
        getUsersOutherTasks: builder.query({
            query: ({id, token }) => ({
                url: `/users/${id}/outer-tasks`, 
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Передаем токен в заголовке
                },
            }),
            providesTags: ['User'],  
        }),
        addUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'], 
        }),
        signInUser: builder.mutation({
            query: (user) => ({
                url: '/users/signIn',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'], 
        }),
        removeUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],  
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUsersPhysicalPlanQuery,
    useGetUsersMentalPlanQuery,
    useGetUsersOutherTasksQuery,
    useAddUserMutation,
    useSignInUserMutation,
    useRemoveUserMutation,
} = usersApi;

// END