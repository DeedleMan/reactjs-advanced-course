import {
  useCallback,
  useEffect,
  useRef,
  useActionState,
  SyntheticEvent,
} from "react";
import { useFormStatus } from "react-dom";

import styles from "./ActionStateWithReducer.module.css";

type TFormState =
  | { phase: "idle"; name: string; email: string }
  | { phase: "dirty"; name: string; email: string }
  | { phase: "submitting"; name: string; email: string }
  | { phase: "success"; name: string; email: string };

const initialState: TFormState = {
  phase: "idle",
  name: "",
  email: "",
};

type TAction =
  | { type: "change"; field: "name" | "email"; value: string }
  | { type: "submit"; name: string; email: string }
  | { type: "reset" };

const formReducer = (state: TFormState, action: TAction): TFormState => {
  switch (action.type) {
    case "change":
      return { ...state, phase: "dirty", [action.field]: action.value };

    case "submit":
      return {
        ...state,
        phase: "submitting",
        name: action.name,
        email: action.email,
      };

    case "reset":
      return initialState;

    default:
      return state;
  }
};

const submitAction = async (
  prevState: TFormState,
  action: TAction
): Promise<TFormState> => {
  if (action.type === "reset") return initialState;

  if (action.type === "change") {
    return formReducer(prevState, action);
  }

  if (action.type === "submit") {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { phase: "success", name: action.name, email: action.email };
  }

  return prevState;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  if (pending) return "Saving";
  return "Сохранить";
};

const StatusRow = ({ phase }: { phase: TFormState["phase"] }) => {
  let text: string;

  switch (phase) {
    case "submitting":
      text = "Saving...";
      break;
    case "success":
      text = "Success";
      break;
    case "dirty":
      text = "Idle";
      break;
    default:
      text = "Idle";
      break;
  }

  return <div className={styles["form-status"]}>{text}</div>;
};

export const ActionStateWithReducer = () => {
  const [state, dispatch, pending] = useActionState<TFormState, TAction>(
    submitAction,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.phase === "success") {
      const timer = setTimeout(() => {
        formRef.current?.reset();
        dispatch({ type: "reset" });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [state.phase, dispatch]);

  const handleOnChange = useCallback(
    (field: "name" | "email", value: string) => {
      dispatch({ type: "change", field, value });
    },
    [dispatch]
  );

  const handleSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      dispatch({
        type: "submit",
        name: formData.get("name") as string,
        email: formData.get("email") as string,
      });
    },
    [dispatch]
  );

  return (
    <div className={styles["container"]}>
      <br />
      <br />
      <h2>ActionStateWithReducer</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={styles["form-container"]}
      >
        <input
          name="name"
          placeholder="Имя"
          className={styles["form-input"]}
          value={state.name}
          disabled={pending}
          onChange={(e) => handleOnChange("name", e.target.value)}
        />
        <input
          name="email"
          placeholder="Email"
          className={styles["form-input"]}
          value={state.email}
          disabled={pending}
          onChange={(e) => handleOnChange("email", e.target.value)}
        />
        <button
          type="submit"
          className={styles["form-button"]}
          disabled={pending}
        >
          <SubmitButton />
        </button>
      </form>
      <StatusRow phase={state.phase} />
    </div>
  );
};
