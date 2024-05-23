import { Router } from "express"
import MenuController from "../controllers/menu.controller"

class MenuRoutes {
    router = Router()
    controller = new MenuController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getMenu)
    }
}

export default new MenuRoutes().router
