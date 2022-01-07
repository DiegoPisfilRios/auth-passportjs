const { model, Schema } = require('mongoose')
const crypto = require('crypto')

const userSchema = new Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    provider: String,
    providerId: String,
    photo: String,
},{ timestamps: true })

userSchema.methods.gravatar = function (size) {
    if (!size) size = 200

    if (!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`
}

module.exports = model('User', userSchema)