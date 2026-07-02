import { FC } from "react";

import { ITask } from "@/entities/task/model/types";
import { TaskCard } from "@/entities/task/ui/TaskCard";

import { FilterButton } from "@/shared/ui/FilterButton";

import { NoTasksPlug } from "./NoTasksPlug";
import styles from "./TaskList.module.css";
import { useTasks } from "../model/useTasks";

interface ITaskList {
  initialTasks: ITask[];
}

export const TaskList: FC<ITaskList> = ({ initialTasks }) => {
  const { tasks, setFilter, removeTask } = useTasks(initialTasks);

  const renderTask = (task: ITask) => (
    <TaskCard key={task.id} task={task} onRemove={removeTask} />
  );

  return (
    <>
      <FilterButton onChange={setFilter} />
      <div className={styles["tasklist-container"]}>
        {tasks?.length ? tasks.map(renderTask) : <NoTasksPlug />}
      </div>
    </>
  );
};
