import { Table, Column, ForeignKey, DataType, BelongsTo, BelongsToMany} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";

@Table({ tableName: "campaigns" })
export default class Campaign extends BaseModel {
    @ForeignKey(() => Product)
    @Column({field: "product_id"})
    productId!: number;
    
    @BelongsTo(() => Product)
    product: Product | undefined

    @Column({ type: DataType.STRING(150), field: "title"})
    title!: string

    @Column({ type: DataType.STRING(255), field: "description"})
    description!: string

    @Column({ type: DataType.STRING(20), field: "type"}) // ürün bazlı, sepette indirim,
    type!: string

    @Column({ type: DataType.DECIMAL(7, 2), field: "price" }) //12345,67
    price!: number

    @Column({ type: DataType.DATE, field: "start_date"})
    startDate!: Date;

    @Column({ type: DataType.DATE, field: "end_date"})
    endDate!: Date;
}