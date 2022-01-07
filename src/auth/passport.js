const User = require('../model/User')   // Load User model
const { ComparePassword } = require('./Password')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    try {
        let document = await User.findOne({ providerId: profile.id })
        if (document) return done(null, document)

        User.create({
            email: profile.emails[0].value,
            password: null,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            providerId: profile.id,
            provider: profile.provider,
            photo: profile.provider==='facebook' ? `https://graph.facebook.com/${profile.id}/picture?width=200&height=200&access_token=${accessToken}`: profile.photos[0].value ,
        }, (err, doc) => {
            if (err) return done(err)
            return done(null, doc)
        })

    } catch (err) {
        return done(err)
    }
}

//* Local
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!ComparePassword({ password , comparePassword: user.password })) { return done(null, false); }
            return done(null, user);
        })
    }
))

//* Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name', 'photos']
}, verifyCallback))

//* Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
    callbackURL: '/auth/google/callback',
    profileFields: ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name', 'photos']
}, verifyCallback))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findOne({
        _id: id
    }, '-password -salt', function(err, user) {
        done(err, user);
    });
});