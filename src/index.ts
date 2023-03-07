import {UserController} from "./controllers/user/user";
import {MysqlDB} from "./controllers/dbs/sql/mysql";
import * as DotEnv from 'dotenv';
import {
    Dbmanager,
    EDatabase
} from "./controllers/dbs/dbmanager/dbmanager";
import {
    UserModelMongo,
    UserSchemaMongo,
} from "./controllers/dbs/nosql/mongo/user-document";

DotEnv.config();

class Main {
    async main(): Promise<void> {
        const mongoManager = new Dbmanager().createInstanceDB(EDatabase.MONGO, undefined, {
            schema: UserSchemaMongo,
            model: UserModelMongo,
        });
        const mysqlManager = new Dbmanager().createInstanceDB(EDatabase.MYSQL, {
                table: 'person',
                queryOption: '(name, age, document) VALUES (?, ?, ?)'
            }
        );
        const userController: UserController = new UserController(mongoManager);
        console.log(await userController.getAll());
    }
}


(async () => {
    await new Main().main();
})();
