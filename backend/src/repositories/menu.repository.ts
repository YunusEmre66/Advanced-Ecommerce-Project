import Menu from "../models/menu.model"

interface IMenuRepository {
    list(): Promise<Array<Menu>>;
}

class MenuRepository implements IMenuRepository {
    async list(): Promise<Array<Menu>> {
        try {
            return await Menu.findAll()
        } catch (error) {
            throw new Error("Couldn't find")
        }
    }
}

export default new MenuRepository()