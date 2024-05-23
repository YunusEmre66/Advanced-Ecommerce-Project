import { Router } from "express"
import MovementController from "../controllers/movement.controller"
import AuthController from "../controllers/auth.controller"

class MovementRoutes {
    router = Router()
    controller = new MovementController()
    auth = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getMovements)
        this.router.get('/user-orders', this.auth.addBodyUser, this.controller.getUserOrders)
        this.router.get('/users-orders', this.auth.isAdmin, this.controller.getUsersOrders)
        this.router.post('/order-event', this.auth.isAdmin, this.controller.setOrderEvent)
        this.router.post('/', this.controller.setMovements)
        this.router.post('/add-basket', this.auth.addBodyUser, this.controller.addBasket)
        this.router.post('/remove-basket', this.auth.addBodyUser, this.controller.removeBasket)
    }
}

export default new MovementRoutes().router

