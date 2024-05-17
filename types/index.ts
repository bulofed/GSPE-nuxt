import { Types } from "mongoose"

export interface ILesson {
    _id: Types.ObjectId
    name: string,
    hours: number
}

export interface IRessource {
    _id: Types.ObjectId
    name: string,
    lessons: ILesson[]
}

export interface ITeacher {
    _id?: Types.ObjectId
    firstname: string,
    lastname: string,
    ressources: IRessource[],
    createdAt?: Date,
    updatedAt?: Date
}