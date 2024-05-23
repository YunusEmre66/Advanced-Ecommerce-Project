import { Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Product from "./product.model"
import BaseModel from "./base.model";

@Table({ tableName: "variations" })
export default class Variation extends BaseModel {
    @Column({ type: DataType.STRING(100), field: "title" })
    title!: string

    @Column({ type: DataType.STRING(100), field: "seo" })
    seo!: string

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, field: "product_id"})
    declare productId: number;

    @BelongsTo(() => Product)
    product: Product | undefined

    @ForeignKey(() => Variation)
    @Column({type: DataType.INTEGER, field: "variation_id"})
    declare variationId: number;

    @BelongsTo(() => Variation)
    variation: Variation | undefined
}