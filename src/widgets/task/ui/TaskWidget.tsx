import { TaskList } from "@/features/taskList/ui/TaskList";

import { ITask } from "@/entities/task/model/types";

const mockedTasks = [
  { id: "1", title: "test task 1", completed: false },
  { id: "2", title: "test task 2", completed: false },
  { id: "3", title: "test task 3", completed: true },
  { id: "4", title: "test task 4", completed: true },
  { id: "5", title: "test task 5", completed: false },
] as ITask[];

export const TaskWidget = () => <TaskList initialTasks={mockedTasks} />;
