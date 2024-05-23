import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'

export const movementApi = createApi({
    reducerPath: 'movementApi',
    baseQuery: fetchBaseQuery({
        baseUrl: base.base,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = localStorage.getItem('token') as string

            if (token !== '') {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getUserOrders: builder.mutation({
            query: () => ({
                url: '/movement/user-orders',
                method: 'GET',
            }),
            transformResponse: (result: { list: [] }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    //dispatch(setBasket(data.basket))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        getUsersOrders: builder.mutation({
            query: () => ({
                url: '/movement/users-orders',
                method: 'GET',
            }),
            transformResponse: (result: { list: [] }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    //dispatch(setBasket(data.basket))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    }),
})

export const { useGetUserOrdersMutation, useGetUsersOrdersMutation } = movementApi