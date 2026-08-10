import { ChangeEvent, useEffect, useRef, useState } from "react";

export const PreviousInput = () => {
  const [value, setValue] = useState("");
  const [displayPrevious, setDisplayPrevious] = useState("");

  const previousValueRef = useRef("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  useEffect(() => {
    setDisplayPrevious(previousValueRef.current);
    previousValueRef.current = value;
  }, [value]);

  return (
    <div>
      <h1>Previous Input</h1>
      <input
        value={value}
        placeholder="Введите текст..."
        onChange={handleChange}
      />
      <br />
      Предыдущее значение: {displayPrevious}
    </div>
  );
};
