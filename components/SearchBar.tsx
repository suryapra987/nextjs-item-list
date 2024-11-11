import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by title..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
    />
  );
};

export default SearchBar;
