import { Schema, model } from 'mongoose';

export interface UserDocument extends Document {
    email: string;
    username: string;
    password: string;
    isAdmin: boolean;
};

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    

    password: {
        type: String,
        required: true,
        length: [8, 'Le mot de passe doit contenir au moins 8 caractères'],
    },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
});

export const User = model<UserDocument>('User', UserSchema);