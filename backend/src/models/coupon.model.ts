import { Table, Column, ForeignKey, DataType, BelongsTo} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";
import Users from "./user.model";

@Table({ tableName: "coupons" })
export default class Coupon extends BaseModel {
    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER, field: "user_id"})
    declare userId: number;
    
    @BelongsTo(() => Users)
    user: Users | undefined

    @Column({ type: DataType.STRING(150), field: "code"})
    code!: string

    @Column({ type: DataType.STRING(150), field: "title"})
    title!: string

    @Column({ type: DataType.STRING(255), field: "description"})
    description!: string

    @Column({ type: DataType.STRING(20), field: "type"}) // 500 liralık ürün alırsa kullanabilir
    type!: string

    @Column({ type: DataType.DECIMAL(7, 2), field: "price" }) //12345,67
    price!: number

    @Column({ type: DataType.DATE, field: "start_date"})
    startDate!: Date;

    @Column({ type: DataType.DATE, field: "end_date"})
    endDate!: Date;
}