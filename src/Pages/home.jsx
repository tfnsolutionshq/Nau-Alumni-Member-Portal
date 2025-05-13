
import { useState, useEffect } from 'react';
import DashboardLayout from '../Components/Layout/DashboardLayout';
import QuestionnairePopup from '../Components/Questionnaire/QuestionnairePopup';

function Home() {
  const [userName, setUserName] = useState('Adeola');
  const [showMembershipPopup, setShowMembershipPopup] = useState(false);
  const [showSuggestionPopup, setShowSuggestionPopup] = useState(false);
  const [showDonationPopup, setShowDonationPopup] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [showQuestionnaire, setShowQuestionnaire] = useState(true);
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState({});
  const [suggestionForm, setSuggestionForm] = useState({
    name: '',
    email: '',
    contactNumber: '',
    comment: ''
  });
  
  // Check if user has already completed the questionnaire
  // useEffect(() => {
  //   // Get stored questionnaire data
  //   const hasCompletedQuestionnaire = localStorage.getItem('hasCompletedQuestionnaire');
  //   const storedAnswers = localStorage.getItem('questionnaireAnswers');
    
  //   // If there are stored answers, parse them
  //   if (storedAnswers) {
  //     setQuestionnaireAnswers(JSON.parse(storedAnswers));
  //   }
    
  //   // Show questionnaire on page reload unless explicitly marked as completed
  //   if (hasCompletedQuestionnaire === 'true') {
  //     setShowQuestionnaire(false);
  //   } else {
  //     setShowQuestionnaire(true);
  //   }
  // }, []);

  const handleSuggestionChange = (e) => {
    const { name, value } = e.target;
    setSuggestionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSuggestionSubmit = () => {
    console.log('Suggestion submitted:', suggestionForm);
    setShowSuggestionPopup(false);
    setSuggestionForm({
      name: '',
      email: '',
      contactNumber: '',
      comment: ''
    });
  };

  const handleDonationSubmit = () => {
    console.log('Donation submitted:', { currency: selectedCurrency, amount: donationAmount });
    setShowDonationPopup(false);
    setSelectedCurrency('');
    setDonationAmount('');
  };
  
  // Handle questionnaire completion
  const handleQuestionnaireComplete = (answers) => {
    console.log('Questionnaire completed:', answers);
    setQuestionnaireAnswers(answers);
    setShowQuestionnaire(false);
    // Store both completion status and answers in localStorage
    localStorage.setItem('hasCompletedQuestionnaire', 'true');
    localStorage.setItem('questionnaireAnswers', JSON.stringify(answers));
  };

  return (
    <DashboardLayout>
      <div className="p-6 font-instrument">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl">Welcome, <span className='text-2xl font-bold'>{userName}</span></h1>
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-sm font-medium">Membership Status</div>
            <div className="mr-2 text-[#B93815] p-1 rounded bg-[#FBF0E9] text-sm">• Not Confirmed</div>
            <button 
              onClick={() => setShowMembershipPopup(true)}
              className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm flex items-center"
            >
              Pay Now
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Banner Section */}
        <div className="bg-gray-200 h-56 rounded-lg mb-6 flex items-center justify-center">
          <p className="text-gray-500">Banner Content</p>
        </div>

        {/* Boxes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
          {/* Suggestion Box */}
          <div 
            onClick={() => setShowSuggestionPopup(true)}
            className="bg-[#F8E5D9] p-8 rounded-lg flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-orange-600 font-semibold text-xl">Suggestion Box</h2>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#D15300]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>

          {/* Donation Box */}
          <div 
            onClick={() => setShowDonationPopup(true)}
            className="bg-[#BCCFDC] p-8 rounded-lg flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-[#20608B] font-semibold text-xl">Donation Box</h2>
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#20608B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Programs & News Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Alumni Programs & Events */}
          <div>
            <h2 className="text-xs font-semibold pt-3 uppercase mb-2 border-t-2 border-orange-500 pb-1">Alumni Programs & Events</h2>
            <div className="flex flex-col h-full">
              <h3 className="font-medium text-base mb-1">Alumni Reunion Reboot 2.0 (Lagos Chapter)</h3>
              <p className="text-gray-600 text-sm mb-2 mt-1">
              Post Graduate Studies: The Important factor to bear in mind Post Graduate Studies: The Important factor to bear in mindPost Graduate Studies: The Important factor to bear in mind
              </p>
              <hr className="my-2" />
              <div className="mt-3">
                <p className="text-black font-semibold text-lg mb-1">Lagos, Nigeria</p>
                <p className="text-gray-500 text-sm mb-4">17 Jan, 2024 | 12:00PM</p>
                <div className="flex gap-2">
                  <button className="border border-gray-300 p-1 hover:bg-gray-100">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                    </svg>
                  </button>
                  <button className="border border-gray-300 p-1 hover:bg-gray-100">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* News for Alumni */}
          <div>
            <h2 className="text-xs font-semibold uppercase mb-2 border-t-2 border-orange-500 pb-1 pt-2">News for Alumni</h2>
            <div className="flex flex-col gap-4">
              {/* News Item 1 */}
              <div className="flex mt-2 gap-3 items-start">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=80&h=80" alt="news" className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="font-medium text-base leading-tight mb-1">Tips: How to secure Transcript for Intl Purpose</h3>
                  <p className="text-gray-500 text-xs">17 JUNE 2020</p>
                </div>
              </div>
              {/* News Item 2 */}
              <div className="flex gap-3 items-start">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=80&h=80" alt="news" className="w-16 h-16 object-cover" />
                <div>
                  <h3 className="font-medium text-base leading-tight mb-1">Post Graduate Studies: The Important factor to bear in...</h3>
                  <p className="text-gray-500 text-xs">17 JUNE 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Registration Fee Popup */}
      {showMembershipPopup && (
        <div className="fixed font-instrument inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl relative">
            <button 
              onClick={() => setShowMembershipPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-1">Membership Registration Fee</h2>
              <p className="text-gray-600 text-base mb-6">Proceed to fill in the below information</p>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">What currency would you love to Pay in?</label>
                <div className="relative">
                  <select 
                    className="w-full p-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <option value="" disabled>Select currency</option>
                    <option value="NGN">Nigerian Naira (NGN)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-2">Amount to Pay</label>
                <input 
                  type="text" 
                  value="₦5,000.00"
                  disabled
                  className="w-full p-2 border rounded-md bg-gray-100"
                />
              </div>
              
              <button 
                className="w-full bg-[#D15300] text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                onClick={() => setShowMembershipPopup(false)}
              >
                Proceed to Pay
              </button>
              
              <p className="text-center text-gray-600 text-sm mt-4">
                This is a one time payment which applies for all chapter. Once paid, Membership Status will be Confirmed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Suggestion Box Popup */}
      {showSuggestionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl relative">
            <button 
              onClick={() => setShowSuggestionPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-1">Suggestion box</h2>
              <p className="text-gray-600 mb-6">Proceed to fill in the below information</p>
              
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={suggestionForm.name}
                  onChange={handleSuggestionChange}
                  placeholder="Uche ThankGod"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-gray-700 mb-1 text-sm">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={suggestionForm.email}
                  onChange={handleSuggestionChange}
                  placeholder="dgreatuc@gmail.com"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-gray-700 mb-1 text-sm">Contact Number</label>
                <input 
                  type="tel" 
                  name="contactNumber"
                  value={suggestionForm.contactNumber}
                  onChange={handleSuggestionChange}
                  placeholder="+234 706 979 0950"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">Comment</label>
                <textarea 
                  name="comment"
                  value={suggestionForm.comment}
                  onChange={handleSuggestionChange}
                  placeholder="Enter your suggestion"
                  rows="4"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <button 
                className="w-full bg-[#D15300] text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                onClick={handleSuggestionSubmit}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donation Box Popup */}
      {showDonationPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl relative">
            <button 
              onClick={() => setShowDonationPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-1">Thank you for your interest to donate to this cause as an 'anonymous participant'</h2>
              <p className="text-gray-600 mb-6">Proceed to fill in the below information</p>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">What currency would you love to donate in?</label>
                <div className="relative">
                  <select 
                    className="w-full p-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <option value="" disabled>Select currency</option>
                    <option value="NGN">Nigerian Naira (NGN)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-1 text-sm">How much do you want to Donate?</label>
                <input 
                  type="text" 
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button 
                className="w-full bg-[#D15300] text-white py-2 rounded-md hover:bg-orange-600 transition-colors"
                onClick={handleDonationSubmit}
              >
                Proceed to Donate
              </button>
              
              <p className="text-center text-gray-600 text-sm mt-4">
                This donation is completely anonymous and your identity will not be disclosed to the public
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Questionnaire Popup */}
      {showQuestionnaire && (
        <QuestionnairePopup onComplete={handleQuestionnaireComplete} />
      )}
    </DashboardLayout>
  );
}

export default Home;