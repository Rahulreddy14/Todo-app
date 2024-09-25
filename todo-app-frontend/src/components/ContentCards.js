import React from 'react';

// Data for each category's content
const categoryContent = {
  Work: [
    { title: 'Accounting Tasks', description: 'Keep your books organized.', icon: '📚' },
    { title: 'Business Travel Packing', description: 'Never forget essentials.', icon: '🧳' },
  ],
  Personal: [
    { title: 'Fitness Goals', description: 'Track your daily workout.', icon: '🏋️' },
    { title: 'Meal Planning', description: 'Plan your weekly meals.', icon: '🍽️' },
  ],
  Education: [
    { title: 'Study Schedule', description: 'Organize your subjects.', icon: '📖' },
    { title: 'Project Deadlines', description: 'Never miss deadlines.', icon: '📝' },
  ],
  // You can add more categories similarly
};

const ContentCards = ({ selectedCategory }) => {
  // Fallback to an empty array if selectedCategory doesn't match any key in categoryContent
  const contentList = categoryContent[selectedCategory] || [];

  console.log('Content List for Selected Category:', contentList); // Debug: Log content for the selected category

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {contentList.map((content, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6">
          <div className="text-5xl">{content.icon}</div>
          <h3 className="text-2xl font-bold mt-4">{content.title}</h3>
          <p className="mt-2">{content.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentCards;
