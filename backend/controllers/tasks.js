import pool from '../utils/db.js'

export default {
    getTasks: (req, res) => {
        try {
            if (req.query.userid) {
                pool.query('SELECT * FROM tasks WHERE userid = $1', [req.query.userid], (error, results) => {
                    if (error) {
                        throw error
                    }
                    res.status(200).json(results.rows)
                })

            }
            else {
                pool.query('SELECT * FROM tasks', (error, results) => {
                    if (error) {
                        throw error
                    }
                    res.status(200).json(results.rows)
                })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    },
    createTask: (req, res) => {
        try {
            const { title, description, isComplete, userid } = req.body
            pool.query('INSERT INTO tasks (title, description, isComplete, userid) VALUES ($1, $2, $3, $4)', [title, description, isComplete, userid], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(201).send('Task added successfully')
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    },
    modifyTask: (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const { title, description, isComplete, userid } = req.body
            pool.query('UPDATE tasks SET title = $1, description = $2, isComplete = $3, userid = $4 WHERE id = $5', [title, description, isComplete, userid, id], (error, results) => {
                if (error) {
                    throw error
                }
                
                if (results.rowCount === 0) {
                    return res.status(404).send('Task not found'); 
                }

                res.status(200).send('Task modified successfully')
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    },
    deleteTask: (req, res) => {
        try {
            const id = parseInt(req.params.id)
            pool.query('DELETE FROM tasks WHERE id = $1', [id], (error, results) => {
                if (error) {
                    throw error
                }
                if (results.rowCount === 0) {
                    return res.status(404).send('Task not found'); 
                }
                
                res.status(200).send('Task deleted successfully')
            })
        }
        catch (error) {
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
    }
}
