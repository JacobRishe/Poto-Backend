const mongoose = require('mongoose')


const userSchema = new Schema ({
	username:  {
        type: String,
        required: true,
        unique: true
    },
	password: {
        type: String,
        required: true,
        unique: true
    },
	email: {
        type: String,
        required: true,
        unique: true
    },
    polls: [{ ref: 'Poll' }]
})


const User = mongoose.model('User', userSchema)

module.exports = User