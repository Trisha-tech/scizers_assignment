const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required.']
    },
    email: {
        type: String,
        required: [true, 'email is required.']
    },
    password: {
        type: String,
        required: [true, 'password is required.']
    }
})

const User = new mongoose.model("UserSchema", userSchema);

module.exports = User;