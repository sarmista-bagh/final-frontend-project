import React, { useState } from 'react';

const Filter = {
    categories: ["All", "World", "Business", "Technology", "Sport", "Entertainment"]
};

const FilterArticle = ({ filterState, setFilterState }) => {
    const [selectedCategory, setSelectedCategory] = useState(filterState.category);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleApplyFilters = () => {
        setFilterState(prev => ({ ...prev, category: selectedCategory }));
    };

    return (
        <div className="w-full md:w-[300px] md:min-w-[250px] bg-white min-h-screen shadow-md p-4 sm:p-6  md:border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Search input (disabled for now) */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Search Term:</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                    placeholder="Search (optional)"
                    disabled
                />
            </div>

            {/* Category Dropdown */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Category:</label>
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md"
                >
                    {Filter.categories.map((category, index) => (
                        <option key={index} value={category.toLowerCase()}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleApplyFilters}
                className="w-full bg-red-600 text-white font-semibold py-2 rounded-md shadow hover:bg-red-700 transition duration-200"
            >
                Apply Filters
            </button>
        </div>
    );
};

export default FilterArticle;
