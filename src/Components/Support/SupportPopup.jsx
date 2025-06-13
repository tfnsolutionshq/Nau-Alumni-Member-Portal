import { useState } from 'react';

const SupportPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred background overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Popup content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#066AAB] text-white rounded-t-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
              <span className="text-[#066AAB] font-bold">IT</span>
            </div>
            <h3 className="text-lg font-medium">IT Support</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">Hi there! How can I help you today?</p>
          
          {/* WhatsApp button */}
          <a 
            href="https://wa.me/+2348063961963" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 13.5723 2.37892 15.05723 3.04884 16.3891L2.01758 21.1211C1.95098 21.3926 2.06161 21.6738 2.29102 21.8535C2.52043 22.0332 2.82618 22.0723 3.09376 21.9551L8.10157 19.5586C9.32422 20.1484 10.6367 20.5 12.001 20.5C17.5239 20.5 22.001 16.0229 22.001 10.5C22.001 4.97715 17.5239 0.5 12.001 0.5C6.47813 0.5 2.00098 4.97715 2.00098 10.5V12Z"/>
            </svg>
            Chat with me on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPopup;