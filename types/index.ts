import type { Types } from 'mongoose'

export interface ILesson {
  _id?: Types.ObjectId
  name: string
  hours: number
}

export interface IResource {
  _id?: Types.ObjectId
  teachers?: ITeacherInfo[]
  name: string
  lessons: ILesson[]
}

export interface ITeacherInfo {
  firstname: string
  lastname: string
}

export interface ITeacher {
  _id?: Types.ObjectId
  info: ITeacherInfo
  resources: IResource[]
  createdAt?: Date
  updatedAt?: Date
}