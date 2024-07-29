"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTask } from "@/hooks/use-task";
import { Sheet, SheetContent } from "./ui/sheet";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";
import {
  CalendarIcon,
  CheckIcon,
  LoaderIcon,
  Pencil,
  TriangleAlert,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { PRIORITY, STATUS } from "@/lib/constants";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const TaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["TODO", "INPROGRESS", "UNDERREVIEW", "FINISHED"]).nullable(),
  priority: z.string().optional().nullable(),
  deadline: z.date().nullable(),
});

const TaskSheet = () => {
  const {
    isOpen,
    onClose,
    type,
    id,
    title,
    description,
    status,
    priority,
    deadline,
  } = useTask();
  const calendarRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: title ? title : "",
      description: description ? description : "",
      status: status ? status : null,
      priority: priority ? priority : null,
      deadline: deadline ? new Date(deadline) : null,
    },
  });

  useEffect(() => {
    form.reset({
      title: title ? title : "",
      description: description ? description : "",
      status: status ? status : null,
      priority: priority ? priority : null,
      deadline: deadline ? new Date(deadline) : null,
    });
  }, [title, description, status, priority, deadline, form]);

  async function onSubmit(values: z.infer<typeof TaskSchema>) {
    try {
      setIsLoading(true);
      if (type === "CREATE") {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/create`,
          values,
          {
            withCredentials: true,
          }
        );
        if (response.status === 201) {
          onClose();
          toast.success("Task created successfully");
        }
      } else if (type === "UPDATE") {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/task/update/${id}`,
          values,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          onClose();
          toast.success("Task updated successfully");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        toast.error(error.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <Form {...form}>
          <form
            className="mt-8 space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Title"
                      className="border-0 text-5xl focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-8">
                      <div className="flex items-center gap-x-4">
                        <LoaderIcon className="size-5" />
                        <span>Status</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger disabled={isLoading}>
                          {field.value ? field.value : "Not Selected"}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {STATUS.map((status) => (
                            <DropdownMenuItem
                              key={status.label}
                              className="cursor-pointer flex items-center justify-between"
                              onSelect={() => field.onChange(status.label)}
                            >
                              {status.name}
                              {field.value === status.label && (
                                <CheckIcon className="size-5 text-green-500" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-8">
                      <div className="flex items-center gap-x-4">
                        <TriangleAlert className="size-5" />
                        <span>Priority</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger disabled={isLoading}>
                          {field.value ? field.value : "Not Selected"}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {PRIORITY.map((priority) => (
                            <DropdownMenuItem
                              key={priority.label}
                              className="cursor-pointer flex items-center justify-between"
                              onSelect={() => field.onChange(priority.label)}
                            >
                              {priority.name}
                              {field.value === priority.label && (
                                <CheckIcon className="size-5 text-green-500" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-8">
                      <div className="flex items-center gap-x-4">
                        <Pencil className="size-5" />
                        <span>Description</span>
                      </div>
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Description"
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-x-8">
                      <div className="flex items-center gap-x-4">
                        <CalendarIcon className="size-5" />
                        <span>Deadline</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger disabled={isLoading}>
                          {field.value
                            ? field.value.toLocaleDateString()
                            : "Not Selected"}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent ref={calendarRef}>
                          <Calendar
                            onDayClick={(date: any) => {
                              const newDate = new Date(date);
                              field.onChange(newDate);
                              // @ts-ignore
                              calendarRef.current.style.display = "none";
                            }}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="w-full">
              {type === "CREATE" ? "Create" : "Update"} Task
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default TaskSheet;
