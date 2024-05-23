import { Table, Column, ForeignKey, DataType, BelongsTo} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";
import Users from "./user.model";

@Table({ tableName: "ratings" })
export default class Rating extends BaseModel {
    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, field: "product_id"})
    declare productId: number;

    @BelongsTo(() => Product)
    product: Product | undefined

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER, field: "user_id"})
    declare userId: number;

    @BelongsTo(() => Users)
    user: Users | undefined

    @Column({ type: DataType.TINYINT, field: "rating" })
    rating!: number
}