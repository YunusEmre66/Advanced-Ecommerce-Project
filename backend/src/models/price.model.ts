import { Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Product from "./product.model"
import BaseModel from "./base.model"

@Table({ tableName: "prices" })
export default class Price extends BaseModel {
    @Column({ type: DataType.DECIMAL(7, 2), field: "price" }) //12345,67 -- 100
    price!: number
 
    @Column({ type: DataType.DECIMAL(7, 2), field: "discount_price" }) //12345,67 -- 90
    discountPrice!: number

    @Column({ type: DataType.DECIMAL(4, 2), field: "discount_rate" }) //12,34 -- 10
    discountRate!: number

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, field: "product_id"})
    declare productId: number

    @BelongsTo(() => Product)
    product: Product | undefined
}