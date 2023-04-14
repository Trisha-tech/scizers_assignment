const mongoose = require('mongoose');
const Joi = require('joi');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required.']
    },
    email: {
        type: String,
        required: [true, 'email is required.']
    },
    mobile: {
        type: Number,
        required: [true, 'mobile number is required.']
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "UserSchema"
    }
})

const Contact = new mongoose.model("ContactSchema", contactSchema);

const validateContact = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().email().required(),
        mobile: Joi.number().min(7).max(10000000000).required()
    })
    return schema.validate(data);
}


module.exports = {
    validateContact,
    Contact
}