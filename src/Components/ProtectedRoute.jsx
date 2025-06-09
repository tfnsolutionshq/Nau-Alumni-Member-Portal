import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, handleExternalLogin } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  const [processingLogin, setProcessingLogin] = useState(false);

  useEffect(() => {
    // Check for token in URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    const userDataFromUrl = urlParams.get('userData');
    
    if (tokenFromUrl && !processingLogin) {
      setProcessingLogin(true);
      
      try {
        const userData = userDataFromUrl ? JSON.parse(decodeURIComponent(userDataFromUrl)) : {};
        
        // Handle the external login
        handleExternalLogin(tokenFromUrl, userData);
        
        // Clean up URL parameters
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
        
      } catch (error) {
        console.error('Error processing login from URL:', error);
        setRedirecting(true);
        window.location.href = 'https://unizikalumni.tfnsolutions.us//login';
      }
      return;
    }

    // If not authenticated, not loading, and no token processing, redirect to login
    if (!loading && !isAuthenticated && !redirecting && !processingLogin) {
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = 'https://unizikalumni.tfnsolutions.us//login';
      }, 100);
    }
  }, [isAuthenticated, loading, redirecting, processingLogin, handleExternalLogin]);

  if (loading || processingLogin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-instrument">
            {processingLogin ? 'Processing login...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  if (redirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-instrument">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
