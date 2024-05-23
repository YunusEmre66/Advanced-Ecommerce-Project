import { Router } from "express"
import CouponController from "../controllers/coupon.controller"
import AuthController from "../controllers/auth.controller"

class CouponRoutes {
    router = Router()
    controller = new CouponController()
    auth = new AuthController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getCoupons)
        this.router.post('/', this.controller.setCoupons)
        this.router.post('/use', this.auth.addBodyUser, this.controller.setUseCoupon)
    }
}

export default new CouponRoutes().router
