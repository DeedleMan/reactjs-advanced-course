import { MouseEvent, useState } from "react";

import { showConfirmDialog } from "@/shared/ui/ConfirmDialog/useConfirmDialog";
import { useTheme, ETheme } from "@/shared/ui/theme/ThemeContext";
import { Tooltip } from "@/shared/ui/Tooltip/Tooltip";
import { ETooltipPosition } from "@/shared/ui/Tooltip/TooltipPosition";

import styles from "./PortalShowcase.module.css";

export const PortalShowcase = () => {
  const [cardClicks, setCardClicks] = useState(0);
  const [buttonClicks, setButtonClicks] = useState(0);
  const [isolatedClicks, setIsolatedClicks] = useState(0);
  const [deletedItems, setDeletedItems] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const handleCardClick = () => setCardClicks((prev) => prev + 1);

  const handleButtonClick = () => setButtonClicks((prev) => prev + 1);

  const handleIsolatedClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsolatedClicks((prev) => prev + 1);
  };

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: "Удалить элемент?",
      description: "Это действие необратимо.",
    });

    if (confirmed) {
      setDeletedItems((prev) => prev + 1);
    }
  };

  return (
    <div className={styles["page"]}>
      <h1>Tooltip</h1>

      <button
        type="button"
        className={styles["theme-toggle"]}
        onClick={toggleTheme}
      >
        Тема: {theme === ETheme.DARK ? "🌙 темная" : "☀️ светлая"}
      </button>

      <div className={styles["card"]} onClick={handleCardClick}>
        <button
          type="button"
          className={styles["action-button"]}
          onClick={handleButtonClick}
        >
          Кнопка
        </button>

        <p>
          Счётчики показывают, что нажатие на кнопку засчитано и карточке, и
          кнопке.
        </p>

        <div className={styles["counters"]}>
          <span>Карточка: {cardClicks}</span>
          <span>Кнопка: {buttonClicks}</span>
        </div>
      </div>

      <div className={styles["card"]} onClick={handleCardClick}>
        <p>
          Здесь всплытие остановлено через stopPropagation() — клик по кнопке НЕ
          доходит до родителя.
        </p>

        <button
          type="button"
          className={styles["action-button"]}
          onClick={handleIsolatedClick}
        >
          Изолированная кнопка
        </button>

        <div className={styles["counters"]}>
          <span>Карточка: {cardClicks}</span>
          <span>Кнопка: {isolatedClicks}</span>
        </div>
      </div>

      <div className={styles["card"]}>
        <p>
          Подсказка рендерится через портал в #tooltip-root и не наследует стили
          родителя — изоляция через CSS-модули и pointer-events: none.
        </p>

        <div className={styles["tooltip-demos"]}>
          <Tooltip content="Подсказка сверху" position={ETooltipPosition.TOP}>
            <span className={styles["tooltip-demo-item"]}>сверху</span>
          </Tooltip>

          <Tooltip content="Подсказка снизу" position={ETooltipPosition.BOTTOM}>
            <span className={styles["tooltip-demo-item"]}>снизу</span>
          </Tooltip>

          <Tooltip content="Подсказка слева" position={ETooltipPosition.LEFT}>
            <span className={styles["tooltip-demo-item"]}>слева</span>
          </Tooltip>

          <Tooltip content="Подсказка справа" position={ETooltipPosition.RIGHT}>
            <span className={styles["tooltip-demo-item"]}>справа</span>
          </Tooltip>
        </div>
      </div>

      <div className={styles["card"]}>
        <p>
          Нажмите «Удалить» — откроется диалог подтверждения через портал
          #dialog-root.
        </p>

        <Tooltip
          content="Удалить элемент навсегда"
          position={ETooltipPosition.TOP}
        >
          <button
            type="button"
            className={styles["remove-button"]}
            onClick={handleDelete}
          >
            Удалить
          </button>
        </Tooltip>

        <div className={styles["counters"]}>
          <span>Подтверждённых удалений: {deletedItems}</span>
        </div>
      </div>
    </div>
  );
};
