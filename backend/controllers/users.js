import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import pool from '../utils/db.js'

dotenv.config()

export default {
    register: async (req, res) => {
        const { username, password } = req.body
        try {
            const hashed_password = await bcrypt.hash(password, 10)

            const result = await pool.query(
                'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
                [username, hashed_password]
            )

            const newUser = result.rows[0]
            res.status(201).json({ id: newUser.id, username: newUser.username })
        }
        catch(err) {
            console.log(err)
            res.status(500).send("Internal server error")
        }

    },
    login: async (req, res) => {
        const { username, password } = req.body
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE username = $1',
                [username]
            )

            const user = result.rows[0]

            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                res.status(200).json({ token })
            }
            else {
                res.status(401).send("Invalid credentials")
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).send("Internal server error")
        }
    }
}
