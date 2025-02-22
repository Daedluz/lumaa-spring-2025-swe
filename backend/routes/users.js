import loginController from '../controllers/users.js'
import express from 'express'

const router = express.Router()

router
    .post('/register', loginController.register)
    .post('/login', loginController.login)

export default router

