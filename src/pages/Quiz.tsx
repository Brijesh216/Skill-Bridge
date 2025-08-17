import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "What type of problem-solving approach do you prefer?",
    options: [
      { id: 'a', text: 'Logical, step-by-step analysis', weight: { developer: 3, analyst: 2, designer: 1 } },
      { id: 'b', text: 'Creative, innovative solutions', weight: { designer: 3, developer: 2, analyst: 1 } },
      { id: 'c', text: 'Data-driven decision making', weight: { analyst: 3, developer: 1, designer: 1 } },
      { id: 'd', text: 'Collaborative brainstorming', weight: { designer: 2, developer: 2, analyst: 2 } }
    ]
  },
  {
    id: 2,
    question: "Which activity sounds most appealing to you?",
    options: [
      { id: 'a', text: 'Building and coding applications', weight: { developer: 3, analyst: 1, designer: 1 } },
      { id: 'b', text: 'Analyzing data patterns and trends', weight: { analyst: 3, developer: 1, designer: 1 } },
      { id: 'c', text: 'Designing user interfaces and experiences', weight: { designer: 3, developer: 1, analyst: 1 } },
      { id: 'd', text: 'Protecting systems from cyber threats', weight: { security: 3, developer: 2, analyst: 2 } }
    ]
  },
  {
    id: 3,
    question: "What is your preferred work environment?",
    options: [
      { id: 'a', text: 'Quiet space for deep focus', weight: { developer: 2, analyst: 3, designer: 1 } },
      { id: 'b', text: 'Collaborative team environment', weight: { designer: 3, developer: 2, analyst: 1 } },
      { id: 'c', text: 'Mix of independent and team work', weight: { developer: 3, analyst: 2, designer: 2 } },
      { id: 'd', text: 'Dynamic, fast-paced environment', weight: { security: 2, developer: 2, analyst: 1 } }
    ]
  },
  {
    id: 4,
    question: "Which technical skill interests you most?",
    options: [
      { id: 'a', text: 'Programming and software development', weight: { developer: 3, analyst: 1, designer: 1 } },
      { id: 'b', text: 'Data analysis and visualization', weight: { analyst: 3, developer: 1, designer: 1 } },
      { id: 'c', text: 'Visual design and user experience', weight: { designer: 3, developer: 1, analyst: 1 } },
      { id: 'd', text: 'Network security and ethical hacking', weight: { security: 3, developer: 1, analyst: 2 } }
    ]
  },
  {
    id: 5,
    question: "What motivates you most in your career?",
    options: [
      { id: 'a', text: 'Creating something from scratch', weight: { developer: 3, designer: 2, analyst: 1 } },
      { id: 'b', text: 'Discovering insights from data', weight: { analyst: 3, developer: 1, designer: 1 } },
      { id: 'c', text: 'Improving user experiences', weight: { designer: 3, developer: 2, analyst: 1 } },
      { id: 'd', text: 'Protecting and securing systems', weight: { security: 3, developer: 1, analyst: 2 } }
    ]
  },
  {
    id: 6,
    question: "How do you prefer to learn new technologies?",
    options: [
      { id: 'a', text: 'Hands-on coding projects', weight: { developer: 3, analyst: 1, designer: 2 } },
      { id: 'b', text: 'Analyzing case studies and examples', weight: { analyst: 3, developer: 1, designer: 1 } },
      { id: 'c', text: 'Visual tutorials and design inspiration', weight: { designer: 3, developer: 1, analyst: 1 } },
      { id: 'd', text: 'Structured courses and certifications', weight: { security: 2, developer: 2, analyst: 2 } }
    ]
  },
  {
    id: 7,
    question: "What type of projects excite you most?",
    options: [
      { id: 'a', text: 'Building web or mobile applications', weight: { developer: 3, designer: 2, analyst: 1 } },
      { id: 'b', text: 'Creating data dashboards and reports', weight: { analyst: 3, developer: 1, designer: 2 } },
      { id: 'c', text: 'Designing user interfaces and prototypes', weight: { designer: 3, developer: 1, analyst: 1 } },
      { id: 'd', text: 'Implementing security measures and protocols', weight: { security: 3, developer: 2, analyst: 2 } }
    ]
  },
  {
    id: 8,
    question: "Which aspect of technology interests you most?",
    options: [
      { id: 'a', text: 'How things work behind the scenes', weight: { developer: 3, analyst: 2, designer: 1 } },
      { id: 'b', text: 'Patterns and trends in information', weight: { analyst: 3, developer: 1, designer: 1 } },
      { id: 'c', text: 'How users interact with technology', weight: { designer: 3, developer: 2, analyst: 1 } },
      { id: 'd', text: 'Potential vulnerabilities and threats', weight: { security: 3, developer: 1, analyst: 2 } }
    ]
  }
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (questionId: number, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const scores = {
      developer: 0,
      analyst: 0,
      designer: 0,
      security: 0
    };

    questions.forEach(question => {
      const selectedAnswer = answers[question.id];
      if (selectedAnswer) {
        const option = question.options.find(opt => opt.id === selectedAnswer);
        if (option) {
          Object.entries(option.weight).forEach(([career, weight]) => {
            if (career in scores) {
              scores[career as keyof typeof scores] += weight;
            }
          });
        }
      }
    });

    // Store results in localStorage and navigate to results page
    localStorage.setItem('quiz_results', JSON.stringify(scores));
    navigate('/results');
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(currentQ.id, option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  answers[currentQ.id] === option.id
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[currentQ.id] === option.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQ.id] === option.id && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={!answers[currentQ.id]}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>{currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}