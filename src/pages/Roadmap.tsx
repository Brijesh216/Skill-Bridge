import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Circle, Clock, BookOpen, Play, ExternalLink } from 'lucide-react';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  resources: {
    title: string;
    type: 'video' | 'article' | 'course' | 'practice';
    url: string;
  }[];
}

const roadmaps: { [key: string]: { title: string; steps: RoadmapStep[] } } = {
  developer: {
    title: 'Full-Stack Developer',
    steps: [
      {
        id: '1',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of web development',
        duration: '2-3 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'HTML & CSS Crash Course', type: 'video', url: 'https://youtube.com/watch?v=hu-q2zYwEYs' },
          { title: 'CSS Grid and Flexbox', type: 'course', url: 'https://cssgrid.io/' },
          { title: 'Practice: Build a Landing Page', type: 'practice', url: 'https://codepen.io/' }
        ]
      },
      {
        id: '2',
        title: 'JavaScript Essentials',
        description: 'Master the fundamentals of JavaScript programming',
        duration: '3-4 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'JavaScript Fundamentals', type: 'video', url: 'https://youtube.com/watch?v=hdI2bqOjy3c' },
          { title: 'ES6+ Features', type: 'article', url: 'https://javascript.info/' },
          { title: 'DOM Manipulation Practice', type: 'practice', url: 'https://javascript30.com/' }
        ]
      },
      {
        id: '3',
        title: 'React Development',
        description: 'Build dynamic user interfaces with React',
        duration: '4-5 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'React Tutorial for Beginners', type: 'video', url: 'https://youtube.com/watch?v=Ke90Tje7VS0' },
          { title: 'React Documentation', type: 'article', url: 'https://reactjs.org/docs/' },
          { title: 'Build a Todo App', type: 'practice', url: 'https://github.com/facebook/create-react-app' }
        ]
      },
      {
        id: '4',
        title: 'Node.js & Express',
        description: 'Create server-side applications with Node.js',
        duration: '3-4 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'Node.js Crash Course', type: 'video', url: 'https://youtube.com/watch?v=fBNz5xF-Kx4' },
          { title: 'Express.js Guide', type: 'article', url: 'https://expressjs.com/' },
          { title: 'REST API Project', type: 'practice', url: 'https://github.com/nodejs/node' }
        ]
      },
      {
        id: '5',
        title: 'Database Design & SQL',
        description: 'Learn to design and work with databases',
        duration: '2-3 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'SQL Tutorial', type: 'video', url: 'https://youtube.com/watch?v=HXV3zeQKqGY' },
          { title: 'Database Design Principles', type: 'article', url: 'https://www.postgresql.org/docs/' },
          { title: 'Build a Database Schema', type: 'practice', url: 'https://sqlbolt.com/' }
        ]
      },
      {
        id: '6',
        title: 'Full-Stack Project',
        description: 'Combine all skills in a comprehensive project',
        duration: '4-6 weeks',
        difficulty: 'Advanced',
        completed: false,
        resources: [
          { title: 'Full-Stack Project Ideas', type: 'article', url: 'https://github.com/florinpop17/app-ideas' },
          { title: 'Deployment Guide', type: 'video', url: 'https://youtube.com/watch?v=oykl1Ih9pMg' },
          { title: 'Portfolio Project', type: 'practice', url: 'https://github.com/' }
        ]
      }
    ]
  },
  analyst: {
    title: 'Data Analyst',
    steps: [
      {
        id: '1',
        title: 'Excel Mastery',
        description: 'Master advanced Excel features for data analysis',
        duration: '2-3 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'Excel for Data Analysis', type: 'video', url: 'https://youtube.com/watch?v=Vl0H-qTclOg' },
          { title: 'Advanced Excel Functions', type: 'course', url: 'https://support.microsoft.com/en-us/excel' },
          { title: 'Practice: Sales Data Analysis', type: 'practice', url: 'https://www.kaggle.com/datasets' }
        ]
      },
      {
        id: '2',
        title: 'SQL for Data Analysis',
        description: 'Query databases effectively for insights',
        duration: '3-4 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'SQL for Data Science', type: 'video', url: 'https://youtube.com/watch?v=9Pzj7Aj25lw' },
          { title: 'SQL Practice Problems', type: 'practice', url: 'https://sqlbolt.com/' },
          { title: 'Window Functions', type: 'article', url: 'https://mode.com/sql-tutorial/' }
        ]
      },
      {
        id: '3',
        title: 'Python for Data Analysis',
        description: 'Use Python libraries for data manipulation',
        duration: '4-5 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'Python Data Analysis', type: 'video', url: 'https://youtube.com/watch?v=r-uOLxNrNk8' },
          { title: 'Pandas Documentation', type: 'article', url: 'https://pandas.pydata.org/docs/' },
          { title: 'NumPy Tutorial', type: 'course', url: 'https://numpy.org/learn/' }
        ]
      },
      {
        id: '4',
        title: 'Data Visualization',
        description: 'Create compelling charts and dashboards',
        duration: '3-4 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'Tableau Tutorial', type: 'video', url: 'https://youtube.com/watch?v=jj6-0cvcNEA' },
          { title: 'Matplotlib & Seaborn', type: 'course', url: 'https://matplotlib.org/stable/tutorials/' },
          { title: 'Dashboard Project', type: 'practice', url: 'https://public.tableau.com/' }
        ]
      },
      {
        id: '5',
        title: 'Statistics & Analytics',
        description: 'Apply statistical methods to data',
        duration: '4-5 weeks',
        difficulty: 'Advanced',
        completed: false,
        resources: [
          { title: 'Statistics for Data Science', type: 'video', url: 'https://youtube.com/watch?v=xxpc-HPKN28' },
          { title: 'A/B Testing Guide', type: 'article', url: 'https://www.optimizely.com/optimization-glossary/ab-testing/' },
          { title: 'Statistical Analysis Project', type: 'practice', url: 'https://www.kaggle.com/competitions' }
        ]
      },
      {
        id: '6',
        title: 'Business Intelligence',
        description: 'Present insights to stakeholders',
        duration: '3-4 weeks',
        difficulty: 'Advanced',
        completed: false,
        resources: [
          { title: 'Business Intelligence Fundamentals', type: 'course', url: 'https://powerbi.microsoft.com/en-us/learning/' },
          { title: 'Storytelling with Data', type: 'article', url: 'https://www.storytellingwithdata.com/' },
          { title: 'Executive Dashboard', type: 'practice', url: 'https://app.powerbi.com/' }
        ]
      }
    ]
  },
  designer: {
    title: 'UX/UI Designer',
    steps: [
      {
        id: '1',
        title: 'Design Fundamentals',
        description: 'Learn the principles of good design',
        duration: '2-3 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'Design Principles', type: 'video', url: 'https://youtube.com/watch?v=ZbrzdMaumNk' },
          { title: 'Color Theory', type: 'article', url: 'https://www.interaction-design.org/literature/topics/color-theory' },
          { title: 'Typography Basics', type: 'course', url: 'https://fonts.google.com/knowledge' }
        ]
      },
      {
        id: '2',
        title: 'User Research',
        description: 'Understand user needs and behaviors',
        duration: '3-4 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'User Research Methods', type: 'video', url: 'https://youtube.com/watch?v=Qq3OiHQ-HCU' },
          { title: 'Creating User Personas', type: 'article', url: 'https://www.nngroup.com/articles/persona/' },
          { title: 'User Interview Practice', type: 'practice', url: 'https://www.userinterviews.com/' }
        ]
      },
      {
        id: '3',
        title: 'Wireframing & Prototyping',
        description: 'Create low and high-fidelity designs',
        duration: '3-4 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'Figma Tutorial', type: 'video', url: 'https://youtube.com/watch?v=FTFaQWZBqQ8' },
          { title: 'Wireframing Best Practices', type: 'article', url: 'https://balsamiq.com/learn/articles/what-are-wireframes/' },
          { title: 'Mobile App Wireframe', type: 'practice', url: 'https://www.figma.com/' }
        ]
      },
      {
        id: '4',
        title: 'UI Design Systems',
        description: 'Build consistent design systems',
        duration: '4-5 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'Design Systems 101', type: 'video', url: 'https://youtube.com/watch?v=EK-pHkc5EL4' },
          { title: 'Component Libraries', type: 'article', url: 'https://material.io/design' },
          { title: 'Design System Project', type: 'practice', url: 'https://www.figma.com/community/' }
        ]
      },
      {
        id: '5',
        title: 'Frontend Implementation',
        description: 'Learn HTML, CSS, and basic JavaScript',
        duration: '4-5 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'HTML & CSS for Designers', type: 'video', url: 'https://youtube.com/watch?v=mU6anWqZJcc' },
          { title: 'Responsive Design', type: 'course', url: 'https://web.dev/responsive-web-design-basics/' },
          { title: 'Design-to-Code Practice', type: 'practice', url: 'https://codepen.io/' }
        ]
      },
      {
        id: '6',
        title: 'Portfolio Development',
        description: 'Create a professional design portfolio',
        duration: '3-4 weeks',
        difficulty: 'Advanced',
        completed: false,
        resources: [
          { title: 'UX Portfolio Tips', type: 'video', url: 'https://youtube.com/watch?v=u-6gLhbCFKg' },
          { title: 'Case Study Writing', type: 'article', url: 'https://uxplanet.org/how-to-write-a-ux-case-study-a-step-by-step-guide-94c4635e3768' },
          { title: 'Portfolio Review', type: 'practice', url: 'https://dribbble.com/' }
        ]
      }
    ]
  },
  security: {
    title: 'Cybersecurity Specialist',
    steps: [
      {
        id: '1',
        title: 'Security Fundamentals',
        description: 'Learn the basics of cybersecurity',
        duration: '2-3 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'Cybersecurity Basics', type: 'video', url: 'https://youtube.com/watch?v=inWWhr5tnEA' },
          { title: 'Security+ Study Guide', type: 'course', url: 'https://www.comptia.org/certifications/security' },
          { title: 'Security Terminology', type: 'article', url: 'https://www.sans.org/security-resources/' }
        ]
      },
      {
        id: '2',
        title: 'Network Security',
        description: 'Secure networks and understand protocols',
        duration: '3-4 weeks',
        difficulty: 'Beginner',
        completed: false,
        resources: [
          { title: 'Network Security Fundamentals', type: 'video', url: 'https://youtube.com/watch?v=qiQR5rTSshw' },
          { title: 'Wireshark Tutorial', type: 'practice', url: 'https://www.wireshark.org/docs/' },
          { title: 'Firewall Configuration', type: 'course', url: 'https://www.cisco.com/c/en/us/support/security/firewalls/series.html' }
        ]
      },
      {
        id: '3',
        title: 'Ethical Hacking',
        description: 'Learn penetration testing techniques',
        duration: '4-5 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'Ethical Hacking Course', type: 'video', url: 'https://youtube.com/watch?v=3Kq1MIfTWCE' },
          { title: 'Metasploit Tutorial', type: 'practice', url: 'https://www.metasploit.com/' },
          { title: 'Vulnerability Assessment', type: 'course', url: 'https://www.offensive-security.com/' }
        ]
      },
      {
        id: '4',
        title: 'Incident Response',
        description: 'Handle security incidents effectively',
        duration: '3-4 weeks',
        difficulty: 'Intermediate',
        completed: false,
        resources: [
          { title: 'Incident Response Planning', type: 'video', url: 'https://youtube.com/watch?v=nvhJzKcWhgI' },
          { title: 'NIST Framework', type: 'article', url: 'https://www.nist.gov/cyberframework' },
          { title: 'Tabletop Exercises', type: 'practice', url: 'https://www.cisa.gov/tabletop-exercise-packages' }
        ]
      },
      {
        id: '5',
        title: 'Digital Forensics',
        description: 'Investigate and analyze security incidents',
        duration: '4-5 weeks',
        difficulty: 'Advanced',
        completed: false,
        resources: [
          { title: 'Digital Forensics Basics', type: 'video', url: 'https://youtube.com/watch?v=LNdG9_PvGlE' },
          { title: 'Forensics Tools', type: 'course', url: 'https://www.autopsy.com/' },
          { title: 'Evidence Collection', type: 'practice', url: 'https://www.sans.org/courses/computer-forensics/' }
        ]
      },
      {
        id: '6',
        title: 'Security Management',
        description: 'Develop security policies and procedures',
        duration: '3-4 weeks',
        difficulty: 'Advanced',
        completed: false,
        resources: [
          { title: 'Security Management', type: 'video', url: 'https://youtube.com/watch?v=1ZNq7Jz1GcY' },
          { title: 'Risk Assessment', type: 'article', url: 'https://www.iso.org/iso-27001-information-security.html' },
          { title: 'Security Audit', type: 'practice', url: 'https://www.cisecurity.org/controls/' }
        ]
      }
    ]
  }
};

export function Roadmap() {
  const { pathId } = useParams<{ pathId: string }>();
  const [roadmap, setRoadmap] = useState<{ title: string; steps: RoadmapStep[] } | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pathId && roadmaps[pathId]) {
      const roadmapData = roadmaps[pathId];
      // Load progress from localStorage
      const savedProgress = localStorage.getItem(`roadmap_${pathId}`);
      if (savedProgress) {
        const completedSteps = JSON.parse(savedProgress);
        roadmapData.steps.forEach(step => {
          step.completed = completedSteps.includes(step.id);
        });
      }
      setRoadmap(roadmapData);
      calculateProgress(roadmapData.steps);
    }
  }, [pathId]);

  const calculateProgress = (steps: RoadmapStep[]) => {
    const completedSteps = steps.filter(step => step.completed).length;
    const progressPercentage = (completedSteps / steps.length) * 100;
    setProgress(progressPercentage);
  };

  const toggleStepCompletion = (stepId: string) => {
    if (!roadmap) return;

    const updatedSteps = roadmap.steps.map(step => {
      if (step.id === stepId) {
        return { ...step, completed: !step.completed };
      }
      return step;
    });

    setRoadmap({ ...roadmap, steps: updatedSteps });
    calculateProgress(updatedSteps);

    // Save progress to localStorage
    const completedSteps = updatedSteps.filter(step => step.completed).map(step => step.id);
    localStorage.setItem(`roadmap_${pathId}`, JSON.stringify(completedSteps));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'course': return BookOpen;
      case 'article': return BookOpen;
      case 'practice': return Circle;
      default: return BookOpen;
    }
  };

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{roadmap.title} Roadmap</h1>
            <Link
              to="/dashboard"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Back to Dashboard
            </Link>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress: {Math.round(progress)}% Complete
              </span>
              <span className="text-sm text-gray-500">
                {roadmap.steps.filter(s => s.completed).length} of {roadmap.steps.length} steps
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {roadmap.steps.map((step, index) => (
            <div key={step.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleStepCompletion(step.id)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 transition-colors ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : 'border-2 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-lg font-semibold ${
                      step.completed ? 'text-green-700' : 'text-gray-900'
                    }`}>
                      {step.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${getDifficultyColor(step.difficulty)}`}>
                        {step.difficulty}
                      </span>
                      <span className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.duration}
                      </span>
                    </div>
                  </div>
                  
                  <p className={`mb-4 ${step.completed ? 'text-green-600' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {step.resources.map((resource, idx) => {
                      const Icon = getResourceIcon(resource.type);
                      return (
                        <a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {resource.title}
                          </span>
                          <ExternalLink className="w-3 h-3 text-gray-400 ml-auto" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-8 text-white text-center mt-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-green-100 mb-4">
              You've completed the {roadmap.title} roadmap. You're ready to start your career!
            </p>
            <Link
              to="/resources"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Explore Advanced Resources</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}