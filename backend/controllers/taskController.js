const Task = require('../models/taskModel')

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id})
       return res.status(200).json(tasks)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description, user: req.user.id });
        await newTask.save();
        return res.status(201).json({
            task: {
                _id: newTask._id,
                title: newTask.title,
                description: newTask.description,
                completed: newTask.completed,
                user: newTask.user,
                createdAt: newTask.createdAt,
                updatedAt: newTask.updatedAt,
            }
        }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const completeTask = toggleTaskCompletion = async (req, res) => {
    const { id } = req.params; 
    const { completed } = req.body; 

    try {
        
        const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task status updated successfully', task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update task status' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        
        if(!task) return res.status(400).json({message: "task not found"})
        if(task.user.toString() !== req.user.id) return res.status(401).json({message: "Unauthorized user"})
        task.title = req.body.title || task.title
        task.description = req.body.description || task.description
        task.completed = req.body.completed !== undefined ? req.body.completed : task.completed
        await task.save()
        req.io.emit('task-updated', task)
        return res.status(200).json(task)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}

const delteteTask = async(req, res) => {
    try {
        const id = req.params.id
        await Task.deleteOne({_id:id})
        res.status(200).json({message:"Task deleted successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"})
    }
}
module.exports = {
    getTasks,
    createTask,
    updateTask,
    delteteTask,
    completeTask
}