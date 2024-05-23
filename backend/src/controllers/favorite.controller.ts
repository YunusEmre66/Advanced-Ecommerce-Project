import { Request, Response } from "express";
import favoriteRepository from "../repositories/favorite.repository";

export default class FavoriteController {
    async getFavorites(req: Request, res: Response) {
        try {
            const list = await favoriteRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setFavorites(req: Request, res: Response) {
        const { productId, authUser } = req.body
        const userId = authUser.userId

        try {
            const row = await favoriteRepository.one(productId, userId)

            if (!row) {
                const insert = await favoriteRepository.insert(productId, userId)
                return res.status(200).send({ message: "", data: insert })
            } else {
                const _delete = await favoriteRepository.delete(productId, userId)
                return res.status(200).send({ message: "", data: _delete })
            }
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
}