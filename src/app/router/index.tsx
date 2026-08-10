import { createBrowserRouter, Navigate } from "react-router-dom";

import { RegistrationPage } from "@/pages/registration/ui/RegistrationPage";
import { SubscriptionPage } from "@/pages/subscription/ui/SubscriptionPage";
import { TaskPage } from "@/pages/tasks/ui/TaskPage";

import {
  ClickTimer,
  DebouncedLogger,
  FocusTracker,
  PreviousInput,
  WebSocketLogger,
} from "@/features/refExamples";

import { RootLayout } from "./ui/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/tasks" replace />,
      },
      {
        path: "/tasks",
        element: <TaskPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/subscribe",
        element: <SubscriptionPage />,
      },
      {
        path: "/clicktimer",
        element: <ClickTimer />,
      },
      {
        path: "/previousinput",
        element: <PreviousInput />,
      },
      {
        path: "/focustracker",
        element: <FocusTracker />,
      },
      {
        path: "/debouncedlogger",
        element: <DebouncedLogger />,
      },
      {
        path: "/websocketlogger",
        element: <WebSocketLogger />,
      },
    ],
  },
]);
