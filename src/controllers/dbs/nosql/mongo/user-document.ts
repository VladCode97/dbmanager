import { model, Schema, Model, Document } from 'mongoose';
import {User} from "../../../../domain/user";

export interface UserDocumentMongo extends Document, User {}

export const UserSchemaMongo: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

export const UserModelMongo:Model<UserDocumentMongo> = model("users", UserSchemaMongo);
