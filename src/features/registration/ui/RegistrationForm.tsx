import { FC, useEffect, useRef, useState } from "react";

import styles from "./RegistrationForm.module.css";
import { SuccessScreen } from "./SuccessScreen";
import { useRegistrationForm, TFormData } from "../model/useRegistrationForm";

interface IRegistrationFormProps {
  onSubmit?: (data: TFormData) => void;
}

export const RegistrationForm: FC<IRegistrationFormProps> = ({
  onSubmit = () => {},
}) => {
  const {
    fields,
    errors,
    isSubmitting,
    register,
    handleSubmit,
    reset,
    append,
    remove,
  } = useRegistrationForm();

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedUsername, setSubmittedUsername] = useState("");

  useEffect(() => {
    if (fields.length > 1 && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fields.length]);

  const handleFormSubmit = (data: TFormData) => {
    onSubmit(data);
    setSubmittedUsername(data.username);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    reset({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      socialLinks: [{ url: "" }],
    });
  };

  if (isSuccess) {
    return (
      <div className={styles["registrationform-form"]}>
        <SuccessScreen username={submittedUsername} onReset={handleReset} />
      </div>
    );
  }

  return (
    <form
      className={styles["registrationform-form"]}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <label className={styles["registrationform-label"]}>
        Имя пользователя
        <input
          type="text"
          {...register("username")}
          className={styles["registrationform-input"]}
        />
        <span className={styles["registrationform-error"]}>
          {errors.username?.message}
        </span>
      </label>

      <label className={styles["registrationform-label"]}>
        Email
        <input
          type="email"
          {...register("email")}
          className={styles["registrationform-input"]}
        />
        <span className={styles["registrationform-error"]}>
          {errors.email?.message}
        </span>
      </label>

      <label className={styles["registrationform-label"]}>
        Пароль
        <input
          type="password"
          {...register("password")}
          className={styles["registrationform-input"]}
        />
        <span className={styles["registrationform-error"]}>
          {errors.password?.message}
        </span>
      </label>

      <label className={styles["registrationform-label"]}>
        Подтверждение пароля
        <input
          type="password"
          {...register("confirmPassword")}
          className={styles["registrationform-input"]}
        />
        <span className={styles["registrationform-error"]}>
          {errors.confirmPassword?.message}
        </span>
      </label>

      <div className={styles["registrationform-section"]} ref={sectionRef}>
        <span className={styles["registrationform-section-title"]}>
          Социальные ссылки
        </span>

        {fields.map((field, index) => (
          <div className={styles["registrationform-link-row"]} key={field.id}>
            <input
              type="text"
              {...register(`socialLinks.${index}.url`)}
              placeholder="https://vk.ru/id"
              className={styles["registrationform-input"]}
            />
            <span className={styles["registrationform-error"]}>
              {errors.socialLinks?.[index]?.url?.message}
            </span>
            <button
              type="button"
              className={styles["registrationform-remove-button"]}
              onClick={() => remove(index)}
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          className={styles["registrationform-add-button"]}
          onClick={() => append({ url: "" })}
        >
          + Добавить ссылку
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles["registrationform-button"]}
      >
        {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
};
