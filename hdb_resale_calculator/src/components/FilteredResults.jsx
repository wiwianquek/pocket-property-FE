import React, { useEffect, useState } from 'react';
import './FilteredResults.css'; 

function FilteredResults({ searchResults, selectedStreet, setSelectedStreet, averagePrice, streetNames }) {
  // Use useEffect to filter results when selectedStreet or searchResults change
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    // Filter results based on selectedStreet
    const filtered = searchResults.filter(item => !selectedStreet || item.street_name === selectedStreet);
    setFilteredResults(filtered);
  }, [selectedStreet, searchResults]);

  return (
    <div className="filtered-results"> {/* Apply styling using CSS class */}
      {filteredResults.length > 0 && (
        <div>
          <p>{filteredResults.length} units found</p>
          <p>Average Price: ${averagePrice.toFixed(2)}</p>
          <select onChange={e => setSelectedStreet(e.target.value)} value={selectedStreet}>
            <option value="">All Streets</option>
            {streetNames.map((street, index) => (
              <option key={index} value={street}>{street}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default FilteredResults;
