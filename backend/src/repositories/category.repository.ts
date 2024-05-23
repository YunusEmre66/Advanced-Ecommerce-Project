import Category from "../models/category.model"
import Price from "../models/price.model"
import ProductCategory from "../models/product.category.model"
import Product from "../models/product.model"

interface ICategoryRepository {
    list(): Promise<Array<Category>>
    categoryProducts(slug: string): Promise<Category | null>
    insert(title: string, description: string): Promise<Category | null>
}

class CategoryRepository implements ICategoryRepository {
    async list(): Promise<Array<Category>> {
        try {
            return await Category.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async categoryProducts(slug: string): Promise<Category | null> {
        try {
            return await Category.findOne({
                where: { seo: slug },
                attributes: { exclude: ['deletedAt', 'createdAt'] },
                include: {
                    model: ProductCategory,
                    attributes: ['id'],
                    include: [{
                        model: Product,
                        attributes: { exclude: ['deletedAt', 'createdAt'] },
                        include: [{
                            model: Price,
                            attributes: ['price', 'discountPrice', 'discountRate']
                        }]
                    }]
                }
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }

    async insert(title: string, description: string): Promise<Category | null> {
        try {
            return await Category.create({ title, description })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new CategoryRepository()