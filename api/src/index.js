require('dotenv').config()
const express = require('express')
var cors = require('cors')
const app = express()

const { chat } = require('./ia')

app.use(cors({
    origin: '*'
}))

app.get('/product-owner', async (req, res) => {
    const { message } = req.query
    const response = await chat(message)
    res.json(response)
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})