import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Star, Play, BookOpen, Code, Users } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'course' | 'article' | 'practice' | 'book';
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  duration: string;
  url: string;
  instructor?: string;
  price: 'Free' | 'Paid';
}

const resources: Resource[] = [
  // Web Development
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, and more',
    type: 'course',
    category: 'Web Development',
    level: 'Beginner',
    rating: 4.8,
    duration: '65 hours',
    url: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/',
    instructor: 'Angela Yu',
    price: 'Paid'
  },
  {
    id: '2',
    title: 'JavaScript Tutorial for Beginners',
    description: 'Learn JavaScript from scratch with practical examples',
    type: 'video',
    category: 'Web Development',
    level: 'Beginner',
    rating: 4.9,
    duration: '3 hours',
    url: 'https://youtube.com/watch?v=W6NZfCO5SIk',
    instructor: 'Programming with Mosh',
    price: 'Free'
  },
  {
    id: '3',
    title: 'React Official Documentation',
    description: 'Official React documentation with examples and tutorials',
    type: 'article',
    category: 'Web Development',
    level: 'Intermediate',
    rating: 4.7,
    duration: '10 hours',
    url: 'https://reactjs.org/docs/getting-started.html',
    price: 'Free'
  },
  {
    id: '4',
    title: 'JavaScript30 Challenge',
    description: 'Build 30 things in 30 days with vanilla JavaScript',
    type: 'practice',
    category: 'Web Development',
    level: 'Intermediate',
    rating: 4.6,
    duration: '30 days',
    url: 'https://javascript30.com/',
    instructor: 'Wes Bos',
    price: 'Free'
  },
  
  // Data Science
  {
    id: '5',
    title: 'Python for Data Science Handbook',
    description: 'Comprehensive guide to Python tools for data science',
    type: 'book',
    category: 'Data Science',
    level: 'Intermediate',
    rating: 4.5,
    duration: '20 hours',
    url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
    instructor: 'Jake VanderPlas',
    price: 'Free'
  },
  {
    id: '6',
    title: 'Data Analysis with Python',
    description: 'Learn pandas, numpy, and matplotlib for data analysis',
    type: 'course',
    category: 'Data Science',
    level: 'Beginner',
    rating: 4.7,
    duration: '40 hours',
    url: 'https://www.coursera.org/learn/data-analysis-with-python',
    instructor: 'IBM',
    price: 'Paid'
  },
  {
    id: '7',
    title: 'SQL Tutorial - Full Database Course',
    description: 'Complete SQL tutorial covering all major concepts',
    type: 'video',
    category: 'Data Science',
    level: 'Beginner',
    rating: 4.8,
    duration: '4 hours',
    url: 'https://youtube.com/watch?v=HXV3zeQKqGY',
    instructor: 'freeCodeCamp',
    price: 'Free'
  },
  
  // Design
  {
    id: '8',
    title: 'UI/UX Design Specialization',
    description: 'Complete UI/UX design course from CalArts',
    type: 'course',
    category: 'Design',
    level: 'Beginner',
    rating: 4.6,
    duration: '24 hours',
    url: 'https://www.coursera.org/specializations/ui-ux-design',
    instructor: 'CalArts',
    price: 'Paid'
  },
  {
    id: '9',
    title: 'Figma Tutorial for Beginners',
    description: 'Learn Figma from basics to advanced features',
    type: 'video',
    category: 'Design',
    level: 'Beginner',
    rating: 4.7,
    duration: '2 hours',
    url: 'https://youtube.com/watch?v=FTFaQWZBqQ8',
    instructor: 'Figma',
    price: 'Free'
  },
  {
    id: '10',
    title: 'Design Systems with Figma',
    description: 'Build scalable design systems',
    type: 'course',
    category: 'Design',
    level: 'Advanced',
    rating: 4.5,
    duration: '15 hours',
    url: 'https://www.designsystems.com/',
    instructor: 'Design Systems',
    price: 'Paid'
  },
  
  // Cybersecurity
  {
    id: '11',
    title: 'Cybersecurity Fundamentals',
    description: 'Introduction to cybersecurity concepts and practices',
    type: 'course',
    category: 'Cybersecurity',
    level: 'Beginner',
    rating: 4.6,
    duration: '30 hours',
    url: 'https://www.coursera.org/learn/cyber-security-fundamentals',
    instructor: 'IBM',
    price: 'Paid'
  },
  {
    id: '12',
    title: 'Ethical Hacking Course',
    description: 'Learn penetration testing and ethical hacking',
    type: 'video',
    category: 'Cybersecurity',
    level: 'Intermediate',
    rating: 4.7,
    duration: '12 hours',
    url: 'https://youtube.com/watch?v=3Kq1MIfTWCE',
    instructor: 'freeCodeCamp',
    price: 'Free'
  }
];

export function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');

  const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Cybersecurity'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const types = ['All', 'video', 'course', 'article', 'practice', 'book'];
  const prices = ['All', 'Free', 'Paid'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || resource.level === selectedLevel;
    const matchesType = selectedType === 'All' || resource.type === selectedType;
    const matchesPrice = selectedPrice === 'All' || resource.price === selectedPrice;

    return matchesSearch && matchesCategory && matchesLevel && matchesType && matchesPrice;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'course': return BookOpen;
      case 'article': return BookOpen;
      case 'practice': return Code;
      case 'book': return BookOpen;
      default: return BookOpen;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-800';
      case 'course': return 'bg-blue-100 text-blue-800';
      case 'article': return 'bg-green-100 text-green-800';
      case 'practice': return 'bg-purple-100 text-purple-800';
      case 'book': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
          <p className="text-gray-600">Curated collection of courses, tutorials, and resources for your IT career</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                ))}
              </select>

              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {prices.map(price => (
                  <option key={price} value={price}>{price === 'All' ? 'All Prices' : price}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <div key={resource.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      resource.price === 'Free' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {resource.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{resource.duration}</span>
                    {resource.instructor && (
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {resource.instructor}
                      </span>
                    )}
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>
                      {resource.type === 'video' ? 'Watch' : 
                       resource.type === 'course' ? 'Take Course' : 
                       resource.type === 'article' ? 'Read' : 
                       resource.type === 'practice' ? 'Practice' : 'View'}
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}