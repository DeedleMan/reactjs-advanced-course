import { createBrowserRouter, Navigate } from "react-router-dom";

import { TaskPage } from "@/pages/tasks/ui/TaskPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/tasks" replace />,
  },
  {
    path: "/tasks",
    element: <TaskPage />,
  },
]);
