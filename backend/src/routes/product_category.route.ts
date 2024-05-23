import { Router } from "express"
import ProductCategoryController from "../controllers/product_category.controller"

class ProductCategoryRoutes {
    router = Router()
    controller = new ProductCategoryController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/products', this.controller.getCategoryProducts)
        this.router.get('/categories', this.controller.getProductCategories)
        this.router.post('/add-product-category', this.controller.setProductCategory)
    }
}

export default new ProductCategoryRoutes().router
