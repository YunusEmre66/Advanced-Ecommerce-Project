import { Table, Column, ForeignKey, DataType} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";
import Users from "./user.model";

@Table({ tableName: "contents" })
export default class Content extends BaseModel {
    @Column({ type: DataType.STRING(150), field: "title"})
    declare title: string

    @Column({ type: DataType.STRING(150), field: "slug"})
    declare slug: string

    @Column({ type: DataType.STRING(2000), field: "description"})
    declare description: string
}