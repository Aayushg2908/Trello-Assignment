import { Request, Response } from "express";
import Task from "../models/tasks";

export const createTask = async (req: Request, res: Response) => {
  try {
    const values = req.body;
    if (!values.title || !values.status) {
      return res
        .status(400)
        .json({ message: "Title and Status are required!" });
    }

    const lastTask = await Task.findOne({
      status: values.status,
      // @ts-ignore
      ownerId: req.user.id,
    }).sort({ order: -1 });
    const newOrder = lastTask ? lastTask.order + 1 : 0;

    await Task.create({
      ...values,
      order: newOrder,
      // @ts-ignore
      ownerId: req.user.id,
    });

    return res.status(201).json({ message: "Task created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const tasks = await Task.find({ ownerId: req.user.id }).sort({ order: 1 });
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const values = req.body;
    // @ts-ignore
    const task = await Task.findOne({ _id: id, ownerId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    await Task.updateOne(
      {
        _id: id,
        // @ts-ignore
        ownerId: req.user.id,
      },
      { ...values }
    );

    return res.status(200).json({ message: "Task updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    const task = await Task.findOne({ _id: id, ownerId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }

    await Task.deleteOne({
      _id: id,
      // @ts-ignore
      ownerId: req.user.id,
    });

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateTaskOrder = async (req: Request, res: Response) => {
  try {
    const { tasks } = req.body;

    const session = await Task.startSession();
    session.startTransaction();

    try {
      for (const task of tasks) {
        await Task.updateOne(
          // @ts-ignore
          { _id: task._id, ownerId: req.user.id },
          { order: task.order, status: task.status }
        );
      }

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({ message: "Tasks updated successfully!" });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({ message: "Something went wrong!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
