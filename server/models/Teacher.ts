import { Schema, model } from 'mongoose';
import { ITeacher } from '~/types';
import { RessourceSchema } from './Ressource';

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

    ressources: [RessourceSchema],
}, { timestamps: true });

export const Teacher = model<ITeacher>('Teacher', TeacherSchema);