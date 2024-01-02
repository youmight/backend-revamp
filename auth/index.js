const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const app = express();
const PORT = 3000;

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(PORT, () => {
    console.log('Server started at port', PORT);
})