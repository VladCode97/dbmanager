import {TOptionsDatabase} from "./types/options-database";

export interface DBConnection {
   executeQuery?(query: string, params?: string[] | Object): Promise<unknown>;
}

export abstract class DBConnection {

    protected optionsDatabase: TOptionsDatabase;

    protected constructor(optionsDatabase: TOptionsDatabase) {
        this.optionsDatabase = optionsDatabase;
    }

    protected abstract connection(): unknown;

    abstract insert<T>(data: T): Promise<unknown>;

    abstract getAll<T>(): Promise<Array<unknown>>;

    executeQuery?(query: string, params?: string[] | Object): Promise<unknown>;
}