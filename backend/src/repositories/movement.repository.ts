import Movement from "../models/movement.model"
import Product from "../models/product.model";
import Users from "../models/user.model";

interface IMovementRepository {
    row(movementId: number): Promise<Movement | null>;
    list(userId: number): Promise<Array<Movement>>;
    userOrders(userId: number): Promise<Array<Movement>>;
    usersOrders(): Promise<Array<Movement>>;
    basket(userId: number): Promise<Array<Movement>>;
    payHeaderInsert(userId: number, total: number, tax: number, discountCouponPrice: number, address: string): Promise<Number>;
    payRowUpdate(userId: number, payId: number): Promise<Number>;
    eventUpdate(movementId: number, description: string): Promise<Number>;
    insert(
        productId: number,
        userId: number,
        processType: string,
        price: number,
        discountPrice: number,
        quantity: number,
        tax: number,
        total: number,
        description: string
    ): Promise<Movement | null>;
    deleteBasket(id: number, userId: number): Promise<boolean>;
}

class MovementRepository implements IMovementRepository {
    async row(movementId: number): Promise<Movement | null> {
        return await Movement.findOne({ where: { id: movementId } })
    }
    async list(userId: number): Promise<Array<Movement>> {
        try {
            return await Movement.findAll({ where: { userId } })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async userOrders(userId: number): Promise<Array<Movement>> {
        try {
            return await Movement.findAll({
                where: { userId, process_type: "pay" },
                include: [{
                    model: Product,
                    attributes: ['title']
                }]
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async usersOrders(): Promise<Array<Movement>> {
        try {
            return await Movement.findAll({
                where: { process_type: "pay" },
                include: [{
                    model: Product,
                    attributes: ['title']
                }, {
                    model: Users,
                    attributes: ['name']
                }]
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async basket(userId: number): Promise<Array<Movement>> {
        try {
            return await Movement.findAll({
                where: { userId, process_type: 'basket' },
                include: [{
                    model: Product,
                    attributes: ['title'],
                }]
            })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async payHeaderInsert(userId: number, total: number, tax: number, discountCouponPrice: number, address: string): Promise<number> {
        return Movement.create({
            userId,
            processType: "pay",
            tax,
            total,
            description: "Ödeme işlemi yapıldı" + (discountCouponPrice > 0 ? " " + discountCouponPrice + " indirim yapıldı" : ""),
            address
        }).then((res) => {
            return res.dataValues.id
        }).catch(() => {
            return 0
        })
    }

    async payRowUpdate(userId: number, payId: number): Promise<number> {
        return Movement.update(
            { movementId: payId, type: false, processType: 'pay' },
            { where: { userId: userId, processType: 'basket' } })
            .then((res) => {
                return res[0]
            })
            .catch((error) => {
                return 0
            })
    }
    async eventUpdate(movementId: number, description: string): Promise<number> {
        return Movement.update(
            { description },
            { where: { id: movementId } })
            .then((res) => {
                return res[0]
            })
            .catch((error) => {
                return 0
            })
    }
    async insert(
        productId: number,
        userId: number,
        processType: string,
        price: number,
        discountPrice: number,
        quantity: number,
        tax: number,
        total: number,
        description: string
    ): Promise<Movement | null> {
        try {
            return Movement.create({
                productId, userId, processType, price, discountPrice, quantity, tax, total, description
            })
        } catch (error) {
            throw new Error("error")
        }
    }
    async deleteBasket(id: number, userId: number): Promise<boolean> {
        try {
            await Movement.destroy({
                where: { id, userId, process_type: 'basket' }
            })
            return true
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new MovementRepository()