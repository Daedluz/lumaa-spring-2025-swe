import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const func = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send('Access denied')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).send('Invalid token')
        }
        req.user = user
    })
    next()
}

export default func
