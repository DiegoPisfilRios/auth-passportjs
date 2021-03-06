const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const passport = require('passport')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

dotenv.config()

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())


var sess = {
    secret: 'keysecret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: process.env.MONGODB_URL,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    }),
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'))

// Setting
app.set('views', path.join(__dirname, 'views'))
app.set('port', process.env.PORT || 4000)

module.exports = app