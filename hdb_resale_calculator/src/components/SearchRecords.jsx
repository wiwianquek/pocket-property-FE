import React from 'react';
import './SearchRecords.css';

function SearchRecords({ history }) {
  return (
    <div className="search-history">
      {history.map((record, index) => (
        <div key={index} className="search-card">
          <p>Search Term: {record["Search Term"]}</p>
          <p>Units Found: {record["Results Found"]}</p>
          <p>Average Price: {record["Average Price"]}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchRecords;

