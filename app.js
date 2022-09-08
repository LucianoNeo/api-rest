const express = require('express')

const morgan = require('morgan')

const app = express()

const usersRoute = require('./routes/users')


app.use(morgan('dev')) // faz o log das requests



app.use('/users', usersRoute)


app.use((req,res,next)=>{
    const error = new Error('Route not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    return res.send({
        error:{
            message: error.message
        }
    })
})

module.exports= app










