import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const resourceApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    reducerPath: 'resources',
    tagTypes: ['resource'], 
    endpoints: (builder) => ({
        getResources: builder.query({
            query: () => '/resources',
            providesTags: ['resource'],  
        }),
        addResource: builder.mutation({
            query: (resource) => ({
                url: '/resources',
                method: 'POST',
                body: resource,
            }),
            invalidatesTags: ['resource'], 
        }),
        addResources: builder.mutation({
            query: (resources) => ({
                url: '/resources/bulk/',
                method: 'POST',
                body: resources,
            }),
            invalidatesTags: ['resource'], 
        }),
        updateResource: builder.mutation({
            query: ({ id, data, token }) => ({
                url: `/resources/${id}`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`, // Передаем токен в заголовке
                },
                body: data, // передача данных для обновления
            }),
            invalidatesTags: ['resource'],  
        }),
        removeResource: builder.mutation({
            query: ({id, token}) => ({
                url: `/resources/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`, // Передаем токен в заголовке
                },
            }),
            invalidatesTags: ['resource'],  
        })
    })
});

export const {
    useGetResourcesQuery,
    useAddResourceMutation,
    useAddResourcesMutation,
    useUpdateResourceMutation,
    useRemoveResourceMutation
} = resourceApi;

// END