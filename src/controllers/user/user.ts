import {DBConnection} from "../../domain/DBConnection";
import {User} from "../../domain/user";

export class UserController {
    constructor(
        private readonly dbConnection: DBConnection
    ) {}

    async createUser(user: User): Promise<User> {
        try {
            return await this.dbConnection.insert<User>(user) as User;
        } catch (exception) {
            throw new Error(exception);
        }
    }

    async getAll(): Promise<Array<User>> {
        try {
            const users = await this.dbConnection.getAll();
            return users as Array<User>;
        } catch (exception) {
            throw new Error(exception);
        }
    }

}