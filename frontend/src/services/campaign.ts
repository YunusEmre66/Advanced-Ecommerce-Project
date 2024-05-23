import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base } from '@/configs/route/base'

export const campaignApi = createApi({
    reducerPath: 'campaignApi',
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
        getBasketCampaigns: builder.query<any, string>({
            query: () => `/campaign/basket`
        }),
    }),
})

export const { useGetBasketCampaignsQuery } = campaignApi