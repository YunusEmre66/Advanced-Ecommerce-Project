import { Router } from "express"
import AuthController from "../controllers/auth.controller"

class AuthRouters{
    router = Router()
    controller = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.post('/sign-in', this.controller.login)
        this.router.post('/sign-up', this.controller.register)
    }
}

export default new AuthRouters().router
