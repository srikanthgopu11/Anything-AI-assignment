const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = req.user.role === 'admin' 
            ? await Task.findAll() 
            : await Task.findAll({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description, userId: req.user.id });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (req.user.role === 'admin' || task.userId === req.user.id) {
            await task.destroy();
            return res.json({ message: "Task Deleted" });
        }
        res.status(403).json({ message: "Unauthorized" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};