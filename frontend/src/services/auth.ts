import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'
import { setToken } from '@/store/apps/auth/token';
import { setUser } from '@/store/apps/auth/user';
import { setBasket } from '@/store/apps/product/basket';

export const loginApi = createApi({
    reducerPath: 'loginApi',
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
        getIsLogin: builder.query<any, string>({
            query: (url) => `${url}`
        }),
        getMe: builder.query<any, string>({
            query: () => `/user/me`,
            transformResponse: (result: { user: {}, basket: {} }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data.user))
                    dispatch(setBasket(data.basket))
                } catch (error) {
                    console.log('ME >> ', error);
                    localStorage.removeItem('token')
                }
            }
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body,
            }),
            transformResponse: (result: { token: string, user: any }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setToken(data.token))
                } catch (error) {
                }
            }
        }),
    }),
})

export const { useGetIsLoginQuery, useGetMeQuery, useLoginMutation } = loginApi