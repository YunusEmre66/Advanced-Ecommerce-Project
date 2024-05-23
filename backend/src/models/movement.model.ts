import { Table, Column, ForeignKey, DataType, BelongsTo, HasMany} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";
import Users from "./user.model";

@Table({ tableName: "movements" })
export default class Movement extends BaseModel {
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

    @ForeignKey(() => Movement)
    @Column({field: "movement_id"})
    movementId!: number;

    @BelongsTo(() => Movement)
    movement: Movement | undefined

    @HasMany(() => Movement, 'movement_id')
    movements: Movement[] | undefined

    @Column({ type: DataType.BOOLEAN, field: "type" })  // giriş, çıkış, header 
                                                        // true => giriş, false => çıkış, null => header
    type!: boolean

    @Column({ type: DataType.STRING(10), field: "process_type" }) // fatura, sepet, ödeme, kargo, iade, çöp
    processType!: string

    @Column({ type: DataType.DECIMAL(7, 2), field: "price" }) // 100 // ürün birim fiyatı
    price!: number

    @Column({ type: DataType.DECIMAL(7, 2), field: "discount_price" }) //12345,67 -- 90
    discountPrice!: number
    
    @Column({ type: DataType.DECIMAL(7, 2), field: "quantity" }) // 2 // alınan adet
    quantity!: number

    @Column({ type: DataType.DECIMAL(7, 2), field: "tax" }) // 20 // birim vergi tutarı hesaplanıp yazılır
    tax!: number

    @Column({ type: DataType.DECIMAL(7, 2), field: "total" }) // 240 // toplam ürün ve vergi tutarı
    total!: number

    @Column({ type: DataType.STRING(100), field: "description"})
    description!: string

    @Column({ type: DataType.STRING(250), field: "address"})
    address!: string
}