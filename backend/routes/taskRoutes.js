const express = require('express')
const taskController = require('../controllers/taskController')
const { auth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/',auth, taskController.getTasks)
router.post('/', auth, taskController.createTask)
router.put('/:id', auth, taskController.updateTask)
router.put('/:id/toggle-completion', taskController.completeTask);
router.delete('/:id', auth, taskController.delteteTask)

module.exports = router
