import { Router } from "express"
import PriceController from "../controllers/price.controller"

class PriceRoutes {
    router = Router()
    controller = new PriceController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getPrices)
        this.router.get('/:id', this.controller.getPrice)
        this.router.post('/', this.controller.setPrices)
    }
}

export default new PriceRoutes().router
