import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const mentalPlansApi = createApi({
    reducerPath: 'mentalPlans',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    tagTypes: ['mentalPlan'], 
    endpoints: (builder) => ({
        getMentalPlans: builder.query({
            query: () => '/mentalPlans',
            providesTags: ['mentalPlan'],  
        }),
        addMentalPlan: builder.mutation({
            query: (mentalPlan) => ({
                url: '/mentalPlans',
                method: 'POST',
                body: mentalPlan,
            }),
            invalidatesTags: ['mentalPlan'], 
        }),
        updateMentalPlan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/mentalPlans/${id}`,
                method: 'PATCH',
                body: data, // передача данных для обновления
            }),
            invalidatesTags: ['mentalPlan'],  
        }),
        removeMentalPlan: builder.mutation({
            query: (id) => ({
                url: `/mentalPlans/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['mentalPlan'],  
        })
    })
});

export const {
    useGetMentalPlansQuery,
    useAddMentalPlanMutation,
    useUpdateMentalPlanMutation,
    useRemoveMentalPlanMutation
} = mentalPlansApi;

// END