import { Application } from "express"
import AuthController from "../controllers/auth.controller"
import authRouter from "./auth.route"
import addressRoutes from "./address.route"
import fileRouters from "./file.route"
import imagesRouters from "./images.route"
import campaignRouters from "./campaign.route"
import categoryRouters from "./category.route"
import commentRouters from "./comment.route"
import contentRouters from "./content.route"
import couponRouters from "./coupon.route"
import favoriteRouters from "./favorite.route"
import movementRouters from "./movement.route"
import priceRouters from "./price.route"
import productCategoryRouters from "./product_category.route"
import productRouters from "./product.route"
import ratingRouters from "./rating.route"
import userRouters from "./user.route"
import variationRouters from "./variation.route"
import paymentRouters from "./payment.route"
import menuRouters from "./menu.route"

export default class Routes {
    auth = new AuthController()

    constructor(app: Application){
        app.use('/api/v1/auth', authRouter)
        //app.use(this.addBodyUser)
        app.use('/api/v1/address', addressRoutes)
        app.use('/api/v1/file', fileRouters)
        app.use('/api/v1/img', imagesRouters)
        app.use('/api/v1/campaign', campaignRouters)
        app.use('/api/v1/category', categoryRouters)
        app.use('/api/v1/comment', commentRouters)
        app.use('/api/v1/content', contentRouters)
        app.use('/api/v1/coupon', couponRouters)
        app.use('/api/v1/favorite', favoriteRouters)
        app.use('/api/v1/movement', movementRouters)
        app.use('/api/v1/price', priceRouters)
        app.use('/api/v1/product-category', productCategoryRouters)
        app.use('/api/v1/product', productRouters)
        app.use('/api/v1/rating', ratingRouters)
        app.use('/api/v1/user', this.auth.addBodyUser, userRouters)
        app.use('/api/v1/variation', variationRouters)
        app.use('/api/v1/payment', paymentRouters)
        app.use('/api/v1/menu', menuRouters)
    }
}

