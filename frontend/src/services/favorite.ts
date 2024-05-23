import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'

export const favoriteApi = createApi({
    reducerPath: 'favoriteApi',
    baseQuery: fetchBaseQuery({
        baseUrl: base.base,
        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = localStorage.getItem('token') as string
            console.log('prepareHeaders >> token ', token);

            if (token !== '') {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        setFavorite: builder.mutation({
            query: (body) => ({
                url: '/favorite',
                method: 'POST',
                body
            }),
            transformResponse: (result: { data: any }) => result,
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    //dispatch(setBasket(data.basket))
                } catch (error) {
                    console.log('setFavorite error >> ',error);
                }
            }
        }),
    }),
})

export const { useSetFavoriteMutation } = favoriteApi