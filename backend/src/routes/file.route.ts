import { Router } from "express";
import FileController from "../controllers/file.controller";

class FileRouters {
    router = Router()
    controller = new FileController()

    constructor() {
        this.initializeRouters()
    }

    initializeRouters() {

        /*const multer = require('multer');
        const upload = multer({ dest: 'uploads/' })

        this.router.post('/upload', upload.single('avatar'), this.controller.upload)*/

        this.router.post('/upload', this.controller.upload)
    }
}

export default new FileRouters().router
