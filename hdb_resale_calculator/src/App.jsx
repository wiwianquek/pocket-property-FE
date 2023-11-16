import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { SearchBar } from './components/SearchBar';
import FilteredResults from './components/FilteredResults'; // Import the FilteredResults component

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStreet, setSelectedStreet] = useState('');
  const [filteredResults, setFilteredResults] = useState([]); // Added filteredResults state

  // Refactor handleSearch to accept a search term parameter
  const handleSearch = async (term) => {
    if (term.trim()) {
      try {
        const response = await axios.get(`http://localhost:3000/api/resales`, {
          params: { search: term }
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]); // Clear results if search is cleared
    }
  };

  // No changes needed for handleSearchTermChange
  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };

  // Extract unique street names from search results
  const streetNames = Array.from(new Set(searchResults.map(item => item.street_name)));

  // Calculate average price for filteredResults
  const averagePrice = filteredResults.reduce((sum, item) => sum + item.resale_price, 0) / filteredResults.length || 0;

  // Use useEffect to filter results when selectedStreet or searchResults change
  useEffect(() => {
    // Filter results based on selectedStreet
    const filtered = searchResults.filter(item => !selectedStreet || item.street_name === selectedStreet);
    setFilteredResults(filtered);
  }, [selectedStreet, searchResults]);

  return (
    <div className="App">
      <div className="search-bar-container">
        {/* Update onSearch to call handleSearch with the current searchTerm */}
        <SearchBar onSearch={() => handleSearch(searchTerm)} onSearchTermChange={handleSearchTermChange} />
        {/* Pass averagePrice and streetNames as props to FilteredResults */}
        <FilteredResults
          searchResults={filteredResults}
          selectedStreet={selectedStreet}
          setSelectedStreet={setSelectedStreet}
          averagePrice={averagePrice}
          streetNames={streetNames}
        />
      </div>
    </div>
  );
}

export default App;
