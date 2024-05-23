import { Request, Response } from "express";
import movementRepository from "../repositories/movement.repository";
import productRepository from "../repositories/product.repository";
import priceRepository from "../repositories/price.repository";
import jwt from "jsonwebtoken"

export default class MovementController {
    async getMovements(req: Request, res: Response) {
        const token = req.headers.authorization?.replace('Bearer ', '') as string
        let userId;

        try {
            const verify = jwt.verify(token, "123")
            const decode: any = verify ? jwt.decode(token) : null
            userId = decode.id;
        } catch (error) {
            return res.status(401).send({ message: error })
        }

        if (!userId) return res.status(401).send({ message: "no user" })

        try {
            const list = await movementRepository.list(userId)
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async getUserOrders(req: Request, res: Response) {
        const { authUser } = req.body

        const userId = authUser.userId;

        if (!userId) return res.status(401).send({ message: "no user" })

        try {
            const list = await movementRepository.userOrders(userId)
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async getUsersOrders(req: Request, res: Response) {
        try {
            const list = await movementRepository.usersOrders()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setOrderEvent(req: Request, res: Response) {
        const { movementId, event } = req.body

        //return res.status(200).send({ message: row?.description + "|" + event })
        try {
            let row = await movementRepository.row(movementId)
            if (!row) {
                return res.status(401).send({ message: "no valid data found" })
            }

            row.description = row?.description + "|" + event

            const update = await movementRepository.eventUpdate(movementId, row.description)

            res.status(200).send({ message: "", update })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setMovements(req: Request, res: Response) {
        const { productId, userId, processType, price, discountPrice, quantity, tax, total, description } = req.body
        try {
            const insert = await movementRepository.insert(productId, userId, processType, price, discountPrice, quantity, tax, total, description)
            res.status(200).send({ message: "", data: insert })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async addBasket(req: Request, res: Response) {
        const { productId, quantity, authUser } = req.body

        const userId = authUser.userId;

        if (!userId) return res.status(401).send({ message: "no user" })

        const productRow = await productRepository.row(productId)
        if (!productRow) return res.status(401).send({ message: "no product" })

        const priceRow = await priceRepository.row(productId)
        if (!priceRow) return res.status(401).send({ message: "no price" })

        const price = priceRow?.price ?? 0
        const discountPrice = priceRow?.discountPrice ?? 0
        const taxRate = productRow?.tax ?? 0
        const tax = discountPrice - (discountPrice / (1 + (taxRate / 100))) // kdv dahil vergi miktarı
        const totalTax = tax * quantity
        const total = discountPrice * quantity

        const insert = await movementRepository.insert(
            productId,
            userId,
            "basket",
            price,
            discountPrice,
            quantity,
            totalTax,
            total,
            "ürün sepete eklendi")

        res.status(200).send({ message: "", data: insert })
    }
    async removeBasket(req: Request, res: Response) {
        const { movements, authUser } = req.body

        for (const movement of movements) {
            await movementRepository.deleteBasket(parseInt(movement), authUser.userId)
        }

        const userBasket = await movementRepository.basket(authUser.userId)

        res.status(200).send({ message: "success", basket: userBasket })
    }
}