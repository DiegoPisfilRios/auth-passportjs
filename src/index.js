const path = require('path');
const app = require('./app')
const User = require('./model/User')

app.listen(app.get('port'), () => {
    console.log('ON SERVER >>' + app.get('port'))
})

require('./db').connect();

app.use('/auth', require('./router/auth'))

app.get('/user', (req, res) => {
    res.send({ user: req.user })
})

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
    User.create(req.body, function (err, user) {
        if (err) return res.redirect(path.join(__dirname + '/views/register.html'))
            
        res.redirect('/login')
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})