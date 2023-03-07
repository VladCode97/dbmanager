export type TOptionsDatabase = {
    host?: string;
    port?: number;
    user?: string;
    database?: string;
    password?: string;
    table?: string;
    modelMongo?: any;
    schemaMongo?: any
    queryOptions?: string;
}