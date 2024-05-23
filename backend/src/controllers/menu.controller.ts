import { Request, Response } from "express";
import menuRepository from "../repositories/menu.repository";

export default class MenuController {
    async getMenu(req: Request, res: Response) {
        try {
            const list = await menuRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
}