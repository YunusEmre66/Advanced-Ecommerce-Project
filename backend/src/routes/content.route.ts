import { Router } from "express"
import ContentController from "../controllers/content.controller"

class CampaignRoutes {
    router = Router()
    controller = new ContentController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getContents)
        this.router.get('/:slug', this.controller.getContent)
        this.router.post('/', this.controller.setContents)
    }
}

export default new CampaignRoutes().router
