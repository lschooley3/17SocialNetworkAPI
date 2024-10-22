import { Schema, Types, model, type Document } from 'mongoose';



interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
}


const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        max_length: 50,
        unique: true,

    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },],
},
    {
        toJSON: {
            getters: true,
        },
        timestamps: true
    }
);

const User = model('user', userSchema);

export default User;
