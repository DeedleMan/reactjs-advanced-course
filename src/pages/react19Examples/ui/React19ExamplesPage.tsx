import { ActionStateWithReducer } from "@/features/react19Examples/ActionStateWithReducer";
import { FormWithAsyncSave } from "@/features/react19Examples/FormWithAsyncSave";
import { TodoListOptimistic } from "@/features/react19Examples/TodoListOptimistic";

export const React19ExamplesPage = () => (
  <div>
    <h1>React 19 Examples</h1>
    <FormWithAsyncSave />
    <ActionStateWithReducer />
    <TodoListOptimistic />
  </div>
);
