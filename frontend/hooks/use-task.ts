import { create } from "zustand";

type TaskAction = "CREATE" | "UPDATE";

interface Task {
  type: TaskAction;
  id: string;
  title: string;
  description: string;
  status: "TODO" | "INPROGRESS" | "UNDERREVIEW" | "FINISHED" | null;
  priority: "LOW" | "MEDIUM" | "URGENT" | null;
  deadline: Date | null;
  isOpen: boolean;
  onOpen: (
    type: TaskAction,
    status?: "TODO" | "INPROGRESS" | "UNDERREVIEW" | "FINISHED",
    id?: string,
    title?: string,
    description?: string,
    priority?: "LOW" | "MEDIUM" | "URGENT",
    deadline?: Date
  ) => void;
  onClose: () => void;
}

export const useTask = create<Task>((set) => ({
  type: "CREATE",
  id: "",
  title: "",
  description: "",
  status: null,
  priority: null,
  deadline: null,
  isOpen: false,
  onOpen: (type, status, id, title, description, priority, deadline) => {
    set({
      type,
      id: id,
      title: title,
      description: description,
      status: status,
      priority: priority,
      deadline: deadline,
      isOpen: true,
    });
  },
  onClose: () =>
    set({
      isOpen: false,
      id: "",
      title: "",
      description: "",
      status: null,
      priority: null,
      deadline: null,
    }),
}));
