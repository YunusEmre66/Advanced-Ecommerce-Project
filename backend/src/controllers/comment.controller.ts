import { Request, Response } from "express";
import commentRepository from "../repositories/comment.repository";

export default class CommentController {
    async getComments(req: Request, res: Response) {
        try {
            const list = await commentRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setComments(req: Request, res: Response) {
        const {productId, userId, comment} = req.body
        try {
            const insert = await commentRepository.insert(productId, userId, comment)

            res.status(200).send({ message: "", data: insert })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
}