// FilterContainer.jsx
import React from 'react';

export const FilterContainer = ({
  flatType,
  setFlatType,
  flatModel,
  setFlatModel,
  priceRange,
  setPriceRange,
  tenureLeft,
  setTenureLeft
}) => {
  // Here you can create a dropdown or a modal popup for each filter

  // Example for flat type filter
  const handleFlatTypeChange = (e) => {
    setFlatType(e.target.value);
  };

  // ... handlers for other filters

  return (
    <div className="filter-container">
      {/* Flat Type Filter */}
      <select value={flatType} onChange={handleFlatTypeChange}>
        <option value="">Select Flat Type</option>
        <option value="2 ROOM">2 Room</option>
        <option value="3 ROOM">3 Room</option>
        {/* ... other options */}
      </select>

      {/* ... other filters */}
    </div>
  );
};
