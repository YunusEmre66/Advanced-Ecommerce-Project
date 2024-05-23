import { Table, Column, ForeignKey, DataType, BelongsTo} from "sequelize-typescript"
import Product from "./product.model";
import Category from "./category.model";
import BaseModel from "./base.model";

@Table({ tableName: "product_category" })
export default class ProductCategory extends BaseModel {
    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, field: "product_id"})
    declare productId: number;

    @BelongsTo(() => Product)
    product: Product | undefined

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, field: "category_id"})
    declare categoryId: number;

    @BelongsTo(() => Category)
    category: Category | undefined
}