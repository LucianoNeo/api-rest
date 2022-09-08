const express = require('express')

const app = express()

const usersRoute = require('./routes/users')

app.use('/users', usersRoute)


module.exports= app