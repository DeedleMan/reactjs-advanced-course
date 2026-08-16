import { ReactNode, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useTheme } from "@/shared/ui/theme/ThemeContext";

import styles from "./Tooltip.module.css";
import { ETooltipPosition } from "./TooltipPosition";

interface ITooltipContent {
  content: ReactNode;
  position?: ETooltipPosition;
}

interface ITooltipProps extends ITooltipContent {
  children: ReactNode;
}

const OFFSET = 12;

const getTooltipCoordinates = (rect: DOMRect, position: ETooltipPosition) => {
  const { top, left, width, height } = rect;

  switch (position) {
    case ETooltipPosition.TOP:
      return { left: left + width / 2, top: top - OFFSET };
    case ETooltipPosition.BOTTOM:
      return { left: left + width / 2, top: top + height + OFFSET };
    case ETooltipPosition.LEFT:
      return { left: left - OFFSET, top: top + height / 2 };
    case ETooltipPosition.RIGHT:
      return { left: left + width + OFFSET, top: top + height / 2 };
  }
};

export const Tooltip = ({
  children,
  content,
  position = ETooltipPosition.TOP,
}: ITooltipProps) => {
  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ left: 0, top: 0 });

  const anchorRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(() => {
    const anchor = anchorRef.current?.getBoundingClientRect();

    if (!anchor) {
      return;
    }

    setCoords(getTooltipCoordinates(anchor, position));
    setIsVisible(true);
  }, [position]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const tooltip = isVisible
    ? createPortal(
        <div
          data-theme={theme}
          className={`${styles.tooltip} ${styles[position]}`}
          role="tooltip"
          style={{ left: coords.left, top: coords.top }}
        >
          {content}
        </div>,
        document.getElementById("tooltip-root")!,
      )
    : null;

  return (
    <span
      ref={anchorRef}
      className={styles.anchor}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {tooltip}
    </span>
  );
};
