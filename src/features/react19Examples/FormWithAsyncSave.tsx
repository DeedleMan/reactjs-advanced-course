import { useEffect, useRef, useActionState } from "react";
import { useFormStatus } from "react-dom";

import styles from "./FormWithAsyncSave.module.css";

type TSaveState = { status: "idle" | "success"; value: string };

const initialState: TSaveState = { status: "idle", value: "" };

const saveAction = async (
  prevState: TSaveState,
  formData: FormData,
): Promise<TSaveState> => {
  const isReset = formData.get("isReset") as string;

  if (isReset === "true") {
    return initialState;
  }

  const value = (formData.get("input") as string).trim();

  if (!value) {
    return { ...prevState, status: "idle" };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { status: "success", value };
};

const SubmitButton = ({ status }: { status: TSaveState["status"] }) => {
  const { pending } = useFormStatus();

  if (pending) return "Saving";
  if (status === "success") return "Saved!";

  return "Сохранить";
};

const StatusRow = ({
  status,
  pending,
}: {
  status: TSaveState["status"];
  pending: boolean;
}) => {
  let text: string;

  if (pending) {
    text = "Saving";
  } else {
    switch (status) {
      case "success":
        text = "Success";
        break;
      default:
        text = "Idle";
        break;
    }
  }

  return <div className={styles["form-status"]}>{text}</div>;
};

export const FormWithAsyncSave = () => {
  const [state, formAction, pending] = useActionState<TSaveState, FormData>(
    saveAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Сброс формы после успешного сабмита
  useEffect(() => {
    if (state.status === "success") {
      const timer = setTimeout(() => {
        formRef.current?.reset();
        const resetFormData = new FormData();
        resetFormData.set("isReset", "true");
        formAction(resetFormData);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [state.status, formAction]);

  return (
    <div className={styles["container"]}>
      <h2>FormWithAsyncSave</h2>
      <form
        ref={formRef}
        action={formAction}
        className={styles["form-container"]}
      >
        <input
          type="text"
          name="input"
          placeholder="Введите текст"
          className={styles["form-input"]}
          disabled={pending}
        />
        <button
          type="submit"
          className={styles["form-button"]}
          disabled={pending}
        >
          <SubmitButton status={state.status} />
        </button>
      </form>
      <StatusRow status={state.status} pending={pending} />
    </div>
  );
};
