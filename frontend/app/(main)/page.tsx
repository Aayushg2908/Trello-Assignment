import CreateNewButton from "@/components/create-new-button";
import Tasks from "@/components/tasks";
import { Input } from "@/components/ui/input";
import { options } from "@/lib/constants";
import { getTasks } from "@/lib/tasks";
import { Task, User } from "@/lib/types";
import { getUser } from "@/lib/user";
import { CircleHelp, SearchIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

const MainPage = async () => {
  const user: User = await getUser();
  if (!user || !user._id) {
    return redirect("/login");
  }

  const tasks: Task[] = await getTasks();

  const todoTasks = tasks.filter((task) => task.status === "TODO");
  const inProgressTasks = tasks.filter((task) => task.status === "INPROGRESS");
  const underReviewTasks = tasks.filter(
    (task) => task.status === "UNDERREVIEW"
  );
  const finishedTasks = tasks.filter((task) => task.status === "FINISHED");

  const finalTasks = {
    TODO: todoTasks,
    INPROGRESS: inProgressTasks,
    UNDERREVIEW: underReviewTasks,
    FINISHED: finishedTasks,
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-2 mt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Good morning, {user.name}</h1>
        <span className="text-sm font-semibold flex items-center gap-x-1 mr-2">
          Help and feedback <CircleHelp className="size-4" />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-x-2 mt-2">
        <div className="flex items-center gap-x-2 bg-white rounded-lg h-[100px] p-2">
          <Image
            src="/image1.png"
            alt="image1"
            width={150}
            height={150}
            className="size-16"
          />
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm font-bold">Introducing tags</h2>
            <span className="text-xs">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-2 bg-white rounded-lg h-[100px] p-2">
          <Image
            src="/image2.png"
            alt="image2"
            width={150}
            height={150}
            className="size-16"
          />
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm font-bold">Introducing tags</h2>
            <span className="text-xs">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-2 bg-white rounded-lg h-[100px] p-2">
          <Image
            src="/image3.png"
            alt="image3"
            width={150}
            height={150}
            className="size-16"
          />
          <div className="flex flex-col gap-y-1">
            <h2 className="text-sm font-bold">Introducing tags</h2>
            <span className="text-xs">
              Easily categorize and find your notes by adding tags. Keep your
              workspace clutter-free and efficient.
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="relative">
          <Input placeholder="Search..." className="w-fit" />
          <SearchIcon className="absolute top-1/2 right-2 transform -translate-y-1/2 size-4 opacity-70" />
        </div>
        <div className="flex items-center gap-x-8">
          {options.map((option) => (
            <div key={option.name} className="flex items-center gap-x-2">
              <option.icon className="size-4" />
              <span className="text-sm">{option.name}</span>
            </div>
          ))}
          <CreateNewButton size="sm" />
        </div>
      </div>
      <Tasks tasks={finalTasks} />
    </div>
  );
};

export default MainPage;
