import { Router } from "express"
import PaymentController from "../controllers/payment.controller"
import AuthController from "../controllers/auth.controller"

class PaymentRoutes {
    router = Router()
    controller = new PaymentController
    auth = new AuthController()

    constructor() {
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.post('/', this.auth.addBodyUser, this.controller.pay)
        this.router.post('/test', this.controller.test)
    }
}

export default new PaymentRoutes().router