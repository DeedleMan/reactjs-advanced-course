import { createPortal } from "react-dom";

import { useTheme } from "@/shared/ui/theme/ThemeContext";

import styles from "./ConfirmDialog.module.css";
import { resolveConfirmDialog, useConfirmDialog } from "./useConfirmDialog";

export const ConfirmDialog = () => {
  const dialog = useConfirmDialog();
  const { theme } = useTheme();

  const handleConfirm = () => resolveConfirmDialog(true);
  const handleCancel = () => resolveConfirmDialog(false);

  if (!dialog) {
    return null;
  }

  return createPortal(
    <div
      data-theme={theme}
      className={styles["overlay"]}
      onClick={handleCancel}
    >
      <div
        className={styles["dialog"]}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className={styles["title"]}>
          {dialog.title}
        </h2>
        {dialog.description ? (
          <p className={styles["description"]}>{dialog.description}</p>
        ) : null}
        <div className={styles["actions"]}>
          <button
            type="button"
            className={styles["cancel"]}
            onClick={handleCancel}
          >
            Отмена
          </button>
          <button
            type="button"
            className={styles["confirm"]}
            onClick={handleConfirm}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("dialog-root")!,
  );
};
