import { useCallback, useMemo, useState } from "react";

import { ITask } from "@/entities/task/model/types";

import { TFilter, ETaskStatus } from "@/shared/consts";

interface IUseTasks {
  tasks: ITask[]; // отфильтрованные задачи
  filter: TFilter; // текущий фильтр
  setFilter: (f: TFilter) => void; // смена фильтра
  removeTask: (id: ITask["id"]) => void; // удаление задачи по ID
}

export const useTasks = (initialTasks: ITask[]): IUseTasks => {
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);
  const [filter, setFilter] = useState<TFilter>(ETaskStatus.ALL);

  const filteredTasks = useMemo(() => {
    if (filter === ETaskStatus.COMPLETED) {
      return tasks.filter((item) => Boolean(item.completed));
    }

    if (filter === ETaskStatus.INCOMPLETE) {
      return tasks.filter((item) => !item.completed);
    }

    return tasks;
  }, [filter, tasks]);

  const removeTask = useCallback(
    (id: ITask["id"]) =>
      setTasks((prev) => prev.filter((item) => item.id !== id)),
    [],
  );

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
  };
};
