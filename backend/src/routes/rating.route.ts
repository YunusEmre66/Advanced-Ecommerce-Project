import { Router } from "express"
import RatingController from "../controllers/rating.controller"
import AuthController from "../controllers/auth.controller"

class RatingRoutes {
    router = Router()
    controller = new RatingController()
    auth = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getRatings)
        this.router.post('/', this.auth.addBodyUser, this.controller.setRatings)
    }
}

export default new RatingRoutes().router
