// This utility can be used to handle login from the external login page
export const handleLoginSuccess = (token, userData = {}) => {
  // Store token
  localStorage.setItem('bearerToken', token);
  
  // Dispatch custom event to notify the app
  window.dispatchEvent(new CustomEvent('userLoggedIn', {
    detail: { token, userData }
  }));
  
  // Redirect to dashboard
  window.location.href = window.location.origin;
};

// Function to check if user is coming from login
export const checkLoginRedirect = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userData = urlParams.get('userData');
  
  if (token) {
    handleLoginSuccess(token, userData ? JSON.parse(decodeURIComponent(userData)) : {});
    return true;
  }
  return false;
};