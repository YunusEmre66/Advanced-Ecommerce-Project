import { Table, Column, DataType, HasOne, HasMany, ForeignKey, BelongsTo} from "sequelize-typescript"
import BaseModel from "./base.model";
import Price from "./price.model";
import Rating from "./rating.model";
import Variation from "./variation.model";
import Campaign from "./campaign.model";
import Category from "./category.model";
import Favorite from "./favorite.model";
import ProductCategory from "./product.category.model";

@Table({ tableName: "products" })
export default class Product extends BaseModel {
    // Çoklu Dil ve farklı ülkelerde farklı vergi ve fiyatlandıma için
    // @Column({ type: DataType.STRING(150), field: "language",})
    // language!: string

    // @Column({ type: DataType.STRING(150), field: "location"})
    // location!: string

    // @ForeignKey(() => Product)
    // @Column({type: DataType.INTEGER, field: "product_id"}) //TR 1 (ilişki id null), DE 2 (ilişki ıd 1) 
    // declare productId: number;

    // @BelongsTo(() => Product)
    // product: Product | undefined

    @Column({ type: DataType.STRING(150), field: "title"})
    title!: string

    @Column({ type: DataType.STRING(150), field: "seo"}) // slug
    seo!: string

    @Column({ type: DataType.STRING(255), field: "description"})
    description!: string

    @Column({ type: DataType.STRING(20), field: "stock_code"})
    stockCode!: string

    @Column({ type: DataType.STRING(20), field: "barcode"})
    barcode!: string

    @Column({ type: DataType.STRING(30), field: "associative"})
    associative!: string

    @Column({ type: DataType.DECIMAL(4, 2), field: "tax" }) // %15.6
    tax!: number

    @HasOne(() => Price, 'product_id')
    price: Price | undefined

    @HasMany(() => Rating, 'product_id')
    ratings: Rating[] | undefined

    @HasMany(() => Variation, 'product_id')
    variations: Variation[] | undefined

    @HasMany(() => Campaign, 'product_id')
    campaigns: Campaign[] | undefined

    @HasMany(() => Favorite, 'product_id')
    favorites: Favorite[] | undefined

    @HasMany(() => ProductCategory, 'product_id')
    productCategory: ProductCategory[] | undefined
}
