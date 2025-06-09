"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'; // Assuming AuthContext path

const SurveyPopup = ({ show, onClose, surveyData, onSurveySubmitted }) => {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const [userResponse, setUserResponse] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false); // To show final success

  // Reset form when survey data changes or popup opens
  useEffect(() => {
    if (show && surveyData) {
      setUserResponse('');
      setError(null);
      setSuccess(false);
      setShowCompletionMessage(false); // Hide completion message on new question
    }
  }, [show, surveyData]);

  // Handle input change
  const handleInputChange = (e) => {
    setUserResponse(e.target.value);
  };

  // Handle survey response submission
  const handleSubmitResponse = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!userResponse.trim()) {
      setError("Please provide a response.");
      return;
    }
    if (!surveyData || !surveyData.id) {
      setError("No survey question available.");
      return;
    }
    if (!isAuthenticated || !token) {
      setError("You must be logged in to submit a survey response.");
      return;
    }

    setSubmitting(true);
    try {
      const data = JSON.stringify({
        "survey_id": surveyData.id,
        "response": userResponse
      });
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://unizikalumni-api.tfnsolutions.us/api/survey/respond',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: data
      };
      const response = await axios.request(config);
      if (response.data && response.data.data) {
        setSuccess(true);
        // Show success message briefly, then trigger parent callback
        setShowCompletionMessage(true); 
        setTimeout(() => {
          onSurveySubmitted(surveyData.id); // Notify parent component that this survey is answered
          setShowCompletionMessage(false); // Hide it for next question
          onClose(); // Request closing of the popup after successful submission and parent callback
        }, 1500); // Display success for 1.5 seconds
      } else {
        setError("Failed to submit response: Invalid response.");
      }
    } catch (err) {
      console.error("Error submitting survey response:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to submit response. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  // If popup is not set to show, or no survey data provided, don't render
  if (!show || !surveyData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 font-instrument">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
        {!showCompletionMessage ? ( // Show question form unless completion message is active
          <>
            <div className="p-6">
              <div className='flex items-center justify-between mb-4'>
                <h2 className="text-xl font-semibold text-orange-600">Quick Survey</h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Current question */}
              <div className="mb-6">
                <p className="text-gray-800 text-lg mb-4">{surveyData.question}</p>
                <textarea
                  value={userResponse}
                  onChange={handleInputChange}
                  placeholder="Type your answer here..."
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px] resize-y"
                  rows="3"
                  disabled={submitting}
                ></textarea>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mb-4 text-sm" role="alert">
                  {error}
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-end items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose} // Allows user to close without answering
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md disabled:opacity-50"
                  disabled={submitting}
                >
                  Close
                </button>
                <button
                  onClick={handleSubmitResponse}
                  disabled={userResponse.trim() === '' || submitting || authLoading || !isAuthenticated}
                  className={`px-4 py-2 rounded-md ${userResponse.trim() === '' || submitting || authLoading || !isAuthenticated ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                >
                  {submitting ? "Submitting..." : "Submit Response"}
                </button>
              </div>
            </div>
          </>
        ) : ( // Completion message screen
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Response Submitted!</h2>
            <p className="text-gray-600 mb-4">Thank you for your feedback.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPopup;
