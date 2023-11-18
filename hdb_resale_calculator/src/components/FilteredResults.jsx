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
    <div className="filtered-results"> 
      {filteredResults.length > 0 && (
        <div>
          {/* House icon before the number of units found */}
          <p><span className="icon house-icon"></span>{filteredResults.length} units found</p>
          
          {/* Dollar icon before the average price */}
          <p><span className="icon dollar-icon"></span>Average Price: {new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'SGD', 
            maximumFractionDigits: 0, 
            currencyDisplay: 'symbol' 
          }).format(averagePrice)}</p>
          
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
