import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useGetTasksQuery } from "@/entities/task/api/tasksApi";
import { ITask } from "@/entities/task/model/types";

import { TFilter, ETaskStatus } from "@/shared/consts";

interface IUseTasks {
  tasks: ITask[]; // отфильтрованные задачи
  filter: TFilter; // текущий фильтр
  isLoading: boolean;
  setFilter: (f: TFilter) => void; // смена фильтра
  removeTask: (id: ITask["id"]) => void; // удаление задачи по ID
}

export const useTasks = (): IUseTasks => {
  const { data: remoteTasks, isLoading } = useGetTasksQuery();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<TFilter>(ETaskStatus.ALL);

  // Реф для отслеживания того, были ли данные уже скопированы
  const isInitialized = useRef(false);

  useEffect(() => {
    if (remoteTasks && remoteTasks?.length !== 0 && !isInitialized.current) {
      setTasks(remoteTasks);
      isInitialized.current = true;
    }
  }, [remoteTasks]);

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
    isLoading,
    filter,
    setFilter,
    removeTask,
  };
};
