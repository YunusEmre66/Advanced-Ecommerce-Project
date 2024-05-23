import Price from "../models/price.model"

interface IPriceRepository {
    row(productId: number): Promise<Price | null>;
    list(): Promise<Array<Price>>;
    update(
        id: number,
        productId: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<number | null>;
    updateProductId(
        productId: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<number | null>;
    productUpdate(
        id: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<number | null>;
    insert(
        productId: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<Price | null>;
}

class PriceRepository implements IPriceRepository {
    async row(productId: number): Promise<Price | null> {
        try {
            return await Price.findOne({ where: { productId } })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async list(): Promise<Array<Price>> {
        try {
            return await Price.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async update(
        id: number,
        productId: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<number | null> {
        return await Price.update(
            { productId, price, discountPrice, discountRate },
            { where: { id } }
        )
            .then((res) => {
                return res[0]
            })
            .catch((error) => {
                throw new Error("Couldn't find")
            })
    }
    async updateProductId(
        productId: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<number | null> {
        return await Price.update(
            { price, discountPrice, discountRate },
            { where: { productId } }
        )
            .then((res) => {
                return res[0]
            })
            .catch((error) => {
                throw new Error("Couldn't find")
            })
    }
    async productUpdate(
        id: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<number | null> {
        return await Price.update(
            { price, discountPrice, discountRate },
            { where: { productId: id } }
        )
            .then((res) => {
                return res[0]
            })
            .catch((error) => {
                throw new Error("Couldn't find")
            })
    }
    async insert(
        productId: number,
        price: number,
        discountPrice: number,
        discountRate: number
    ): Promise<Price | null> {
        try {
            return await Price.create({ productId, price, discountPrice, discountRate })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new PriceRepository()