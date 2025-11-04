import React from "react";

const Filters = ({ categories, selected, onCategoryChange, onPriceChange }) => {
  return (
    <div className="flex items-center gap-3">
      <select
        value={selected}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded px-2 py-2"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <label className="text-sm">Max price</label>
        <input
          type="number"
          onChange={(e) => onPriceChange(Number(e.target.value))}
          placeholder="0"
          className="w-24 border rounded px-2 py-1"
        />
      </div>
    </div>
  );
};

export default Filters;
