import { Router } from "express"
import CategoryController from "../controllers/category.controller"

class CategoryRoutes {
    router = Router()
    controller = new CategoryController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getCategories)
        this.router.get('/:slug', this.controller.getCategoryProducts)
        this.router.post('/', this.controller.setCategory)
    }
}

export default new CategoryRoutes().router
