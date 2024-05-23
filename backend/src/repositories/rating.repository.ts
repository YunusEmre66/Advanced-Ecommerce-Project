import Rating from "../models/rating.model"

interface IRatingRepository {
    list(): Promise<Array<Rating>>;
    one(productId: number,
        userId: number): Promise<Rating | null>;
    insert(
        productId: number,
        userId: number,
        rating: number
    ): Promise<Rating | null>
    update(
        productId: number,
        userId: number,
        rating: number
    ): Promise<number>
}

class RatingRepository implements IRatingRepository {
    async list(): Promise<Array<Rating>> {
        try {
            return await Rating.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async one(productId: number,
        userId: number): Promise<Rating | null> {
        try {
            return await Rating.findOne({
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
        userId: number,
        rating: number
    ): Promise<Rating | null> {
        try {
            return await Rating.create({
                productId,
                userId,
                rating
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async update(productId: number,
        userId: number,
        rating: number): Promise<number> {
        return Rating.update(
            { rating },
            { where: { productId, userId } })
            .then((res) => {
                return res[0]
            })
            .catch((error) => {
                return 0
            })
    }
}

export default new RatingRepository()