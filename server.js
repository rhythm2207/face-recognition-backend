const express = require('express')
const app = express();
const cors = require("cors")
const knex = require('knex');
const bcrypt = require('bcryptjs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const entryCount = require('./controllers/entryCount');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'rhythm',
        database: 'face-recognition-db'
    }
});

app.use(express.json())
app.use(cors())
app.get('/')

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => profile.profile(req, res, db))

app.put('/image', (req, res) => entryCount.entryCount(req, res, db))

app.post('/apicall', (req, res) => entryCount.apicall(req, res))

app.listen(process.env.PORT || 3000)