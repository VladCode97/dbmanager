import {DBConnection} from "../../../domain/DBConnection";
import {Connection, createConnection} from 'mysql';
import {TOptionsDatabase} from "../../../domain/types/options-database";

export class MysqlDB extends DBConnection {

    constructor(options: TOptionsDatabase) {
        super(options);
    }

    protected connection(): Connection {
        try {
            return createConnection({
                host: this.optionsDatabase.host,
                database: this.optionsDatabase.database,
                password: this.optionsDatabase.password,
                user: this.optionsDatabase.user,
                port: this.optionsDatabase.port
            });
        } catch (exception) {
            throw new Error(exception);
        }
    }

    async executeQuery(query: string, params?: string[] | Object): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.connection().query(query, params, (error, data) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        return resolve(data);
                    }
                });
            });
        } catch (exception) {
            throw new Error(exception);
        }
    }

    async getAll<T>(): Promise<Array<T>> {
        try {
            const response = await this.executeQuery(`SELECT * FROM ${this.optionsDatabase.table};`);
            return response as unknown as Array<T>;
        } catch (exception) {
            throw new Error(exception);
        }
    }

    async insert<T>(data: T): Promise<T> {
        try {
            await this.executeQuery(`INSERT INTO ${this.optionsDatabase.table} ${this.optionsDatabase.queryOptions};`, Object.values(data));
            return data;
        } catch (exception) {
            throw new Error(exception);
        }
    }
}