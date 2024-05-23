import Favorite from "../models/favorite.model"

interface IFavoriteRepository {
    list(): Promise<Array<Favorite>>;
    one(productId: number,
        userId: number): Promise<Favorite | null>;
    insert(
        productId: number,
        userId: number
    ): Promise<Favorite | null>;
    delete(
        productId: number,
        userId: number
    ): Promise<boolean>;
}

class FavoriteRepository implements IFavoriteRepository {
    async list(): Promise<Array<Favorite>> {
        try {
            return await Favorite.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async one(productId: number,
        userId: number): Promise<Favorite | null> {
        try {
            return await Favorite.findOne({
                where: {
                    productId,
                    userId
                }
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async insert(
        productId: number,
        userId: number
    ): Promise<Favorite | null> {
        try {
            return await Favorite.create({ productId, userId })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async delete(productId: number, userId: number): Promise<boolean> {
        try {
            await Favorite.destroy({
                where: { productId, userId }
            })
            return true
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new FavoriteRepository()