import {DBConnection} from "../../../../domain/DBConnection";
import {connect, Document, Model} from 'mongoose';
import {TOptionsDatabase} from "../../../../domain/types/options-database";

export class MongoDB extends DBConnection {

    constructor(options: TOptionsDatabase) {
        super(options);
    }

    protected async connection<T extends Document>(): Promise<Model<T>> {
        try {
            await connect(this.optionsDatabase.host + this.optionsDatabase.database, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            return this.optionsDatabase.modelMongo;
        } catch (exception) {
            throw new Error(exception);
        }
    }

    async getAll<T>(): Promise<Array<T>> {
        try {
            const response = await (await this.connection()).find({});
            return response as unknown as Array<T>;
        } catch (exception) {
            throw new Error(exception);
        }
    }

    async insert<T>(data: T): Promise<T> {
        try {
            await (await this.connection()).create(data);
            return data as T;
        } catch (exception) {
            throw new Error(exception);
        }
    }

}