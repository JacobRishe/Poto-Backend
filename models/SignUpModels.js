const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}
    {timestamps: true}),

module.exports = mongoose.model('appPoTo', signUpTemplate)