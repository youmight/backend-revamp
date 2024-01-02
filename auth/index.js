const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express();
const PORT = 3000;

const users = [] //will act as mock database to store the users

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
    if(users.some(user => user.email === email)){
        res.status(400).json({
            status: 'fail',
            message: 'User already exists'
        })
    }
    else {
        const user = {
            email,
            password: await bcrypt.hash(password, 12)
        }
        users.push(user);
        res.status(201).json({
            status: 'success',
            message: 'New user created'
        })
    }
})

app.get('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = users.find(user => user.email === email);
    if(!user){
        res.status(400).json({
            status: 'fail',
            message: 'User does not exist'
        })
    }
    else if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign(email, 'SECRET')   // secret should ideally be stored in a environment file
        res.status(201).json({
            staus: 'success',
            message: 'User logged in!',
            data: token
        })
    }else {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid password'
        })
    }
})

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const authToken = authHeader.split('Bearer  ')[1];
    if (!authHeader) {
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorized! authentication header not found',
        });
    }
    try {
        const user = jwt.verify(authToken, 'SECRET');
        req.user = user;
        next();
    } catch (error) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
        });
    }
}

app.get('/protected', authenticate, (req, res) => {
    res.send('Requested')
})

app.listen(PORT, () => {
    console.log('Server started at port', PORT);
})