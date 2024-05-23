import { Op } from "sequelize";
import Address from "../models/address.model"

interface IAddressRepository {
    one(userId: number): Promise<Address | null>;
    insert(
        body: any
    ): Promise<Address | null>
    update(
        body: any
    ): Promise<number>
}

class AddressRepository implements IAddressRepository {
    async one(userId: number): Promise<Address | null> {
        try {
            return await Address.findOne({ where: { userId } })
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async insert(
        body: any
    ): Promise<Address | null> {
        try {
            return await Address.create(body)
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
    async update(
        body: any
    ): Promise<number> {
        return Address.update(
            body,
            { where: { id: body.id } })
            .then((res) => {
                return res[0]
            })
            .catch((error) => {
                return 0
            })
    }
}

export default new AddressRepository()

