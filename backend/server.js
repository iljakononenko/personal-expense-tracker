const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const app = express()
const router = require('./routes/index')
const UserSchema = require("./models/User");

require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/api', router)

const server = () => {
    db().then(async () => {
        const user = await UserSchema.find()
        if (user.length == 0) {
            const new_user = UserSchema()

            await new_user.save();

            console.log('created user')
        } else {
            console.log('user exists')
        }
    })
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
