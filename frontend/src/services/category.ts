import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
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
        getCategory: builder.query<any, string>({
            query: () => `/category`
        }),
        getCategoryProducts: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        setCategory: builder.mutation({
            query: (body) => ({
                url: '/product-category/add-product-category',
                method: 'POST',
                body
            }),
            transformResponse: (result: { data: any }) => result,
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

export const { useGetCategoryQuery, useGetCategoryProductsQuery, useSetCategoryMutation } = categoryApi