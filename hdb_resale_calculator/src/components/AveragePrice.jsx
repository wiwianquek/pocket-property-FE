import React from 'react';

function AveragePrice({ filteredResults }) {
  // Calculate average price based on filteredResults
  const averagePrice = filteredResults.reduce((sum, item) => sum + item.resale_price, 0) / filteredResults.length || 0;

  return (
    <div>
      <p>Average Price: ${averagePrice.toFixed(2)}</p>
    </div>
  );
}

export default AveragePrice;
