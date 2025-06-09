import React from 'react';

function DonationPopup({ showDonationPopup, setShowDonationPopup, selectedCurrency, setSelectedCurrency, donationAmount, setDonationAmount, handleDonationSubmit }) {
  if (!showDonationPopup) return null;

  return (
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
  );
}

export default DonationPopup;