import { Table, Column, ForeignKey, BelongsTo, DataType} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";
import Users from "./user.model";

@Table({ tableName: "favorites" })
export default class Favorite extends BaseModel {
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
}