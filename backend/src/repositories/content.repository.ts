import { Op } from "sequelize";
import Content from "../models/content.model"

interface IContentRepository {
    list(): Promise<Array<Content>>;
    one(slug: string): Promise<Content | null>;
    insert(
        productId: number,
        title: string,
        slug: string,
        description: string,
        type: string
    ): Promise<Content | null>
}

class ContentRepository implements IContentRepository {
    async list(): Promise<Array<Content>> {
        try {
            return await Content.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async one(slug: string): Promise<Content | null> {
        try {
            return await Content.findOne({
                where: { slug }
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async insert(
        productId: number,
        title: string,
        slug: string,
        description: string,
        type: string
    ): Promise<Content | null> {
        try {
            return await Content.create({
                productId,
                title,
                slug,
                description,
                type
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new ContentRepository()