import express from 'express'
import dotenv from 'dotenv'

import userRouter from './routes/users.js'
import taskRouter from './routes/tasks.js'
import verify from './middleware/verifyToken.js'
import pool from './utils/db.js'

dotenv.config()

const app = express()
const port = process.env.APP_PORT | 8080

app.use(express.json());

app.use('/auth', userRouter)
app.use('/tasks', verify, taskRouter)

app.get('/', (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id', (err, results) => {
        if (err) {
            throw err
        }
        res.status(200).json(results.rows)
    })
    // res.send('Hello, Node.js with Express!');
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
