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

router.get('/:user_id',(req,res,next) =>{
    const id = req.params.user_id

    if(id === 'special'){
        res.status(200).send({
            message: 'Special ID discovered',
            id:id
        })
    }else{
        res.status(200).send({
            message: 'Usual ID discovered',
            id:id
        })
    }
})

router.patch('/',(req,res,next) =>{
    res.status(201).send({
        message: 'Using the PATCH on users route'
    })
})

router.delete('/',(req,res,next) =>{
    res.status(201).send({
        message: 'Using the DELETE on users route'
    })
})


module.exports = router