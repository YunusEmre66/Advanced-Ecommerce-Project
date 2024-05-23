import { Router } from "express"
import AddressController from "../controllers/address.controller"
import AuthController from "../controllers/auth.controller"

class AddressRoutes {
    router = Router()
    controller = new AddressController()
    auth = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/user-address', this.auth.addBodyUser, this.controller.getUserAddress)
        this.router.get('/cities', this.controller.getCities)
        this.router.get('/city/:city', this.controller.getDistrict)
        this.router.get('/districts/:city/:district', this.controller.getTown)
        this.router.post('/user-add-address', this.auth.addBodyUser, this.controller.setUserAddress)
        this.router.put('/user-address/:id', this.auth.addBodyUser, this.controller.updateUserAddress)
    }
}

export default new AddressRoutes().router
