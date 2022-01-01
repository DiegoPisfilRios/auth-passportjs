const mongoose =require('mongoose')

module.exports = { connect }

function connect () {
    if(mongoose.connections[0].readyState){
        console.log('Already connected.')
        return;
    }
    mongoose.connect(process.env.MONGODB_URL, err => {
        if(err) throw err;
        console.log('Connected to mongodb.')
    })
}
