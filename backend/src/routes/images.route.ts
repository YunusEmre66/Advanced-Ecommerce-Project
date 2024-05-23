import { Router } from "express"
import ImagesController from "../controllers/images.controller"

class ImagesRouters{
    router = Router()
    controller = new ImagesController()

    constructor() {
        this.initializeRouters()
    }

    initializeRouters() {
        this.router.get('/:size/:fileName', this.controller.getImages)
        this.router.get('/:fileName', this.controller.getImages)
    }
}

export default new ImagesRouters().router
