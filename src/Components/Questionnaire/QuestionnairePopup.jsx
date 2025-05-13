import { useState, useEffect } from 'react';

const QuestionnairePopup = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [completed, setCompleted] = useState(false);
  
  // Load previous answer for current question if exists
  useEffect(() => {
    if (answers[currentStep]) {
      setInputValue(answers[currentStep]);
    } else {
      setInputValue('');
    }
  }, [currentStep, answers]);

  // Questions data
  const questions = [
    {
      id: 1,
      question: 'Who was your favorite lecturer back in school, and why?',
      placeholder: 'Type your answer here...'
    },
    {
      id: 2,
      question: 'What course or subject did you enjoy the most – and what made it special for you?',
      placeholder: 'Type your answer here...'
    },
    {
      id: 3,
      question: 'Describe your most memorable school experience in one sentence.',
      placeholder: 'Type your answer here...'
    },
    {
      id: 4,
      question: 'If you could go back and change one thing about your time in school, what would it be?',
      placeholder: 'Type your answer here...'
    },
    {
      id: 5,
      question: 'What skill or lesson from school has helped you the most in your current journey?',
      placeholder: 'Type your answer here...'
    }
  ];

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle next button click
  const handleNext = () => {
    if (inputValue.trim() === '') return;

    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentStep]: inputValue
    }));

    // Move to next question or complete
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
      // After 2 seconds, close the questionnaire
      setTimeout(() => {
        setShowQuestionnaire(false);
        if (onComplete) {
          onComplete(answers);
        }
      }, 2000);
    }
  };
  
  // Handle previous button click
  const handlePrevious = () => {
    if (currentStep > 1) {
      // Save current answer before going back
      if (inputValue.trim() !== '') {
        setAnswers(prev => ({
          ...prev,
          [currentStep]: inputValue
        }));
      }
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle skip button click
  const handleSkip = () => {
    // Skip current question without saving answer
    if (currentStep < questions.length) {
      // Remove answer for current question if it exists
      const updatedAnswers = { ...answers };
      delete updatedAnswers[currentStep];
      setAnswers(updatedAnswers);
      
      setCurrentStep(prev => prev + 1);
    } else {
      setCompleted(true);
      setTimeout(() => {
        setShowQuestionnaire(false);
        if (onComplete) {
          onComplete(answers);
        }
      }, 2000);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      handleNext();
    }
  };

  // If questionnaire is closed, don't render anything
  if (!showQuestionnaire) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-instrument">
      <div className="bg-white rounded-lg w-full max-w-xl mx-4 relative overflow-hidden">
        {!completed ? (
          <>
            {/* Progress indicator */}
            <div className="w-full bg-gray-200 h-1">
              <div 
                className="bg-[#D15300] h-1 transition-all duration-300" 
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="p-6">
              {/* Step indicator */}
              <div className='flex items-center justify-between mb-4'>
                {/* Question title */}
              <h2 className="text-xl font-semibold">Quick Survey</h2>
              <div className="text-sm text-gray-500">
                {currentStep} of {questions.length}
              </div>

              
              </div>

              {/* Current question */}
              <div className="mb-6">
                <p className="text-gray-800 mb-4">{questions[currentStep - 1].question}</p>
                <textarea
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={questions[currentStep - 1].placeholder}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D15300] min-h-[100px]"
                  rows="3"
                ></textarea>
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Skip
                </button>
                <div className="flex space-x-2">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevious}
                      className="px-2 bg-[#D15300] text-white py-2 rounded-md border border-gray-300 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={inputValue.trim() === ''}
                    className={`px-4 py-2 rounded-md ${inputValue.trim() === '' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#D15300] text-white hover:bg-orange-600'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">You're all set</h2>
            <p className="text-gray-600 mb-4">Welcome to the Alumni Association Portal. Feel free to explore all key features as promised.</p>
            <button 
              onClick={() => {
                setShowQuestionnaire(false);
                if (onComplete) {
                  onComplete(answers);
                }
              }}
              className="text-sm p-2 rounded w-full bg-[#EEEEEE] text-gray-800 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionnairePopup;