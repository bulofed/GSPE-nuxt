import { Schema } from 'mongoose';
import { LessonSchema } from './Lesson';

export const RessourceSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lessons: [LessonSchema]
});