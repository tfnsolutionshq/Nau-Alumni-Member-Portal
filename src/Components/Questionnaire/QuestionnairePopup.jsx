// "use client"

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../contexts/AuthContext'; // Assuming AuthContext path

// const SurveyPopup = ({ show, onClose, surveyData, onSurveySubmitted }) => {
//   const { token, isAuthenticated, loading: authLoading } = useAuth();
//   const [userResponse, setUserResponse] = useState('');
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [showCompletionMessage, setShowCompletionMessage] = useState(false); // To show final success

//   // Reset form when survey data changes or popup opens
//   useEffect(() => {
//     if (show && surveyData) {
//       setUserResponse('');
//       setError(null);
//       setSuccess(false);
//       setShowCompletionMessage(false); // Hide completion message on new question
//     }
//   }, [show, surveyData]);

//   // Handle input change
//   const handleInputChange = (e) => {
//     setUserResponse(e.target.value);
//   };

//   // Handle survey response submission
//   const handleSubmitResponse = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(false);

//     if (!userResponse.trim()) {
//       setError("Please provide a response.");
//       return;
//     }
//     if (!surveyData || !surveyData.id) {
//       setError("No survey question available.");
//       return;
//     }
//     if (!isAuthenticated || !token) {
//       setError("You must be logged in to submit a survey response.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const data = JSON.stringify({
//         "survey_id": surveyData.id,
//         "response": userResponse
//       });
//       const config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'https://unizikalumni-api.tfnsolutions.us/api/survey/respond',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         data: data
//       };
//       const response = await axios.request(config);
//       if (response.data && response.data.data) {
//         setSuccess(true);
//         // Show success message briefly, then trigger parent callback
//         setShowCompletionMessage(true); 
//         setTimeout(() => {
//           onSurveySubmitted(surveyData.id); // Notify parent component that this survey is answered
//           setShowCompletionMessage(false); // Hide it for next question
//           onClose(); // Request closing of the popup after successful submission and parent callback
//         }, 1500); // Display success for 1.5 seconds
//       } else {
//         setError("Failed to submit response: Invalid response.");
//       }
//     } catch (err) {
//       console.error("Error submitting survey response:", err);
//       if (err.response?.status === 401) {
//         setError("Authentication failed. Please log in again.");
//       } else if (err.response?.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Failed to submit response. Please try again.");
//       }
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // If popup is not set to show, or no survey data provided, don't render
//   if (!show || !surveyData) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 font-instrument">
//       <div className="bg-white rounded-lg w-full max-w-md mx-4 relative overflow-hidden">
//         {!showCompletionMessage ? ( // Show question form unless completion message is active
//           <>
//             <div className="p-6">
//               <div className='flex items-center justify-between mb-4'>
//                 <h2 className="text-xl font-semibold text-orange-600">Quick Survey</h2>
//                 <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Current question */}
//               <div className="mb-6">
//                 <p className="text-gray-800 text-lg mb-4">{surveyData.question}</p>
//                 <textarea
//                   value={userResponse}
//                   onChange={handleInputChange}
//                   placeholder="Type your answer here..."
//                   className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[100px] resize-y"
//                   rows="3"
//                   disabled={submitting}
//                 ></textarea>
//               </div>

//               {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mb-4 text-sm" role="alert">
//                   {error}
//                 </div>
//               )}

//               {/* Navigation buttons */}
//               <div className="flex justify-end items-center space-x-2">
//                 <button
//                   type="button"
//                   onClick={onClose} // Allows user to close without answering
//                   className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md disabled:opacity-50"
//                   disabled={submitting}
//                 >
//                   Close
//                 </button>
//                 <button
//                   onClick={handleSubmitResponse}
//                   disabled={userResponse.trim() === '' || submitting || authLoading || !isAuthenticated}
//                   className={`px-4 py-2 rounded-md ${userResponse.trim() === '' || submitting || authLoading || !isAuthenticated ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
//                 >
//                   {submitting ? "Submitting..." : "Submit Response"}
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : ( // Completion message screen
//           <div className="p-8 text-center">
//             <div className="flex justify-center mb-4">
//               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//             </div>
//             <h2 className="text-xl font-semibold mb-2">Response Submitted!</h2>
//             <p className="text-gray-600 mb-4">Thank you for your feedback.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SurveyPopup;











"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../contexts/AuthContext"

const AllSurveysPopup = ({ show, onClose, onComplete, surveysData }) => {
  const { token, isAuthenticated, loading: authLoading } = useAuth()
  const [responses, setResponses] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(0) // Track which survey is currently visible
  const [completedSurveys, setCompletedSurveys] = useState(new Set())
  const [showFinalSuccess, setShowFinalSuccess] = useState(false)

  // Initialize responses object when surveys data changes
  useEffect(() => {
    if (show && surveysData && surveysData.length > 0) {
      const initialResponses = {}
      surveysData.forEach((survey) => {
        initialResponses[survey.id] = ""
      })
      setResponses(initialResponses)
      setError(null)
      setSuccess(false)
      setCurrentStep(0)
      setCompletedSurveys(new Set())
      setShowFinalSuccess(false)
    }
  }, [show, surveysData])

  // Handle input change for specific survey
  const handleResponseChange = (surveyId, value) => {
    setResponses((prev) => ({
      ...prev,
      [surveyId]: value,
    }))
  }

  // Handle individual survey submission
  const handleSurveySubmit = async (surveyId) => {
    const response = responses[surveyId]

    if (!response.trim()) {
      setError("Please provide a response before continuing.")
      return
    }

    if (!isAuthenticated || !token) {
      setError("You must be logged in to submit survey responses.")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const data = JSON.stringify({
        survey_id: surveyId,
        response: response,
      })

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/survey/respond",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const apiResponse = await axios.request(config)

      if (apiResponse.data && apiResponse.data.data) {
        // Mark this survey as completed
        setCompletedSurveys((prev) => new Set([...prev, surveyId]))

        // Move to next survey or complete all
        if (currentStep < surveysData.length - 1) {
          setCurrentStep((prev) => prev + 1)
        } else {
          // All surveys completed
          setShowFinalSuccess(true)
          setTimeout(() => {
            onComplete()
          }, 2000)
        }
      } else {
        setError("Failed to submit response: Invalid response.")
      }
    } catch (err) {
      console.error("Error submitting survey response:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError("Failed to submit response. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  // Handle going back to previous survey
  const handlePreviousSurvey = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setError(null)
    }
  }

  // Handle skipping to next survey without submitting
  const handleSkipSurvey = () => {
    if (currentStep < surveysData.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setError(null)
    } else {
      // If skipping the last survey, just close
      onClose()
    }
  }

  // Submit all remaining surveys at once
  const handleSubmitAll = async () => {
    const uncompletedSurveys = surveysData.filter((survey) => !completedSurveys.has(survey.id))
    const surveysWithResponses = uncompletedSurveys.filter((survey) => responses[survey.id]?.trim())

    if (surveysWithResponses.length === 0) {
      setError("Please provide responses to at least one survey before submitting all.")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      // Submit all surveys with responses
      const submitPromises = surveysWithResponses.map((survey) => {
        const data = JSON.stringify({
          survey_id: survey.id,
          response: responses[survey.id],
        })

        return axios.request({
          method: "post",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/survey/respond",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: data,
        })
      })

      await Promise.all(submitPromises)

      // Mark all submitted surveys as completed
      const newCompleted = new Set([...completedSurveys])
      surveysWithResponses.forEach((survey) => newCompleted.add(survey.id))
      setCompletedSurveys(newCompleted)

      setShowFinalSuccess(true)
      setTimeout(() => {
        onComplete()
      }, 2000)
    } catch (err) {
      console.error("Error submitting all survey responses:", err)
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log in again.")
      } else {
        setError("Failed to submit some responses. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (!show || !surveysData || surveysData.length === 0) return null

  const currentSurvey = surveysData[currentStep]
  const isLastSurvey = currentStep === surveysData.length - 1
  const hasResponse = responses[currentSurvey?.id]?.trim()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 font-instrument">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {!showFinalSuccess ? (
          <>
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-orange-600">Alumni Survey</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Question {currentStep + 1} of {surveysData.length}
                  </p>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / surveysData.length) * 100}%` }}
                ></div>
              </div>

              {/* Current Survey Question */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-medium text-gray-900 flex-1">{currentSurvey?.question}</h3>
                  {completedSurveys.has(currentSurvey?.id) && (
                    <div className="flex items-center text-green-600 ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">Completed</span>
                    </div>
                  )}
                </div>

                <textarea
                  value={responses[currentSurvey?.id] || ""}
                  onChange={(e) => handleResponseChange(currentSurvey?.id, e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px] resize-y"
                  rows="4"
                  disabled={submitting || completedSurveys.has(currentSurvey?.id)}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative mb-4 text-sm"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* Navigation and Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
                {/* Left side - Previous button */}
                <div className="flex space-x-2">
                  {currentStep > 0 && (
                    <button
                      onClick={handlePreviousSurvey}
                      disabled={submitting}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                  )}
                </div>

                {/* Right side - Action buttons */}
                <div className="flex space-x-2">
                  {!completedSurveys.has(currentSurvey?.id) && (
                    <>
                      <button
                        onClick={handleSkipSurvey}
                        disabled={submitting}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md disabled:opacity-50"
                      >
                        Skip
                      </button>

                      <button
                        onClick={() => handleSurveySubmit(currentSurvey?.id)}
                        disabled={!hasResponse || submitting || authLoading || !isAuthenticated}
                        className={`px-4 py-2 rounded-md ${
                          !hasResponse || submitting || authLoading || !isAuthenticated
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-orange-500 text-white hover:bg-orange-600"
                        }`}
                      >
                        {submitting ? "Submitting..." : isLastSurvey ? "Submit & Finish" : "Submit & Next"}
                      </button>
                    </>
                  )}

                  {completedSurveys.has(currentSurvey?.id) && !isLastSurvey && (
                    <button
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                    >
                      Next Question
                    </button>
                  )}

                  {completedSurveys.has(currentSurvey?.id) && isLastSurvey && (
                    <button
                      onClick={onComplete}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Complete Survey
                    </button>
                  )}
                </div>
              </div>

              {/* Submit All Button - Show if there are multiple surveys and user has answered some */}
              {/* {surveysData.length > 1 && Object.values(responses).some((response) => response.trim()) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleSubmitAll}
                    disabled={submitting}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                  >
                    {submitting ? "Submitting All..." : "Submit All Answered Questions"}
                  </button>
                </div>
              )} */}

              {/* Survey Overview */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Survey Progress:</h4>
                <div className="flex flex-wrap gap-2">
                  {surveysData.map((survey, index) => (
                    <button
                      key={survey.id}
                      onClick={() => setCurrentStep(index)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        index === currentStep
                          ? "bg-orange-500 text-white"
                          : completedSurveys.has(survey.id)
                            ? "bg-green-100 text-green-800"
                            : responses[survey.id]?.trim()
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {index + 1}
                      {completedSurveys.has(survey.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 inline ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Final Success Screen
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Survey Completed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for completing the alumni survey. Your responses have been submitted successfully.
            </p>
            <div className="text-sm text-gray-500">
              Completed {completedSurveys.size} of {surveysData.length} questions
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllSurveysPopup
