import { useRef, useOptimistic, useState } from "react";
import { useFormStatus } from "react-dom";

import styles from "./TodoListOptimistic.module.css";

type TTodo = {
  id: number;
  title: string;
};

const initialTodos: TTodo[] = [
  { id: 1, title: "Task 1" },
  { id: 2, title: "Task 2" },
];

let nextId = 3;

const saveTodo = async (): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, 1000));

const AddTodoButton = () => {
  const { pending } = useFormStatus();

  if (pending) return "Adding...";
  return "Add";
};

const TodoItem = ({ title }: { title: string }) => (
  <li className={styles["todo-item"]}>{title}</li>
);

export const TodoListOptimistic = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [todos, setTodos] = useState<TTodo[]>(initialTodos);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic<TTodo[], TTodo>(
    todos,
    (state, newTodo) => [...state, newTodo],
  );

  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    if (!title.trim()) return;

    const newTodo: TTodo = { id: nextId++, title: title.trim() };

    // optimistic update
    addOptimisticTodo(newTodo);
    formRef.current?.reset();

    // "реальный" запрос на сервер
    await saveTodo();

    // обновление стейта после отработки запроса
    setTodos((prev) => [...prev, newTodo]);
  };

  return (
    <div className={styles["container"]}>
      <br />
      <br />
      <h2>TodoListOptimistic</h2>
      <form
        ref={formRef}
        action={handleSubmit}
        className={styles["form-container"]}
      >
        <input
          name="title"
          placeholder="New task"
          className={styles["form-input"]}
        />
        <button type="submit" className={styles["form-button"]}>
          <AddTodoButton />
        </button>
      </form>
      <ul className={styles["todo-list"]}>
        {optimisticTodos.map((todo) => (
          <TodoItem key={todo.id} title={todo.title} />
        ))}
      </ul>
    </div>
  );
};
