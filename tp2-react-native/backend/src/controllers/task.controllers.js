import { TaskModel } from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    // Al simplificar, ahora traemos todas las tareas sin filtrar por usuario
    const tasks = await TaskModel.findAll();

    res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, is_completed } = req.body;
  try {
    const newTask = await TaskModel.create({
      title,
      description,
      is_completed,
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, is_completed } = req.body;
  try {
    const task = await TaskModel.findOne({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    await task.update({ title, description, is_completed });
    res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findOne({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    await task.destroy();
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
