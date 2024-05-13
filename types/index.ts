import { Types } from "mongoose"

export interface ITeacher {
    _id: Types.ObjectId
    firstname: string,
    lastname: string,
    createdAt: Date,
    updatedAt: Date
}