import { Router } from "express"
import UserController from "../controllers/user.controller"

class UserRoutes {
    router = Router()
    controller = new UserController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getUsers)
        this.router.get('/me', this.controller.getMe)
    }
}

export default new UserRoutes().router
