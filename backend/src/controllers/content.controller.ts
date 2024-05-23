import { Request, Response } from "express";
import ContentRepository from "../repositories/content.repository"

export default class ContentController {
    async getContents(req: Request, res: Response) {
        try {
            const list = await ContentRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async getContent(req: Request, res: Response) {
        try {
            const row = await ContentRepository.one(req.params.slug)
            if (!row) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", row })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setContents(req: Request, res: Response) {
        const {productId, title, slug, description, type} = req.body
        try {
            const insert = await ContentRepository.insert(productId, title, slug, description, type)

            res.status(200).send({ message: "successful", data: insert })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
}