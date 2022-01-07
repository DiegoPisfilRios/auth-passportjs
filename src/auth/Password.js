const bcrypt = require('bcrypt')

const EncodePassword = (payload) => {
    return bcrypt.hashSync(payload, 10)
}

const ComparePassword = ({ password, comparePassword}) => {
    return bcrypt.compareSync(password, comparePassword)
}

module.exports = { 
    EncodePassword,
    ComparePassword
}