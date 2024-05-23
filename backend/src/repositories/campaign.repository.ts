import { Op } from "sequelize";
import Campaign from "../models/campaign.model"

interface ICampaignRepository {
    list(): Promise<Array<Campaign>>;
    basketList(): Promise<Array<Campaign>>;
    insert(
        productId: number, 
        title: string, 
        description: string, 
        type: string
        ): Promise<Campaign | null>
}

class CampaignRepository implements ICampaignRepository {
    async list(): Promise<Array<Campaign>>{
        try {
            return await Campaign.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async basketList(): Promise<Array<Campaign>>{
        try {
            return await Campaign.findAll({
                where: {
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
        productId: number, 
        title: string, 
        description: string, 
        type: string
        ): Promise<Campaign | null>{
        try {
            return await Campaign.create({
                productId,
                title, 
                description,
                type
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new CampaignRepository()