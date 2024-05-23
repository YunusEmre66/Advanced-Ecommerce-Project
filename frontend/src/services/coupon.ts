import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'

export const couponApi = createApi({
    reducerPath: 'couponApi',
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
        setUseCoupon: builder.mutation({
            query: (body) => ({
                url: '/coupon/use',
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

export const { useSetUseCouponMutation } = couponApi