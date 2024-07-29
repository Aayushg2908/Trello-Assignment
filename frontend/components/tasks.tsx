"use client";

import { STATUS } from "@/lib/constants";
import {
  ClockIcon,
  EditIcon,
  EllipsisVertical,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Task, TaskStatus } from "@/lib/types";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useTask } from "@/hooks/use-task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface TasksTypeProps {
  TODO: Task[];
  INPROGRESS: Task[];
  UNDERREVIEW: Task[];
  FINISHED: Task[];
}

interface TasksProps {
  tasks: TasksTypeProps;
}

const Tasks = ({ tasks }: TasksProps) => {
  const [allTasks, setAllTasks] = useState<TasksTypeProps>(tasks);
  const { onOpen } = useTask();
  const router = useRouter();

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  const handleTaskDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleDragAndDrop = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type !== "Tasks") return;

    if (source.droppableId === destination.droppableId) {
      const tasksList = [...allTasks[source.droppableId as TaskStatus]];
      const [removed] = tasksList.splice(source.index, 1);
      tasksList.splice(destination.index, 0, removed);

      const updatedTasks = {
        ...allTasks,
        [source.droppableId]: tasksList,
      };

      updatedTasks[source.droppableId as TaskStatus].forEach(
        (task: any, index) => {
          task.order = index;
        }
      );

      setAllTasks(updatedTasks);

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/update-order`,
          {
            tasks: updatedTasks[source.droppableId as TaskStatus],
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    } else {
      const sourceTasksList = [...allTasks[source.droppableId as TaskStatus]];
      const destinationTasksList = [
        ...allTasks[destination.droppableId as TaskStatus],
      ];

      const [removed] = sourceTasksList.splice(source.index, 1);
      destinationTasksList.splice(destination.index, 0, removed);

      const updatedTasks = {
        ...allTasks,
        [source.droppableId]: sourceTasksList,
        [destination.droppableId]: destinationTasksList,
      };

      updatedTasks[source.droppableId as TaskStatus].forEach(
        (task: any, index) => {
          task.order = index;
          task.status = source.droppableId;
        }
      );

      updatedTasks[destination.droppableId as TaskStatus].forEach(
        (task: any, index) => {
          task.order = index;
          task.status = destination.droppableId;
        }
      );

      setAllTasks(updatedTasks);

      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/update-order`,
          {
            tasks: [
              ...updatedTasks[source.droppableId as TaskStatus],
              ...updatedTasks[destination.droppableId as TaskStatus],
            ],
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Something went wrong!");
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragAndDrop}>
      <div className="mt-4 bg-white p-4 rounded-lg grid grid-cols-4 gap-x-4">
        {STATUS.map((status) => (
          <div key={status.label} className="flex flex-col">
            <header className="w-full flex items-center justify-between">
              <span>{status.name}</span>
              <EllipsisVertical className="size-5" />
            </header>
            <Droppable droppableId={status.label} type="Tasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="mt-4 flex flex-col gap-y-3"
                >
                  {allTasks[status.label].map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <ol
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="relative h-fit flex flex-col gap-y-2 p-2 bg-stone-200 border rounded-lg"
                        >
                          <h3 className="text-base font-semibold">
                            {task.title}
                          </h3>
                          {task.description && (
                            <span className="text-sm">{task.description}</span>
                          )}
                          {task.priority && (
                            <Badge
                              className={cn(
                                "w-fit rounded-md",
                                task.priority === "URGENT" &&
                                  "bg-red-500 hover:bg-red-600",
                                task.priority === "MEDIUM" &&
                                  "bg-orange-500 hover:bg-orange-600",
                                task.priority === "LOW" &&
                                  "bg-green-500 hover:bg-green-600"
                              )}
                            >
                              {task.priority}
                            </Badge>
                          )}
                          {task.deadline && (
                            <div className="flex items-center gap-x-2">
                              <ClockIcon className="size-5" />{" "}
                              {/* @ts-ignore */}
                              {task.deadline.split("T")[0]}
                            </div>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger className="absolute top-2 right-2">
                              <EllipsisVertical className="size-5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() =>
                                  onOpen(
                                    "UPDATE",
                                    task.status,
                                    task._id,
                                    task.title,
                                    task.description,
                                    task.priority,
                                    task.deadline
                                  )
                                }
                                className="cursor-pointer flex items-center gap-x-1"
                              >
                                <EditIcon className="size-5" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleTaskDelete(task._id)}
                                className="cursor-pointer flex items-center gap-x-1 text-red-500 hover:!text-red-600"
                              >
                                <Trash2Icon className="size-5" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </ol>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Button
              onClick={() => onOpen("CREATE", status.label)}
              className="mt-4 w-full flex items-center justify-between rounded-lg"
            >
              <span>Add new</span>
              <PlusIcon className="size-5" />
            </Button>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Tasks;
