import { Request, Response } from "express";

export default class ImagesController {
    async getImages(req: Request, res: Response) {
        // res.status(200).send({ message: "Images retrieved", url: req.params });

        //------
        const fs = require("fs");
        const resizeImg = require('resize-img');
        // fs.readFile(
        //     `uploads/${req.params.fileName}`,

        //     function (err: any, image: any) {
        //         if (err) {
        //             throw err;
        //         }
        //         res.setHeader('Content-Type', 'image/jpg');
        //         res.setHeader('Content-Length', ''); // Image size here
        //         res.setHeader('Access-Control-Allow-Origin', '*')
        //         res.send(image);
        //     }
        // );
        //------
        const file = await resizeImg(fs.readFileSync(`uploads/${req.params.fileName}`), {
            width: parseInt(req.params.size)
        });

        res.setHeader('Content-Type', 'image/jpg');
        res.setHeader('Content-Length', ''); // Image size here
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send(file);
        //------
        // const fs = require('fs').promises;
        // const contents = await fs.readFile(`uploads/${req.params.fileName}`, {encoding: 'base64'});
        // res.status(200).send({ message: "Images retrieved", img: contents })
        //------
        // res.download('uploads/' + req.params.fileName)
    }
}
