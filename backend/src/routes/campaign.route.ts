import { Router } from "express"
import CampaignController from "../controllers/campaign.controller"

class CampaignRoutes {
    router = Router()
    controller = new CampaignController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getCampaigns)
        this.router.get('/basket', this.controller.getBasketCampaigns)
        this.router.post('/', this.controller.setCampaigns)
    }
}

export default new CampaignRoutes().router
