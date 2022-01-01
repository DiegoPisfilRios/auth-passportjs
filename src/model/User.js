const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    provider: String,
    providerId: String,
    photo: String,
},{ timestamps: true })

module.exports = model('User', userSchema)