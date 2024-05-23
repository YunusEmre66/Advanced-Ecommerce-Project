import { PriceType } from "./priceType"

export type ProductType = {
    id: number | null
    title: string
    seo: string
    description: string
    stockCode: string
    barcode: string
    associative: string
    tax: string
    confirm: boolean
    updatedAt: string
    price: PriceType
}