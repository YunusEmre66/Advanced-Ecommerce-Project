import { Router } from "express"
import CommentController from "../controllers/comment.controller"

class CommentRoutes {
    router = Router()
    controller = new CommentController()

    constructor(){
        this.initializeRoutes()
    }

    initializeRoutes() {
        this.router.get('/', this.controller.getComments)
        this.router.post('/', this.controller.setComments)
    }
}

export default new CommentRoutes().router
