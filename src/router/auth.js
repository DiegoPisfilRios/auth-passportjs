const passport = require('passport')
const User = require('../model/User')
const Router = require('express').Router()

require('../auth/passport')

//* Local
Router.route('/login')
    .post(
        passport.authenticate('local', {
            failureRedirect: '/login',
            successRedirect: '/'
        })
    )

//* Redirect to Facebook
Router.route('/facebook')
    .get(passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }))

//* Facebook Callback
Router.route('/facebook/callback')
    .get(passport.authenticate('facebook', {
        failureRedirect: '/auth/failure',
        successRedirect: '/auth/success'
    }))

//* Redirect to Google
Router.route('/google')
    .get(passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }))

//* Google Callback
Router.route('/google/callback')
    .get(passport.authenticate('google', {
        failureRedirect: '/auth/failure',
        successRedirect: '/auth/success'
    })
    )

//! Failure
Router.route('/failure')
    .get((req, res) => {
        res.json({ msg: 'Failure' })
    })

//? Success
Router.route('/success')
    .get((req, res) => {
        res.json({ msg: 'Success', user: req.user })
    })

Router.route('/users')
.get(async (req, res) => {
    let users = await User.find()
    res.json({users})
})


module.exports = Router