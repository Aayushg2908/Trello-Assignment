import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  ownerId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  order: number;
  status: "TODO" | "INPROGRESS" | "UNDERREVIEW" | "FINISHED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  deadline?: Date;
}

const TaskSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, default: null },
  order: { type: Number, required: true, default: 0 },
  status: {
    type: String,
    required: true,
    enum: ["TODO", "INPROGRESS", "UNDERREVIEW", "FINISHED"],
  },
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "URGENT"],
    default: null,
  },
  deadline: { type: Date, default: null },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
