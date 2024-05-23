import { Op } from "sequelize";
import ProductCategory from "../models/product.category.model"

interface IProductCategoryRepository {
    one(
        productId: number,
        categoryId: number
    ): Promise<ProductCategory | null>;
    list(): Promise<Array<ProductCategory>>;
    insert(
        productId: number,
        categoryId: number
    ): Promise<ProductCategory | null>;
    destroyProductCategory(
        productId: number,
        categories: number[]
    ): Promise<boolean>;
}

class ProductCategoryRepository implements IProductCategoryRepository {
    async one(
        productId: number,
        categoryId: number
    ): Promise<ProductCategory | null> {
        try {
            return await ProductCategory.findOne({
                where: {
                    productId, categoryId
                }
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async list(): Promise<Array<ProductCategory>> {
        try {
            return await ProductCategory.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async insert(
        productId: number,
        categoryId: number
    ): Promise<ProductCategory | null> {
        try {
            return await ProductCategory.create({ productId, categoryId })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async destroyProductCategory(
        productId: number,
        categories: number[]
    ): Promise<boolean> {
        try {
            await ProductCategory.destroy({
                where: {
                    productId, categoryId: {
                        [Op.notIn]: categories
                    }
                }
            })
            return true
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new ProductCategoryRepository()