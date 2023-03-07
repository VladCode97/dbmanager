import {DBConnection} from "../../../domain/DBConnection";
import {MongoDB} from "../nosql/mongo/mongoDB";
import {
    UserModelMongo,
    UserSchemaMongo
} from "../nosql/mongo/user-document";
import {MysqlDB} from "../sql/mysql";

export enum EDatabase {
    MYSQL = "MYSQL",
    MONGO = "MONGO",
}

export type TDatabaseManager = keyof typeof EDatabase;
export type TInputOptionsSQL = {
    table: string;
    queryOption: string;
};

export type TInputOptionsNSQL = {
    schema: any;
    model: any;
};

export class Dbmanager {
    createInstanceDB(typeDatabase: TDatabaseManager, inputOptionManagerSQL?: TInputOptionsSQL , inputOptionManagerNOSQL?: TInputOptionsNSQL): DBConnection {
        switch (typeDatabase) {
            case "MYSQL":
                return new MysqlDB({
                    host: process.env.HOST,
                    database: process.env.DATABASE,
                    port: parseInt(process.env.PORT),
                    user: process.env.USERNAME,
                    password: process.env.PASSWORD,
                    table: inputOptionManagerSQL.table,
                    queryOptions: inputOptionManagerSQL.queryOption,
                })
                break;
            case "MONGO":
                return new MongoDB({
                    host: process.env.HOSTMONGO,
                    database: process.env.DATABASE_MONGO,
                    schemaMongo: inputOptionManagerNOSQL.schema,
                    modelMongo: inputOptionManagerNOSQL.model
                })
                break;
            default:
                console.log('Choice an any option');
                break;
        }
    }
}