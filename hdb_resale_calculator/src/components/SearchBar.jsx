import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./SearchBar.css";

export const SearchBar = ( onSearch ) => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const fetchData = async (value) => {
        try {
            // Assuming you have a search endpoint that can filter based on input
            const response = await axios.get(`http://localhost:3000/api/resales?search=${value}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            // Handle error...
        }
    };

    // Debounce the input to avoid too many requests
    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    };

    const handleSearch = debounce((value) => {
        fetchData(value);
    }, 500);

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                placeholder="Type to search.." 
                value={input} 
                onChange={(e) => {
                  setInput(e.target.value);
                  handleSearch(e.target.value);
                }}
            />
            {/* Assuming you want to display the results below the search bar */}
            <div className="search-results">
                {searchResults.map((item, index) => (
                    <div key={index}>
                        {/* Render your item */}
                    </div>
                ))}
            </div>
        </div>
    );
};

