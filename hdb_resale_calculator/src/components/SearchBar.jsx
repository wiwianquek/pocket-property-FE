import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ onSearch, onSearchTermChange }) => {
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        onSearchTermChange(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input); // Pass the input to the onSearch function
    };

    return (
        <form onSubmit={handleSubmit} className="input-wrapper">
            <FaSearch id="search-icon" />
            <input 
                placeholder="Type to search.." 
                value={input} 
                onChange={handleInputChange}
            />
            <button type="submit">Search</button>
        </form>
        
    );
};