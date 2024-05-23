import Comment from "../models/comment.model"

interface ICommentRepository {
    list(): Promise<Array<Comment>>;
    insert(
        productId: number, 
        userId: number, 
        comment: string
        ): Promise<Comment | null>
}

class CommentRepository implements ICommentRepository {
    async list(): Promise<Array<Comment>>{
        try {
            return await Comment.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async insert(
        productId: number, 
        userId: number, 
        comment: string
        ): Promise<Comment | null>{
        try {
            return await Comment.create({
                productId, 
                userId, 
                comment
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new CommentRepository()