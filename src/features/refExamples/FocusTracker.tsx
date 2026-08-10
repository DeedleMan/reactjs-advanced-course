import { FocusEvent, useRef, useState } from "react";

export const FocusTracker = () => {
  const countRef = useRef(0);
  const [count, setCount] = useState(0);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (event.relatedTarget) {
      countRef.current += 1;
      setCount(countRef.current);
      console.log(`Количество переходов фокуса: ${countRef.current}`);
    }
  };

  return (
    <div>
      <h1>Focus Tracker</h1>
      <input ref={firstInputRef} onFocus={handleFocus} />
      <br />
      <input ref={secondInputRef} onFocus={handleFocus} />
      <br />
      <button onClick={handleClick}>Сфокусировать на первом</button>
      <p>Количество переходов фокуса: {count}</p>
    </div>
  );
};
