const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const app = express()
const router = require('./routes/index')

require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api', router)

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
