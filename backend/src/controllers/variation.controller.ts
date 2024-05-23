import { Request, Response } from "express";
import VariationRepository from "../repositories/variation.repository";

export default class VariationController {
    async getVariations(req: Request, res: Response) {
        try {
            const list = await VariationRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setVariations(req: Request, res: Response) {
        const {productId, title, description, seo} = req.body
        try {
            const insert = await VariationRepository.insert(productId, title, description, seo)

            res.status(200).send({ message: "successful", data: insert })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
}