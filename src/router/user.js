const router = require('express').Router()
const { EncodePassword } = require('../auth/Password')
const User = require('../model/User')

// auth middleware
function auth(req, res, done) {
    if (!req.user) return res.status(401).json({ authentication: false })
    done()
}

router.route('/')
    .get(auth, (req, res) => {
        res.json({ user: req.user })
    })
router.route('/delete')
    .get(auth, async (req, res) => {
        await User.findOneAndDelete({ _id: req.user._id })
        req.session.destroy()
        res.redirect('/')
    })
router.route('/register')
    .post(async (req, res) => {
        let user = new User(req.body)

        user.password = EncodePassword(req.body.password)
        user.photo = user.gravatar()
        user.provider = 'local'

        await user.save((err, user) => {
            if (err) return res.redirect(res.redirect(path.join(__dirname + '/views/register.html')))

            req.user = user
            res.redirect('/login')
        })
    })

module.exports = router