import { Request, Response } from "express";
import CampaignRepository from "../repositories/campaign.repository"

export default class CampaignController {
    async getCampaigns(req: Request, res: Response) {
        try {
            const list = await CampaignRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async getBasketCampaigns(req: Request, res: Response) {
        try {
            const list = await CampaignRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setCampaigns(req: Request, res: Response) {
        const {productId, title, description, type} = req.body
        try {
            const insert = await CampaignRepository.insert(productId, title, description, type)

            res.status(200).send({ message: "successful", data: insert })
        } catch (error) {
            return res.status(404).send({ message: "geçerli ürün yoktur", error })
        }
    }
}