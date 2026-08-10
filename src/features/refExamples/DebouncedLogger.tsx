import { useState, useRef, ChangeEvent } from "react";

const TIMEOUT_MS = 1000;

export const DebouncedLogger = () => {
  const [text, setText] = useState("");
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setText(value);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      console.log(value);
    }, TIMEOUT_MS);
  };

  return (
    <div>
      <h1>Debounced Logger</h1>
      <input
        type="text"
        value={text}
        placeholder="Введите текст..."
        onChange={handleChange}
      />
    </div>
  );
};
