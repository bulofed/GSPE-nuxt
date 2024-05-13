import { Schema, model } from 'mongoose';
import { ITeacher } from '~/types';

const TeacherSchema = new Schema<ITeacher>({
    firstname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
}, { timestamps: true });

export const Teacher = model<ITeacher>('Teacher', TeacherSchema);