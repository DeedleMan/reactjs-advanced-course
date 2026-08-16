import { createBrowserRouter, Navigate } from "react-router-dom";

import { PortalShowcase } from "@/pages/portal-showcase/ui/PortalShowcase";
import { RegistrationPage } from "@/pages/registration/ui/RegistrationPage";
import { SubscriptionPage } from "@/pages/subscription/ui/SubscriptionPage";
import { TaskPage } from "@/pages/tasks/ui/TaskPage";

import { AppRouter } from "@/features/authRouting/AppRouter";
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
        element: <Navigate to="/portal-showcase" replace />,
      },
      {
        path: "/tasks",
        element: <TaskPage />,
      },
      {
        path: "/portal-showcase",
        element: <PortalShowcase />,
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
      {
        path: "/*",
        element: <AppRouter />,
      },
    ],
  },
]);
