import { ChangeEvent, FC, useState } from "react";

import { ETaskStatus, TFilter } from "../consts";

interface IFilterButtonProps {
  onChange: (filter: TFilter) => void;
}

export const FilterButton: FC<IFilterButtonProps> = ({ onChange }) => {
  const [currentFilter, setCurrentFilter] = useState(ETaskStatus.ALL);

  const renderFilterItem = (status: ETaskStatus) => (
    <option key={status} value={status}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </option>
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFilter = e.target.value as ETaskStatus;

    setCurrentFilter(newFilter);
    onChange(newFilter as unknown as TFilter);
  };

  return (
    <>
      <label htmlFor="status-select">Фильтр: </label>
      <select id="status-select" value={currentFilter} onChange={handleChange}>
        {Object.values(ETaskStatus).map(renderFilterItem)}
      </select>
    </>
  );
};
