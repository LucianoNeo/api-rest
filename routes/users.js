const express = require('express')
const router = express.Router()

router.get('/',(req,res,next) =>{
    res.status(200).send({
        message: 'Using the GET on users route'
    })
})

router.post('/',(req,res,next) =>{
    res.status(201).send({
        message: 'Using the POST on users route'
    })
})


module.exports = router