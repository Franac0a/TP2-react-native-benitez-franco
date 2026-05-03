import { TaskModel } from "../models/task.model.js";

const validateTaskPayload = ({ title, description, is_completed }) => {
  if (!title || typeof title !== "string" || title.trim() === "") {
    return "El título es obligatorio";
  }
  if (description !== undefined && typeof description !== "string") {
    return "La descripción debe ser un texto";
  }
  if (is_completed !== undefined && typeof is_completed !== "boolean") {
    return "El valor de 'is_completed' debe ser booleano";
  }
  return null;
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await TaskModel.findOne({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createTask = async (req, res) => {
  const { title, description, is_completed } = req.body;
  const validationError = validateTaskPayload({
    title,
    description,
    is_completed,
  });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const newTask = await TaskModel.create({
      title: title.trim(),
      description: description || null,
      is_completed: is_completed ?? false,
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
  const validationError = validateTaskPayload({
    title,
    description,
    is_completed,
  });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const task = await TaskModel.findOne({
      where: { id },
    });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    await task.update({
      title: title.trim(),
      description: description || null,
      is_completed: is_completed ?? false,
    });
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
