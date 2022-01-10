const router = require('express').Router()
const User = require('../model/User')

function auth(req, res, done) {
    if (!req.user) return res.status(401).json({ authentication: false })
    done()
}

router.route('/')
    .get(auth, (req, res) => {
        res.json({ user: req.user })
    });

router.route('/:id')
    .delete(auth, async (req, res) => {
        await User.findOneAndDelete({ _id: req.params.id })
        req.session.destroy()
        res.redirect('/')
    })

module.exports = router