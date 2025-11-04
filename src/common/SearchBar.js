import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex-1">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
};

export default SearchBar;
