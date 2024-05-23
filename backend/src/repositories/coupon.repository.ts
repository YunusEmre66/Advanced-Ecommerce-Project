import { Op } from "sequelize";
import Coupon from "../models/coupon.model"

interface ICouponRepository {
    list(): Promise<Array<Coupon>>;
    one(userId: number, code: string): Promise<Coupon | null>;
    getUseCoupon(userId: number, code: string): Promise<Coupon | null>;
    insert(
        userId: number,
        code: string,
        title: string,
        description: string,
        type: string,
        price: number
    ): Promise<Coupon | null>;
}

class CouponRepository implements ICouponRepository {
    async list(): Promise<Array<Coupon>> {
        try {
            return await Coupon.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async one(userId: number, code: string): Promise<Coupon | null> {
        try {
            return await Coupon.findOne({
                where: {
                    userId, code
                }
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async getUseCoupon(userId: number, code: string): Promise<Coupon | null> {
        try {
            return await Coupon.findOne({
                where: {
                    userId, code,
                    startDate: {
                        [Op.lt]: new Date()
                    },
                    endDate: {
                        [Op.gt]: new Date()
                    }
                }
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async insert(
        userId: number,
        code: string,
        title: string,
        description: string,
        type: string,
        price: number
    ): Promise<Coupon | null> {
        try {
            return await Coupon.create({
                userId,
                code,
                title,
                description,
                type,
                price
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new CouponRepository()