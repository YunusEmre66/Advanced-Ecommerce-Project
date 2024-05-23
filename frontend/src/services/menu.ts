import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'
import { setMenu } from '@/store/apps/config/menu'

export const menuApi = createApi({
    reducerPath: 'menuApi',
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
        getMenu: builder.query<any, string>({
            query: () => `/menu`,
            transformResponse: (result: { user: {}, basket: {} }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setMenu(data.basket))
                } catch (error) {
                    console.log('Menu >> ', error);
                }
            }
        }),
    }),
})

export const { useGetMenuQuery } = menuApi