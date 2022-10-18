const express = require('express')

const cors = require('cors')

const morgan = require('morgan')

const app = express()

const bodyParser = require('body-parser')

const usersRoute = require('./routes/users')



app.use(cors())

app.use(morgan('dev')) // show the requests in log

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.use('/users', usersRoute)



app.use((req, res, next) => {
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            message: error.message
        }
    })
})

module.exports = app










