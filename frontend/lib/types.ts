export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "INPROGRESS" | "UNDERREVIEW" | "FINISHED";
  priority: "LOW" | "MEDIUM" | "URGENT";
  deadline: Date;
  ownerId: string;
}

export type TaskStatus = "TODO" | "INPROGRESS" | "UNDERREVIEW" | "FINISHED";
