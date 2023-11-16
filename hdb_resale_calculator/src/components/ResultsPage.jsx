// ResultsPage.jsx
import React from 'react';

function ResultsPage({ searchResults }) {
  // Display the search results here
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            {/* Render each search result */}
            <p>Month: {result.month}</p>
            <p>Town: {result.town}</p>
            {/* Add more fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsPage;
