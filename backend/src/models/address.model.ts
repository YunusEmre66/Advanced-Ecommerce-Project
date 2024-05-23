import { Table, Column, ForeignKey, DataType, BelongsTo} from "sequelize-typescript"
import BaseModel from "./base.model";
import Product from "./product.model";
import Users from "./user.model";

@Table({ tableName: "addresses" })
export default class Address extends BaseModel {
    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER, field: "user_id"})
    declare userId: number;

    @BelongsTo(() => Users)
    user: Users | undefined

    @Column({ type: DataType.STRING(50), field: "name"})
    declare name: string

    @Column({ type: DataType.STRING(100), field: "city"})
    declare city: string

    @Column({ type: DataType.STRING(100), field: "district"})
    declare district: string

    @Column({ type: DataType.STRING(100), field: "town"})
    declare town: string

    @Column({ type: DataType.STRING(255), field: "address_line"})
    declare addressLine: string
}