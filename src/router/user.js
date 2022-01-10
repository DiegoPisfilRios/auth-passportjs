const router = require('express').Router()
const User = require('../model/User')

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

module.exports = router