import { Schema, model } from 'mongoose';
const userSchema = new Schema({
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
        },
    ],
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    timestamps: true
});
userSchema.virtual('commentCount').get(function () {
    return this.friends?.length;
});
const User = model('user', userSchema);
export default User;
