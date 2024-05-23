import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'
import { setBasket } from '@/store/apps/product/basket'

export const paymentApi = createApi({
    reducerPath: 'paymentApi',
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
        addPayment: builder.mutation({
            query: (body) => ({
                url: '/payment',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { basket: [] }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setBasket(data.basket))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
    }),
})

export const { useAddPaymentMutation } = paymentApi