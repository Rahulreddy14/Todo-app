import React, { useState } from 'react';

const categories = ['Work', 'Personal', 'Education', 'Management', 'Marketing & Sales', 'Customer Support'];

const CategoryTabs = ({ setSelectedCategory }) => {
  const [activeTab, setActiveTab] = useState('Work'); // Default category is 'Work'

  const handleTabClick = (category) => {
    console.log('Clicked Category:', category); // Debug: Log the clicked category
    setActiveTab(category);
    setSelectedCategory(category); // Update parent component state
  };

  return (
    <div className="flex justify-center space-x-4 mt-6">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-lg font-medium rounded-full ${activeTab === category ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
          onClick={() => handleTabClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
