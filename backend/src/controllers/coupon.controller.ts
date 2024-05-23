import { Request, Response } from "express";
import couponRepository from "../repositories/coupon.repository";

export default class CouponController {
    async getCoupons(req: Request, res: Response) {
        try {
            const list = await couponRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error", error })
        }
    }
    async setCoupons(req: Request, res: Response) {
        const {userId, code, title, description, type, price} = req.body
        try {
            const insert = await couponRepository.insert(userId, code, title, description, type, price)

            res.status(200).send({ message: "", data: insert })
        } catch (error) {
            return res.status(401).send({ message: "error", error })
        }
    }
    async setUseCoupon(req: Request, res: Response) {
        const {code, authUser} = req.body
        const userId = authUser.userId
        try {
            const row = await couponRepository.getUseCoupon(userId, code)

            res.status(200).send({ message: "", data: row })
        } catch (error) {
            return res.status(401).send({ message: "error", error })
        }
    }
}