import { Schema, model } from 'mongoose';
import type { ITeacher } from '~/types';
import { ResourceSchema } from './Resource';
import { TeacherInfoSchema } from './TeacherInfo';

const TeacherSchema = new Schema<ITeacher>({
    info: TeacherInfoSchema,
    resources: [ResourceSchema],
}, { timestamps: true });

export const Teacher = model<ITeacher>('Teacher', TeacherSchema);