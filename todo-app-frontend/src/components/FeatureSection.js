import React from 'react';

const features = [
  {
    title: 'Manage Your Tasks',
    description: 'Organize tasks efficiently, set deadlines, and track your progress.',
    icon: '🗂️',
  },
  {
    title: 'Stay Focused',
    description: 'Eliminate distractions and focus on the tasks that matter.',
    icon: '📌',
  },
  {
    title: 'Collaborate Easily',
    description: 'Work together with your team, share tasks, and complete projects.',
    icon: '🤝',
  },
];

const FeatureSection = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Features</h2>

        {/* Features List */}
        <div className="flex justify-center space-x-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-8 w-1/3">
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
              <p className="mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
