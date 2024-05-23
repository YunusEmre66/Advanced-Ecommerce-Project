import { Router } from "express"
import FavoriteController from "../controllers/favorite.controller"
import AuthController from "../controllers/auth.controller"

class FavoriteRoutes {
    router = Router()
    controller = new FavoriteController()
    auth = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getFavorites)
        this.router.post('/', this.auth.addBodyUser, this.controller.setFavorites)
    }
}

export default new FavoriteRoutes().router
