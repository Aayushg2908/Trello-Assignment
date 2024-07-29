"use client";

import { useEffect, useState } from "react";
import TaskSheet from "./task-sheet";

const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TaskSheet />
    </>
  );
};

export default SheetProvider;
