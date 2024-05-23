import { Table, Column, DataType, HasMany } from 'sequelize-typescript'
import BaseModel from './base.model'
import Rating from './rating.model'
import Coupon from './coupon.model'
import Favorite from './favorite.model'
import { UserEnum } from '../enums/user.enum'
import Address from './address.model'

@Table({ tableName: "users" })
export default class Users extends BaseModel {
    @Column({ type: DataType.STRING(150), field: "name" })
    name!: string

    @Column({ type: DataType.STRING(100), field: "email", unique: true })
    email!: string

    @Column({ type: DataType.STRING(100), field: "password" })
    password!: string

    @Column({
        type: DataType.ENUM,
        field: "role", 
        values: Object.values(UserEnum), //['admin', 'user']
        defaultValue: UserEnum.USER
    })
    declare role: UserEnum

    @HasMany(() => Rating, 'user_id')
    ratings: Rating[] | undefined

    @HasMany(() => Coupon, 'user_id')
    coupons: Coupon[] | undefined

    @HasMany(() => Favorite, 'user_id')
    favorites: Favorite[] | undefined

    @HasMany(() => Address, 'user_id')
    addresses: Address[] | undefined
}