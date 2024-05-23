import { Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import Product from "./product.model"
import BaseModel from "./base.model";

@Table({ tableName: "menu" })
export default class Menu extends BaseModel {
    @Column({ type: DataType.STRING(100), field: "title" })
    title!: string

    @Column({ type: DataType.STRING(100), field: "seo" })
    seo!: string

    @ForeignKey(() => Menu)
    @Column({type: DataType.INTEGER, field: "menu_id"})
    declare menuId: number;

    @BelongsTo(() => Menu)
    menu: Menu | undefined
}