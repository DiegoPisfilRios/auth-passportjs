const mongoose =require('mongoose')

module.exports = { connect }

//let DB_URI = app.get('env') === 'production' ? process.env.MONGODB_URL: 'mongo://12'

console.log(process.env.MONGODB_URL)

function connect () {
    if(mongoose.connections[0].readyState){
        console.log('Already connected.')
        return;
    }
    mongoose.connect(process.env.MONGODB_URL, err => {
        console.log('object')
        if(err) throw err;
        console.log('Connected to mongodb.')
    })
}
