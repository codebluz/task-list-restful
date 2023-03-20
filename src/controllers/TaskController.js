import mongoose from 'mongoose';
import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  async index(req, res) {
    const tasks = await Task.find({ user: req.userId });
    return res.json(tasks);
  }

  async store(req, res) {
    const schema = Yup.object({
      task: Yup.string().required(),
      check: Yup.boolean().required().default(false),
      user: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Body is invalid' });
    }

    const { task } = req.body;

    const newTask = await Task.create({
      task,
      check: false,
      user: req.userId,
    });

    return res.json(newTask);
  }

  async update(req, res) {
    const schema = Yup.object({
      check: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Body is invalid' });
    }

    const { task_id } = req.params;
    const { check } = req.body;
    let task;

    try {
      task = await Task.findById(task_id);
    } catch (error) {
      return res.status(400).json({ error: 'Task not exists' });
    }

    if (task === null) {
      return res.status(400).json({ error: 'Task not exists' });
    }

    const id = new mongoose.Types.ObjectId(task.user).toString();

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await task.updateOne({ check });
    return res.json({ msg: 'Task was updated with success' });
  }

  async destroy(req, res) {
    const { task_id } = req.params;
    let task;

    try {
      task = await Task.findById(task_id);
    } catch (error) {
      return res.status(400).json({ error: 'Task not exists' });
    }

    const id = new mongoose.Types.ObjectId(task.user).toString();

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await Task.deleteOne({ _id: task_id });
    res.json({ msg: 'Task was deleted witch success' });
  }
}

export default new TaskController();
