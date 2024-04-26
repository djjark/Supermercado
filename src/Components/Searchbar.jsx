// Searchbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Searchbar = ({ placeholder, options, onSearch, onFilter }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState('');

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        onFilter(value);
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-4 py-2 border rounded-md mr-2"
            />
            <select
                value={selectedOption}
                onChange={handleFilterChange}
                className="px-4 py-2 border rounded-md"
            >
                <option value="">All</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <Link to="/add-item">
                <button>Add Item</button>
            </Link>
        </div>
    );
};

export default Searchbar;
