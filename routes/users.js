const express = require('express')
const { pool } = require('../mysql')
const router = express.Router()
const mysql = require('../mysql').pool
const Password = require('node-php-password');

router.get('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM members',
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantity: result.length,
                    users: result.map(user => {
                        return {
                            id: user.id,
                            username: user.username,
                            cidade: user.cidade,
                            password: user.password,
                            request: {
                                type: 'GET',
                                description: 'Return All Users',
                                url: `http://localhost:3000/users/${user.id}`,
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    })
})

router.post('/', (req, res, next) => {

    const user = {
        username: req.body.username,
        password: Password.hash(req.body.password),
        email: 'email',
        verified: 1,
        cidade: req.body.cidade,
    }
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO members (username,password,email,verified,cidade) VALUES(?,?,?,?,?)',
            [user.username, user.password, user.email, user.verified, user.cidade],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
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

                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'ID Not found'
                    })
                }

                const response = {

                    user: {
                        id: result[0].user_id,
                        username: result[0].username,
                        password: result[0].password,
                        cidade: result[0].cidade,
                        request: {
                            type: 'GET',
                            description: 'Return a User',
                            url: `http://localhost:3000/users/`,
                        }

                    }
                }
                return res.status(200).send({ response })
            }
        )
    })
})

router.patch('/', (req, res, next) => {
    const user = {
        username: req.body.username,
        id: req.body.id
    }
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE members SET username=? WHERE id=?`,
            [user.username, user.id],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) 
                conn.release()
            }

                res.status(202).send({
                    message: 'User Modified:',
                    modifiedUser: user
                })
            }
        )
    })
})

router.delete('/', (req, res, next) => {
    const user = {
        id: req.body.user_id
    }

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE from members WHERE id=?', [user.id],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    message: 'User Deleted:',
                    deletedUser: user
                })
            }
        )
    })
})


module.exports = router