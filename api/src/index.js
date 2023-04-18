require('dotenv').config()
const express = require('express')
const app = express()

const { chat } = require('./ia')

app.get('/product-owner', async (req, res) => {
    const { message } = req.query
    const response = await chat(message)
    res.send(response)
})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})