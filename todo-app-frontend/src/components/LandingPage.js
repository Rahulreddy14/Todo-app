import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import CategoryTabs from './CategoryTabs';
import ContentCards from './ContentCards';
import Footer from './Footer';
import FeatureSection from './FeatureSection';

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Work'); // Default category is 'Work'

  useEffect(() => {
    console.log('Selected Category:', selectedCategory); // Debug: Log the selected category
  }, [selectedCategory]);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      <FeatureSection />

      {/* Section Heading */}
      <div className="text-center py-8">
        <h2 className="text-5xl font-extrabold">Kickstart Your Next Project with Templates</h2>
        <p className="text-lg mt-4">Choose from 50+ templates to boost your productivity.</p>
      </div>

      {/* Category Tabs */}
      <CategoryTabs setSelectedCategory={setSelectedCategory} />

      {/* Dynamic Content Cards */}
      <ContentCards selectedCategory={selectedCategory} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
