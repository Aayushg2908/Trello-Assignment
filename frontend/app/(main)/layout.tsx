import SheetProvider from "@/components/sheet-provider";
import Sidebar from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User } from "@/lib/types";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user: User = await getUser();
  if (!user || !user._id) {
    return redirect("/login");
  }

  return (
    <div className="w-full h-full flex">
      <SheetProvider />
      <Sidebar user={user} />
      <ScrollArea className="w-full h-full py-2 px-4 bg-stone-100">
        {children}
      </ScrollArea>
    </div>
  );
};

export default MainLayout;
