import React, { useState } from 'react';
import axios from 'axios';

function SuggestionPopup({ showSuggestionPopup, setShowSuggestionPopup, suggestionForm, handleSuggestionChange, handleSuggestionSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  if (!showSuggestionPopup) return null;

  const handleSubmit = async () => {
    // Validate required fields
    if (!suggestionForm.comment) {
      setSubmitStatus('error');
      alert('Please fill in the required field');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get bearer token from localStorage
      const token = localStorage.getItem('bearerToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Create FormData
      const formData = new FormData();
      formData.append('comment', suggestionForm.comment);

      // Make API call
      const response = await axios({
        method: 'post',
        url: 'https://unizikalumni-api.tfnsolutions.us/api/suggest',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        data: formData,
        maxBodyLength: Infinity,
      });

      console.log('Suggestion submitted successfully:', response.data);
      setSubmitStatus('success');
      
      // Call the original submit handler if it exists
      if (handleSuggestionSubmit) {
        handleSuggestionSubmit();
      }

      // Close popup after successful submission
      setTimeout(() => {
        setShowSuggestionPopup(false);
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Error submitting suggestion:', error);
      setSubmitStatus('error');
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        alert('Authentication failed. Please login again.');
        // Optionally redirect to login
        window.location.href = 'https://unizikalumni.tfnsolutions.us/login';
      } else if (error.response?.status === 422) {
        alert('Please check your input data and try again.');
      } else {
        alert('Failed to submit suggestion. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl relative">
        <button
          onClick={() => setShowSuggestionPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isSubmitting}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-1">Suggestion box</h2>
          <p className="text-gray-600 mb-6">Proceed to fill in the below information</p>

          {/* Success Message */}
          {submitStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              Suggestion submitted successfully! Thank you for your feedback.
            </div>
          )}

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              Failed to submit suggestion. Please try again.
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-sm">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              name="comment"
              value={suggestionForm.comment}
              onChange={handleSuggestionChange}
              placeholder="Enter your suggestion"
              rows="4"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            ></textarea>
          </div>

          <button
            className={`w-full py-2 rounded-md transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#D15300] hover:bg-orange-600'
            } text-white`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Confirm'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuggestionPopup;
