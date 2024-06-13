import { Schema } from 'mongoose';
import type { ITeacherInfo } from '~/types';

export const TeacherInfoSchema = new Schema<ITeacherInfo>({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });