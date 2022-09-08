const express = require('express')
const { pool } = require('../mysql')
const router = express.Router()
const mysql = require('../mysql').pool


router.get('/',(req,res,next) =>{
    res.status(200).send({
        message: 'Using the GET on users route'
    })
})

router.post('/',(req,res,next) =>{

    const user = {
        username: req.body.username,
        password: req.body.password,
        email: 'email',
        verified: 1,
        city: req.body.city,
     }
mysql.getConnection((error, conn)=>{
    conn.query(
        'INSERT INTO users (username,password,email,verified,city) VALUES(?,?,?,?,?)',
        [user.username,user.password,user.email,user.verified,user.city]
    )
})

    res.status(201).send({
        message: 'Create a new user',
        addedUser: user
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