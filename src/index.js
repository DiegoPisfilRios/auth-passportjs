const path = require('path');
const app = require('./app')
const User = require('./model/User')

app.listen(app.get('port'), () => {
    console.log(`Server on port: ${app.get('port')}.`)
})

// Database connect
require('./db').connect();

// Routes
app.use('/auth', require('./router/auth'))
app.use('/user', require('./router/user'))

// Views
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/login.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/register.html'));
})
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/users.html'));
})
app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})