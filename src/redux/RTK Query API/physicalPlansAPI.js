import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const physicalPlansApi = createApi({
    reducerPath: 'physicalPlans',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    tagTypes: ['physicalPlan'], 
    endpoints: (builder) => ({
        getPhysicalPlans: builder.query({
            query: () => '/physicalPlans',
            providesTags: ['physicalPlan'],  
        }),
        addPhysicalPlan: builder.mutation({
            query: (physicalPlan) => ({
                url: '/physicalPlans',
                method: 'POST',
                body: physicalPlan,
            }),
            invalidatesTags: ['physicalPlan'], 
        }),
        updatePhysicalPlan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/physicalPlans/${id}`,
                method: 'PATCH',
                body: data, // передача данных для обновления
            }),
            invalidatesTags: ['resource'],  
        }),
        removePhysicalPlan: builder.mutation({
            query: (id) => ({
                url: `/physicalPlans/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['physicalPlan'],  
        })
    })
});

export const {
    useGetPhysicalPlansQuery,
    useAddPhysicalPlanMutation,
    useUpdatePhysicalPlanMutation,
    useRemovePhysicalPlanMutation
} = physicalPlansApi;

// END