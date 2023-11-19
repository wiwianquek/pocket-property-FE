import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { SearchBar } from './components/SearchBar';
import FilteredResults from './components/FilteredResults';
import History from './components/History'; 
import MortgageCalculator from './components/MortgageCalculator';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStreet, setSelectedStreet] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);
  const [searchHistory, setSearchHistory] = useState([]); 

  // Format currency without decimal 
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SGD',
      maximumFractionDigits: 0,
      currencyDisplay: 'symbol'
    }).format(value);
  };

  // Search results from my backend api data
  const handleSearch = async (term) => {
    if (term.trim()) {
      try {
        const response = await axios.get(`http://localhost:3000/api/resales`, {
          params: { search: term }
        });
        setSearchResults(response.data);
        
        // Calculate and format the average price here
        const newAveragePrice = response.data.reduce((sum, item) => sum + item.resale_price, 0) / response.data.length || 0;
        const formattedAveragePrice = formatCurrency(newAveragePrice);

        // Create the record with the formatted average price
        const record = {
          "Search Term": term,
          "Results Found": response.data.length.toString(),
          "Average Price": formattedAveragePrice, // Use the formatted average price here
          // Add other necessary fields
        };
        setSearchHistory(history => [...history, record]);
        sendToAirtable(record); // Send the record to Airtable
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]); // Clear results if search is cleared
    }
  };

  // To handle the searches on searchbar 
  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
  };
  
  // Extract street_names from search results
  const streetNames = Array.from(new Set(searchResults.map(item => item.street_name)));

  // Use useEffect to filter results when selectedStreet or searchResults change
  useEffect(() => {
    // Filter results based on selectedStreet
    const filtered = searchResults.filter(item => !selectedStreet || item.street_name === selectedStreet);
    setFilteredResults(filtered);

    // Calculate and set average price based on the new filtered results
    const newAveragePrice = filtered.reduce((sum, item) => sum + item.resale_price, 0) / filtered.length || 0;
    setAveragePrice(newAveragePrice); // Update the averagePrice state
  }, [selectedStreet, searchResults]);

  return (
    <Router>
      <div className="App">
        <div className="search-bar-container">
          <SearchBar onSearch={() => handleSearch(searchTerm)} onSearchTermChange={handleSearchTermChange} />
          <Link to="/">Main</Link>
          <Link to="/mortgage-calculator">Mortgage Calculator</Link>
          <Link to="/history">Search History</Link>
        </div>
        <Routes>
          <Route path="/" element={<FilteredResults
            searchResults={filteredResults}
            selectedStreet={selectedStreet}
            setSelectedStreet={setSelectedStreet}
            averagePrice={averagePrice}
            streetNames={streetNames}
          />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
          <Route path="/history" element={<History history={searchHistory} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


