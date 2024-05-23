import Variation from "../models/variation.model"

interface IVariationRepository {
    list(): Promise<Array<Variation>>;
    insert(
        productId: number, 
        title: string, 
        description: string, 
        seo: string
        ): Promise<Variation | null>
}

class VariationRepository implements IVariationRepository {
    async list(): Promise<Array<Variation>>{
        try {
            return await Variation.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async insert(
        productId: number, 
        title: string, 
        description: string, 
        seo: string
        ): Promise<Variation | null>{
            try {
                return await Variation.create({
                    productId,
                    title, 
                    description,
                    seo
                })
            } catch (error) {
                throw new Error("Couldn't find")
            }
        }
}

export default new VariationRepository()