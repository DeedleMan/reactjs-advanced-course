import { ITask } from "@/entities/task/model/types";
import { TaskCard } from "@/entities/task/ui/TaskCard";

import { FilterButton } from "@/shared/ui/FilterButton";

import { NoTasksPlug } from "./NoTasksPlug";
import styles from "./TaskList.module.css";
import { useTasks } from "../model/useTasks";

export const TaskList = () => {
  const { tasks, isLoading, setFilter, removeTask } = useTasks();

  const renderTask = (task: ITask) => (
    <TaskCard key={task.id} task={task} onRemove={removeTask} />
  );

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <FilterButton onChange={setFilter} />
      <div className={styles["tasklist-container"]}>
        {tasks?.length ? tasks.map(renderTask) : <NoTasksPlug />}
      </div>
    </>
  );
};
