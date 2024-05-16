import { Schema, model } from 'mongoose';
import { ITeacher } from '~/types';

const TeacherSchema = new Schema<ITeacher>({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

export const Teacher = model<ITeacher>('Teacher', TeacherSchema);