import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, ArrowRight, Star, BookOpen, Clock, Target } from 'lucide-react';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  matchPercentage: number;
  averageSalary: string;
  jobDemand: string;
  keySkills: string[];
  color: string;
}

const careerPaths: { [key: string]: CareerPath } = {
  developer: {
    id: 'developer',
    title: 'Full-Stack Developer',
    description: 'Build end-to-end web applications using modern technologies and frameworks.',
    matchPercentage: 0,
    averageSalary: '$75,000 - $120,000',
    jobDemand: 'Very High',
    keySkills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git'],
    color: 'from-blue-500 to-cyan-500'
  },
  analyst: {
    id: 'analyst',
    title: 'Data Analyst',
    description: 'Transform raw data into actionable insights to drive business decisions.',
    matchPercentage: 0,
    averageSalary: '$60,000 - $90,000',
    jobDemand: 'High',
    keySkills: ['SQL', 'Python', 'Excel', 'Tableau', 'Statistics', 'Machine Learning'],
    color: 'from-green-500 to-emerald-500'
  },
  designer: {
    id: 'designer',
    title: 'UX/UI Designer',
    description: 'Create intuitive and visually appealing user experiences for digital products.',
    matchPercentage: 0,
    averageSalary: '$65,000 - $100,000',
    jobDemand: 'High',
    keySkills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'HTML/CSS'],
    color: 'from-purple-500 to-pink-500'
  },
  security: {
    id: 'security',
    title: 'Cybersecurity Specialist',
    description: 'Protect organizations from cyber threats and ensure data security.',
    matchPercentage: 0,
    averageSalary: '$80,000 - $130,000',
    jobDemand: 'Very High',
    keySkills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance', 'Incident Response'],
    color: 'from-red-500 to-orange-500'
  }
};

export function Results() {
  const [results, setResults] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedResults = localStorage.getItem('quiz_results');
    if (!savedResults) {
      navigate('/quiz');
      return;
    }

    const scores = JSON.parse(savedResults);
    const maxScore = Math.max(...Object.values(scores));
    
    // Calculate match percentages and sort by score
    const sortedResults = Object.entries(scores)
      .map(([career, score]) => ({
        ...careerPaths[career],
        matchPercentage: Math.round((score / maxScore) * 100)
      }))
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setResults(sortedResults);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const topMatch = results[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Career Assessment Results
          </h1>
          <p className="text-gray-600">
            Based on your responses, here are your personalized career recommendations
          </p>
        </div>

        {/* Top Match Highlight */}
        <div className={`bg-gradient-to-r ${topMatch.color} rounded-lg p-8 text-white mb-8`}>
          <div className="flex items-center mb-4">
            <Star className="w-6 h-6 mr-2" />
            <span className="font-semibold">Best Match</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{topMatch.title}</h2>
          <p className="text-white/90 mb-4">{topMatch.description}</p>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {topMatch.matchPercentage}% Match
            </div>
            <Link
              to={`/roadmap/${topMatch.id}`}
              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>View Roadmap</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* All Results */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {results.map((career, index) => (
            <div key={career.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-blue-600">
                    {career.matchPercentage}%
                  </div>
                  <div className="text-sm text-gray-500">match</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{career.description}</p>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Average Salary</span>
                  <span className="text-sm text-gray-900">{career.averageSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Job Demand</span>
                  <span className="text-sm text-gray-900">{career.jobDemand}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 block mb-2">Key Skills</span>
                <div className="flex flex-wrap gap-2">
                  {career.keySkills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Link
                  to={`/roadmap/${career.id}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                >
                  View Roadmap
                </Link>
                <Link
                  to="/resources"
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-center"
                >
                  Resources
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Start Learning</h4>
                <p className="text-sm text-gray-600">Begin with your roadmap</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-900">Explore Resources</h4>
                <p className="text-sm text-gray-600">Find courses and tutorials</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
              <div>
                <h4 className="font-medium text-gray-900">Track Progress</h4>
                <p className="text-sm text-gray-600">Monitor your growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}