import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Initializing effect. Calling checkAuthStatus()...');
    checkAuthStatus(); // Initial check on mount

    // Listen for storage changes (when token is set from login page or other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'bearerToken' && e.newValue) {
        console.log('AuthContext: Storage change detected - bearerToken updated. Reloading...');
        // Token was added/updated in localStorage, trigger a reload to re-evaluate auth status
        window.location.reload();
      } else if (e.key === 'bearerToken' && !e.newValue) {
        console.log('AuthContext: Storage change detected - bearerToken removed. Logging out...');
        // Token was removed (e.g., logout in another tab)
        logout(); // Explicitly call logout to clear state
      }
    };

    // Listen for a custom login event (if dispatched by login page directly)
    const handleLoginEvent = (e) => {
      if (e.detail && e.detail.token) {
        console.log('AuthContext: Custom userLoggedIn event received. Processing login and reloading...');
        login(e.detail.token, e.detail.userData);
        // Give a tiny delay before reload to ensure state updates
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLoggedIn', handleLoginEvent); // Assuming 'userLoggedIn' is the custom event name

    return () => {
      // Cleanup event listeners on unmount
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLoggedIn', handleLoginEvent);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const checkAuthStatus = () => {
    console.log('AuthContext: checkAuthStatus function invoked.');
    try {
      const token = localStorage.getItem('bearerToken');
      console.log('AuthContext: checkAuthStatus - retrieved token from localStorage:', token ? 'Exists' : 'Does NOT exist');

      if (token && token.trim() !== '') {
        // Check if this is a fresh token detection and the page hasn't been refreshed yet for it
        const hasRefreshed = sessionStorage.getItem('hasRefreshedForToken');
        
        if (!hasRefreshed) {
          console.log('AuthContext: Token found but no refresh flag. Setting flag and reloading page...');
          // Mark that we're about to refresh for this token to prevent infinite loops
          sessionStorage.setItem('hasRefreshedForToken', 'true');
          // Refresh the page to ensure all components re-initialize with the new auth state
          window.location.reload();
          return; // Stop further execution in this cycle
        }
        
        // Token exists and page has been refreshed, so set user and mark as authenticated
        setUser({ token });
        console.log('AuthContext: checkAuthStatus - User set (authenticated) after refresh.');
      } else {
        // No token found or empty token
        console.log('AuthContext: checkAuthStatus - No valid token found. User set to null (not authenticated).');
        // Clear the refresh flag if no token, so a new login can trigger a fresh reload
        sessionStorage.removeItem('hasRefreshedForToken');
        setUser(null);
      }
    } catch (error) {
      console.error('AuthContext: Auth check failed during checkAuthStatus:', error);
      localStorage.removeItem('bearerToken'); // Clear potentially bad token
      sessionStorage.removeItem('hasRefreshedForToken'); // Clear flag
      setUser(null);
    } finally {
      setLoading(false); // Authentication check process is complete
      console.log('AuthContext: checkAuthStatus - Loading set to false.');
    }
  };

  const login = (token, userData = {}) => {
    console.log('AuthContext: login function invoked.');
    if (token && token.trim() !== '') {
      localStorage.setItem('bearerToken', token);
      // Immediately set the user state here, which will trigger dependent components
      setUser({ token, ...userData }); 
      setLoading(false); // Mark as loaded immediately
      console.log('AuthContext: Login successful. Token saved, user state updated.');
      
      // Explicitly set the refresh flag here too, in case login happens without a full page load first
      sessionStorage.setItem('hasRefreshedForToken', 'true');
    } else {
      console.warn('AuthContext: Login attempted with empty or invalid token. Not setting user.');
    }
  };

  const logout = () => {
    console.log('AuthContext: logout function invoked. Clearing storage and state.');
    localStorage.removeItem('bearerToken');
    sessionStorage.removeItem('hasRefreshedForToken'); // Clear the refresh flag on logout
    setUser(null);
    console.log('AuthContext: User logged out. Redirecting to login...');
    window.location.href = 'https://unizikalumni.tfnsolutions.us//login'; // Redirect after clearing
  };

  // Handle login from external source (e.g., a separate login page)
  const handleExternalLogin = (token, userData = {}) => {
    console.log('AuthContext: handleExternalLogin invoked.');
    login(token, userData); // Use the internal login function
    // The reload is handled by checkAuthStatus via the storage event or the direct login call
    // For an external login flow, the window.location.reload()
    // inside the handleLoginEvent (if a custom event is dispatched) or
    // the storage event listener in checkAuthStatus should handle the reload.
    // Explicitly adding a timeout-based reload here ensures it.
    console.log('AuthContext: handleExternalLogin - triggering page reload after a short delay.');
    setTimeout(() => {
        window.location.reload();
    }, 100);
  };

  const authValue = {
    user,
    token: user ? user.token : null, // Ensure token is derived from user state
    isAuthenticated: !!user && !!user.token, // True if user object and token exist
    loading, // Is AuthContext still loading its initial state?
    login,
    logout,
    handleExternalLogin,
  };

  console.log('AuthContext: Current auth state provided by context:', {
    userStatus: authValue.user ? 'Exists' : 'Null',
    tokenStatus: authValue.token ? 'Exists' : 'Null',
    isAuthenticated: authValue.isAuthenticated,
    loading: authValue.loading,
  });

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
