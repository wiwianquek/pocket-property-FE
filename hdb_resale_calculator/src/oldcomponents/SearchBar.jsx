import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ onSearch, onSearchTermChange }) => {
    const [input, setInput] = useState("");

    //event handlers for changes in input field 
    //e is the event object that gets passed to the function when the event occurs
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
        onSearchTermChange(value); // called every time the input value changes
    };

    //event handler for form submission 
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input); // Pass the input to the onSearch function when the user clicks the "Search" button or presses Enter after typing their query
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