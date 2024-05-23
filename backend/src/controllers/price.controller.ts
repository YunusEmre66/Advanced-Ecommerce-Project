import { Request, Response } from "express";
import priceRepository from "../repositories/price.repository";

export default class PriceController {
    async getPrices(req: Request, res: Response) {
        try {
            const list = await priceRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setPrices(req: Request, res: Response) {
        const { id, productId, price, discountPrice, discountRate } = req.body
        if (id > 0) {
            const update = await priceRepository.update(id, productId, price, discountPrice, discountRate)

            res.status(200).send({ message: "", data: update })
        } else {
            try {
                const insert = await priceRepository.insert(productId, price, discountPrice, discountRate)

                res.status(200).send({ message: "", data: insert })
            } catch (error) {
                return res.status(401).send({ message: "error" })
            }
        }
    }
    async getPrice(req: Request, res: Response) {
        try {
            const list = await priceRepository.row(parseInt(req.params.id))
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
}