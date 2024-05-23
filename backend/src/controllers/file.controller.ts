import { Request, Response } from "express";

export default class FileController {
    async upload(req: Request | any, res: Response) {
        console.log(req);
        
        const multer = require('multer')
        const upload = multer({ dest: 'uploads/' }).single('avatar')
        const path = require('path') // dosya uzantısını alma işlemi

        upload(req, res, function (err: any) {
            if (err instanceof multer.MulterError) {
                res.status(200).send({ message: "error", err });
            } else if (err) {
                res.status(200).send({ message: "error", err });
            }
            const fs = require('fs');
            const newPath = ('uploads/' + 'test-' + (new Date).getTime() + '-' + req.file.originalname)
            
            fs.rename('uploads/' + req.file.filename, newPath, async (error: any) => {});
            res.status(200).send({ message: "Uploaded successfully", newPath });
        })
    }
}
