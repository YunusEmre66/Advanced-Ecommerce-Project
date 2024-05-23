import { Table, Column, DataType, HasMany} from "sequelize-typescript"
import BaseModel from "./base.model";
import ProductCategory from "./product.category.model";

@Table({ tableName: "categories" })
export default class Category extends BaseModel {
    @Column({ type: DataType.STRING(150), field: "title"})
    title!: string

    @Column({ type: DataType.STRING(150), field: "seo"})
    seo!: string

    @Column({ type: DataType.STRING(255), field: "description"})
    description!: string

    @HasMany(() => ProductCategory)
    categoryProducts: ProductCategory[] | undefined
}