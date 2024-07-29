export const authRoutes = ["/login", "/register"];
import {
  CalendarIcon,
  ChartNoAxesCombined,
  FilterIcon,
  Handshake,
  House,
  Settings,
  ShareIcon,
  SparklesIcon,
  SquareKanban,
} from "lucide-react";

export const DEFAULT_REDIRECT = "/";

export const tabs = [
  {
    name: "Home",
    icon: House,
  },
  {
    name: "Boards",
    icon: SquareKanban,
  },
  {
    name: "Settings",
    icon: Settings,
  },
  {
    name: "Teams",
    icon: Handshake,
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
  },
];

export const options = [
  {
    name: "Calendar View",
    icon: CalendarIcon,
  },
  {
    name: "Automation",
    icon: SparklesIcon,
  },
  {
    name: "Filter",
    icon: FilterIcon,
  },
  {
    name: "Share",
    icon: ShareIcon,
  },
];

export const STATUS: {
  name: string;
  label: "TODO" | "INPROGRESS" | "UNDERREVIEW" | "FINISHED";
}[] = [
  {
    name: "To do",
    label: "TODO",
  },
  {
    name: "In progress",
    label: "INPROGRESS",
  },
  {
    name: "Under review",
    label: "UNDERREVIEW",
  },
  {
    name: "Finished",
    label: "FINISHED",
  },
];

export const PRIORITY: {
  name: string;
  label: "LOW" | "MEDIUM" | "URGENT";
}[] = [
  {
    name: "Low",
    label: "LOW",
  },
  {
    name: "Medium",
    label: "MEDIUM",
  },
  {
    name: "Urgent",
    label: "URGENT",
  },
];
