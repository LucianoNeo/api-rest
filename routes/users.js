const express = require('express')
const { pool } = require('../mysql')
const router = express.Router()
const mysql = require('../mysql').pool


router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM members',
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: result})
            }
        )
    })


})

router.post('/', (req, res, next) => {

    const user = {
        username: req.body.username,
        password: req.body.password,
        email: 'email',
        verified: 1,
        cidade: req.body.city,
    }
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO members (username,password,email,verified,cidade) VALUES(?,?,?,?,?)',
            [user.username, user.password, user.email, user.verified, user.cidade],
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }

                res.status(201).send({
                    message: 'New User Created:',
                    id: result.insertId,
                    addedUser: user
                })
            }
        )
    })


})

router.get('/:user_id', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM members WHERE id = ?;',
            [req.params.user_id],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                return res.status(200).send({response: result})
            }
        )
    })
})

router.patch('/', (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: 'email',
        verified: 1,
        cidade: req.body.city,
        id: req.body.user_id
    }
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE members 
            SET
                username=?,
                password=?,
                cidade=?
            WHERE id =?`,
            [user.username, user.password, user.cidade, user.id],
            (error, result, field) => {
                conn.release()

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }

                res.status(201).send({
                    message: 'User Modified:',
                    modifiedUser: user
                })
            }
        )
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        message: 'Using the DELETE on users route'
    })
})


module.exports = router