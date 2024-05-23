import { Request, Response } from "express";
import ProductCategoryRepository from "../repositories/product_category.repository";

export default class ProductCategoryController {
    async getProductCategories(req: Request, res: Response) {
        try {
            const list = await ProductCategoryRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async getCategoryProducts(req: Request, res: Response) {
        try {
            const list = await ProductCategoryRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }

    async setProductCategory(req: Request, res: Response) {
        const { productId, categories } = req.body
        try {
            await ProductCategoryRepository.destroyProductCategory(productId, categories)
            console.log('>>>>>');
            
            for (const category of categories) {
                const one = await ProductCategoryRepository.one(productId, category)
                if (!one)
                    await ProductCategoryRepository.insert(productId, category)
            }

            res.status(200).send({ message: "", status: true })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
}