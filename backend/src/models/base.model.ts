import { Sequelize } from "sequelize";
import { Model, Column, DataType, PrimaryKey, CreatedAt, UpdatedAt, DeletedAt} from "sequelize-typescript"

export default class BaseModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number
    
    @Column({ type: DataType.BOOLEAN, field: "confirm"})
    confirm!: true

    @CreatedAt
    @Column({ type: DataType.DATE, field: "create_date", defaultValue: Sequelize.literal('NOW()')})
    createdAt!: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE, field: "update_date", defaultValue: Sequelize.literal('NOW()')})
    updatedAt!: Date;

    @DeletedAt
    @Column({ type: DataType.DATE, field: "delete_date"})
    deletedAt!: Date;
}