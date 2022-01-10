const path = require('path');
const app = require('./app')
const User = require('./model/User')

const { EncodePassword } = require('./auth/Password')

app.listen(app.get('port'), () => {
    console.log('ON SERVER >>' + app.get('port'))
})

require('./db').connect();

app.use('/auth', require('./router/auth'))
app.use('/user', require('./router/user'))

// app.get('/user', (req, res) => {
//     res.send({ user: req.user })
// })

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/login.html'));
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/register.html'));
})

app.post('/register', async (req, res) => {
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

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/users.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})