import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'

export const productApi = createApi({
    reducerPath: 'productApi',
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
        getProducts: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        getProductDetail: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        setProductDetail: builder.mutation({
            query: (body) => ({
                url: '/product/detail',
                method: 'PUT',
                body,
            }),
            transformResponse: (result: { token: string }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    
                    // dispatch(setToken(data.token))
                } catch (error) {
                }
            }
        }),
        newProduct: builder.mutation({
            query: (body) => ({
                url: '/product',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    
                    // dispatch(setToken(data.token))
                } catch (error) {
                }
            }
        }),
        setRating: builder.mutation({
            query: (body) => ({
                url: '/rating',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    
                    // dispatch(setToken(data.token))
                } catch (error) {
                }
            }
        }),
        setAddBasket: builder.mutation({
            query: (body) => ({
                url: '/product/add-basket',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data);
                    
                    // dispatch(setToken(data.token))
                } catch (error) {
                }
            }
        }),
    }),
})

export const { useGetProductsQuery, useGetProductDetailQuery, useSetProductDetailMutation, useNewProductMutation, useSetRatingMutation, useSetAddBasketMutation } = productApi