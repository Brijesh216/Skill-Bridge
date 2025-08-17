import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Target, 
  Edit2,
  Save,
  X
} from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  const handleSave = () => {
    // In a real app, this would make an API call to update user data
    console.log('Saving user data:', { name: editName, email: editEmail });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(user?.name || '');
    setEditEmail(user?.email || '');
    setIsEditing(false);
  };

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Completed your first assessment',
      icon: Target,
      earned: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      title: 'Learning Streak',
      description: 'Completed 5 courses in a row',
      icon: BookOpen,
      earned: true,
      date: '2024-01-20'
    },
    {
      id: 3,
      title: 'Career Explorer',
      description: 'Explored 3 different career paths',
      icon: Trophy,
      earned: false,
      date: null
    }
  ];

  const learningStats = [
    {
      label: 'Courses Completed',
      value: 12,
      color: 'text-blue-600'
    },
    {
      label: 'Hours Learned',
      value: 48,
      color: 'text-green-600'
    },
    {
      label: 'Certificates Earned',
      value: 3,
      color: 'text-purple-600'
    },
    {
      label: 'Current Streak',
      value: 7,
      color: 'text-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Completed JavaScript Fundamentals',
      date: '2024-01-22',
      type: 'course'
    },
    {
      id: 2,
      title: 'Started React Development Path',
      date: '2024-01-21',
      type: 'roadmap'
    },
    {
      id: 3,
      title: 'Earned Frontend Developer Badge',
      date: '2024-01-20',
      type: 'achievement'
    }
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
                <p className="text-gray-600">Manage your account information and preferences</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{user.name}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{user.email}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-col justify-end space-y-2">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {learningStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border-2 ${
                  achievement.earned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    achievement.earned 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      achievement.earned ? 'text-green-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h3>
                    {achievement.earned && achievement.date && (
                      <p className="text-sm text-green-600">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${
                  achievement.earned ? 'text-green-700' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  activity.type === 'course' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'roadmap' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}