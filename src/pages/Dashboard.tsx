import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Target, 
  BookOpen, 
  Trophy, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  BarChart3,
  Users
} from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();

  const stats = [
    {
      icon: Target,
      label: 'Career Paths',
      value: user?.careerPaths?.length || 0,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: BookOpen,
      label: 'Courses Completed',
      value: '12',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Trophy,
      label: 'Achievements',
      value: '5',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Clock,
      label: 'Learning Hours',
      value: '48',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const recentActivities = [
    {
      type: 'completed',
      title: 'Completed JavaScript Fundamentals',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'started',
      title: 'Started React Development Course',
      time: '1 day ago',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      type: 'achievement',
      title: 'Earned Frontend Developer Badge',
      time: '3 days ago',
      icon: Trophy,
      color: 'text-yellow-600'
    }
  ];

  const quickActions = [
    {
      title: 'Take Career Assessment',
      description: 'Discover your ideal IT career path',
      icon: Target,
      href: '/quiz',
      color: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Browse Learning Resources',
      description: 'Access courses and tutorials',
      icon: BookOpen,
      href: '/resources',
      color: 'from-green-600 to-teal-600'
    },
    {
      title: 'View Progress',
      description: 'Track your learning journey',
      icon: BarChart3,
      href: '/profile',
      color: 'from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Continue your journey to becoming an IT professional
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.href}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} group-hover:scale-105 transition-transform duration-200`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Assessment CTA */}
        {!user?.completedQuiz && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <Target className="w-16 h-16 mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-bold mb-2">Ready to discover your ideal career path?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Take our comprehensive career assessment to get personalized recommendations 
                and a tailored learning roadmap.
              </p>
              <Link
                to="/quiz"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}