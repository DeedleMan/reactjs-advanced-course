import { useRef } from "react";

interface IClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer = () => {
  const clickDataRef = useRef<IClickData>({
    startTime: null,
    clickCount: 0,
  });

  const handleClick = () => {
    if (clickDataRef.current.startTime === null) {
      clickDataRef.current.startTime = Date.now();
    }

    clickDataRef.current.clickCount += 1;
    const diff = Date.now() - clickDataRef.current.startTime!;

    if (clickDataRef.current.clickCount >= 2) {
      console.log(
        `Время от первого клика: ${diff}ms, Количество кликов: ${clickDataRef.current.clickCount}`,
      );
    }
  };

  return (
    <div>
      <h1>ClickTimer</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};
