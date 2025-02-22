import express from 'express'
import taskController from '../controllers/tasks.js'

const router = express.Router()

router
    .get('/', taskController.getTasks)
    .post('/', taskController.createTask)
    .put('/:id', taskController.modifyTask)
    .delete('/:id', taskController.deleteTask)

export default router
