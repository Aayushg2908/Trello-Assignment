"use client";

import { CirclePlus } from "lucide-react";
import { Button } from "./ui/button";
import { useTask } from "@/hooks/use-task";

const CreateNewButton = ({
  className,
  size,
}: {
  className?: string;
  size: "sm" | "default";
}) => {
  const { onOpen } = useTask();

  return (
    <Button
      onClick={() => onOpen("CREATE")}
      variant="gradient"
      className={className}
      size={size}
    >
      Create new <CirclePlus className="size-5 ml-2" size="sm" />
    </Button>
  );
};

export default CreateNewButton;
