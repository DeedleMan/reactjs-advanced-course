import { FC, memo } from "react";

import styles from "./TaskCard.module.css";
import { getTaskStatusText } from "../lib";
import { ITask } from "../model/types";

interface ITaskCardProps {
  task: ITask;
  onRemove: (id: ITask["id"]) => void;
}

export const TaskCard: FC<ITaskCardProps> = memo(
  ({ task, onRemove }) => {
    if (!task?.id) {
      return null;
    }

    const handleRemove = () => onRemove(task.id);

    return (
      <div className={styles["taskcard-container"]}>
        <div>{task?.title}</div>
        <div>{task?.completed}</div>
        <div>{getTaskStatusText(task.completed)}</div>
        <div
          className={styles["taskcard-remove-button"]}
          onClick={handleRemove}
        >
          Удалить
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.task.id === nextProps.task.id,
);
