import { Request, Response } from "express";
import ProductRepository from "../repositories/product.repository";
import favoriteRepository from "../repositories/favorite.repository";
import priceRepository from "../repositories/price.repository";

export default class ProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const list = await ProductRepository.list()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error", error })
        }
    }
    async getDashboardProducts(req: Request, res: Response) {
        try {
            const list = await ProductRepository.allList()
            if (!list) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", list })
        } catch (error) {
            return res.status(401).send({ message: "error", error })
        }
    }
    async getProduct(req: Request, res: Response) {
        const { authUser } = req.body
        const userId = authUser?.userId ?? 0

        try {
            if (isNaN(parseInt(req.params.seo)) === false) {
                const row = await ProductRepository.productId(parseInt(req.params.seo))
                const rowFavorite = await favoriteRepository.one(row?.id ?? 0, userId)
                if (!row) {
                    return res.status(401).send({ message: "no valid data found" })
                }

                res.status(200).send({ message: "", row, favorite: rowFavorite })
            } else {
                const row = await ProductRepository.productSeo(req.params.seo)
                const rowFavorite = await favoriteRepository.one(row?.id ?? 0, userId)
                if (!row) {
                    return res.status(401).send({ message: "no valid data found" })
                }

                res.status(200).send({ message: "", row, favorite: rowFavorite ? true : false })
            }
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setProductEnable(req: Request, res: Response) {
        const id: number = parseInt(req.params.id)
        try {
            const row = await ProductRepository.productUpdate(id, { confirm: true })
            if (!row) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ status: true, message: "", row })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setProductDisable(req: Request, res: Response) {
        const id: number = parseInt(req.params.id)
        try {
            const row = await ProductRepository.productUpdate(id, { confirm: false })
            if (!row) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ status: true, message: "", row })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async setProductDelete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id)
        const now = new Date(Date.now())
        try {
            const row = await ProductRepository.productUpdate(id, { deletedAt: now })
            if (!row) {
                return res.status(401).send({ message: "no valid data found" })
            }

            res.status(200).send({ status: true, message: "", row, now })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }
    async search(req: Request, res: Response) {
        try {
            const rows = await ProductRepository.search(req.params.search)
            if (rows.length === 0) {
                return res.status(404).send({ message: "no valid data found" })
            }

            res.status(200).send({ message: "", rows })
        } catch (error) {
            return res.status(401).send({ message: "error" })
        }
    }

    async setProduct(req: Request, res: Response) {
        const {
            title,
            seo,
            description,
            stockCode,
            barcode,
            associative,
            tax,
            salePrice,
            discountPrice,
            discountRate,
        } = req.body
        try {
            const insert = await ProductRepository.insert(
                title,
                seo,
                description,
                stockCode,
                barcode,
                associative,
                tax)

            if (insert)
                await priceRepository.insert(insert?.id, salePrice, discountPrice, discountRate)

            res.status(200).send({ message: "successful", data: insert })
        } catch (error) {
            res.status(500).send({ message: "Some error" })
        }
    }

    async updateProduct(req: Request, res: Response) {
        const {
            id,
            title,
            seo,
            description,
            stockCode,
            barcode,
            associative,
            tax,
            confirm,
            salePrice,
            discountPrice,
            discountRate,
        } = req.body

        try {
            if (id) {
                const row = await ProductRepository.productUpdate(id, {
                    title,
                    seo,
                    description,
                    stockCode,
                    barcode,
                    associative,
                    tax,
                    confirm
                })

                const price = await priceRepository.row(id)
                if (price) {
                    await priceRepository.updateProductId(id, salePrice, discountPrice, discountRate)
                }
                else {
                    await priceRepository.insert(id, salePrice, discountPrice, discountRate)
                }

                if (!row) {
                    return res.status(401).send({ message: "no valid data found" })
                }
                res.status(200).send({ status: true, message: "", row, price })
            } else {
                res.status(401).send({ message: "no valid data found" })
            }
        } catch (error) {
            res.status(500).send({ message: "Some error" })
        }
    }
}