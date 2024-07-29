"use client";

import { ArrowBigRight, ArrowDownToLine, BellIcon, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { tabs } from "@/lib/constants";
import { toast } from "sonner";
import axios from "axios";
import CreateNewButton from "./create-new-button";
import { useRouter } from "next/navigation";

const Sidebar = ({
  user,
}: {
  user: {
    _id: string;
    name: string;
    email: string;
  };
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <aside className="w-[250px] h-full border-r flex flex-col p-4">
      <h1 className="font-bold text-lg">{user.name}</h1>
      <p className="text-base">{user.email}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-x-2 opacity-70">
          <BellIcon className="size-5" />
          <Loader className="size-5" />
          <ArrowBigRight className="size-5" />
        </div>
        <Button onClick={handleLogout} variant="secondary" size="sm">
          Logout
        </Button>
      </div>
      <div className="mt-4 flex flex-col flex-grow gap-y-1">
        {tabs.map((tab) => (
          <div
            key={tab.name}
            className={`flex items-center gap-x-2 rounded-lg py-2 px-1 ${
              tab.name === "Home" && "bg-stone-200 rounded-lg"
            }`}
          >
            <tab.icon className="size-5 opacity-70" />
            <span>{tab.name}</span>
          </div>
        ))}
        <CreateNewButton className="mt-3" size="default" />
      </div>
      <div className="flex gap-x-2 items-center bg-stone-200 h-[50px] p-2 rounded-lg">
        <ArrowDownToLine className="size-5" />
        <div className="flex flex-col">
          <span className="text-sm font-bold">Download the app</span>
          <span className="text-xs">Get the full experience</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
