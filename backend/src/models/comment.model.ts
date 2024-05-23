import { Table, Column, ForeignKey, DataType} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";
import Users from "./user.model";

@Table({ tableName: "comments" })
export default class Comment extends BaseModel {
    @ForeignKey(() => Product)
    @Column({field: "product_id"})
    productId!: number;

    @ForeignKey(() => Users)
    @Column({field: "user_id"})
    userId!: number;

    @Column({ type: DataType.STRING(400), field: "comment"})
    comment!: string
}