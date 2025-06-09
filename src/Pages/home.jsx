"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "../Components/Layout/DashboardLayout"
import QuestionnairePopup from "../Components/Questionnaire/QuestionnairePopup"
import MembershipPopup from "../Components/Popups/Membership-Popup"
import SuggestionPopup from "../Components/Popups/Suggestion-Popup"
import DonationPopup from "../Components/Popups/Donation-Popup"
import SurveyPopup from "../Components/Questionnaire/QuestionnairePopup" // Import the new SurveyPopup
import { Link } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../contexts/AuthContext"

function Home() {
  const [userName, setUserName] = useState("") // Initialize as empty string
  const [userDetails, setUserDetails] = useState(null)
  const [showMembershipPopup, setShowMembershipPopup] = useState(false)
  const [showSuggestionPopup, setShowSuggestionPopup] = useState(false)
  const [showDonationPopup, setShowDonationPopup] = useState(false)
  const [selectedCurrency, setSelectedCurrency] = useState("")
  const [donationAmount, setDonationAmount] = useState("")
  const [showQuestionnaire, setShowQuestionnaire] = useState(false) // Controlled by specific logic

  // States for API data
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])
  const [currentEventIndex, setCurrentEventIndex] = useState(0) // For events in the "Programs & Events" section
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0) // For banner carousel
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [loadingNews, setLoadingNews] = useState(true)
  const [errorEvents, setErrorEvents] = useState(null)
  const [errorNews, setErrorNews] = useState(null)

  // States for User Survey Popup and sequential display
  const [unansweredSurveys, setUnansweredSurveys] = useState([]) // Surveys user still needs to answer (from API)
  const [currentSurveyToDisplay, setCurrentSurveyToDisplay] = useState(null) // The survey currently in the popup
  const [showUserSurveyPopup, setShowUserSurveyPopup] = useState(false)
  const [loadingUserSurveyLogic, setLoadingUserSurveyLogic] = useState(true) // Tracks initial survey load
  const [errorUserSurvey, setErrorUserSurvey] = useState(null)
  const [loadingUserDetails, setLoadingUserDetails] = useState(true)

  const [suggestionForm, setSuggestionForm] = useState({
    name: "",
    email: "",
    contactNumber: "",
    comment: "",
  })

  const { token, isAuthenticated, loading: authLoading, user: authUser } = useAuth()

  // Fetch user details from /my-details endpoint
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authLoading || !isAuthenticated || !token) {
        setLoadingUserDetails(false)
        setUserName("Guest") // Set to guest if not authenticated
        return
      }

      try {
        setLoadingUserDetails(true)
        const config = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/my-details",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.request(config)

        // Updated to match new API response structure
        if (response.data && response.data.data) {
          const memberData = response.data.data
          setUserDetails(memberData)
          setUserName(memberData.first_name || "User") // Set first_name
        } else {
          // Log the actual response data if it doesn't match expected format
          console.error("Invalid user details response format or no member data. Actual response:", response.data)
          setUserName("User") // Fallback if data format is unexpected
        }
      } catch (err) {
        console.error("Error fetching user details:", err)
        if (err.response) {
          // Log specific error response from the server
          console.error("API error response for user details:", err.response.data)
          console.error("API error status:", err.response.status)
        } else if (err.request) {
          // The request was made but no response was received
          console.error("No response received for user details API:", err.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Request setup error for user details:", err.message)
        }
        setUserName("User") // Fallback on error
      } finally {
        setLoadingUserDetails(false)
      }
    }

    fetchUserDetails()
  }, [authLoading, isAuthenticated, token])

  // Set initial username based on userDetails once loaded
  useEffect(() => {
    if (userDetails?.first_name) {
      setUserName(userDetails.first_name)
    } else {
      setUserName("User") // Default if no first_name
    }

    // Original questionnaire logic
    const hasCompletedOriginalQuestionnaire = localStorage.getItem("hasCompletedQuestionnaire")
    if (hasCompletedOriginalQuestionnaire === "true") {
      setShowQuestionnaire(false)
    } else {
      setShowQuestionnaire(true)
    }
  }, [userDetails])

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoadingEvents(true)
        setErrorEvents(null)
        const config = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/events",
          headers: {
            Accept: "application/json",
          },
        }
        const response = await axios.request(config)
        if (response.data && Array.isArray(response.data.data)) {
          setEvents(response.data.data)
        } else if (Array.isArray(response.data)) {
          setEvents(response.data)
        } else {
          setEvents([])
          setErrorEvents("Invalid event data format.")
        }
      } catch (err) {
        console.error("Error fetching events:", err)
        setErrorEvents("Failed to load events. Please try again.")
      } finally {
        setLoadingEvents(false)
      }
    }

    fetchEvents()
  }, [])

  // Fetch News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true)
        setErrorNews(null)
        const config = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/news",
          headers: {
            Accept: "application/json",
          },
        }
        const response = await axios.request(config)
        if (response.data && Array.isArray(response.data.data)) {
          const latestNews = response.data.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3)
          setNews(latestNews)
        } else if (Array.isArray(response.data)) {
          const latestNews = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3)
          setNews(latestNews)
        } else {
          setNews([])
          setErrorNews("Invalid news data format.")
        }
      } catch (err) {
        console.error("Error fetching news:", err)
        setErrorNews("Failed to load news. Please try again.")
      } finally {
        setLoadingNews(false)
      }
    }

    fetchNews()
  }, [])

  // Fetch unanswered surveys for user from the specific API endpoint
  useEffect(() => {
    const fetchUnansweredSurveys = async () => {
      setLoadingUserSurveyLogic(true)
      setErrorUserSurvey(null)

      // Only proceed if authentication status is determined, user is authenticated, and user details are loaded
      if (authLoading || !isAuthenticated || !token || !userDetails?.id || loadingUserDetails) {
        setLoadingUserSurveyLogic(false)
        return
      }

      const currentMemberId = userDetails.id

      try {
        // Prepare request data with member_id as query parameter
        const config = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: `https://unizikalumni-api.tfnsolutions.us/api/surveys?member_id=${currentMemberId}`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await axios.request(config)

        if (response.data && Array.isArray(response.data.data)) {
          const surveys = response.data.data
          setUnansweredSurveys(surveys)

          if (surveys.length > 0) {
            // Set the first unanswered survey to display
            setCurrentSurveyToDisplay(surveys[0])
            setShowUserSurveyPopup(true)
          } else {
            // No unanswered surveys, keep popup closed
            setShowUserSurveyPopup(false)
            setCurrentSurveyToDisplay(null)
          }
        } else {
          console.log("No unanswered surveys available or invalid format.")
          setUnansweredSurveys([])
          setShowUserSurveyPopup(false)
          setCurrentSurveyToDisplay(null)
        }
      } catch (err) {
        console.error("Error fetching unanswered surveys:", err)
        // Only set error if it's not an auth issue
        if (err.response?.status !== 401) {
          setErrorUserSurvey("Failed to load surveys. Please try again.")
        }
        setUnansweredSurveys([])
        setShowUserSurveyPopup(false)
        setCurrentSurveyToDisplay(null)
      } finally {
        setLoadingUserSurveyLogic(false)
      }
    }

    // Trigger survey loading only when user details are available
    if (!authLoading && isAuthenticated && token && userDetails?.id && !loadingUserDetails) {
      fetchUnansweredSurveys()
    }
  }, [authLoading, isAuthenticated, token, userDetails, loadingUserDetails])

  // Callback from SurveyPopup when user submits a response
  const handleUserSurveySubmitted = (surveyId) => {
    console.log(`User submitted response for survey: ${surveyId}`)

    // Remove the answered survey from the local unanswered list
    const updatedUnanswered = unansweredSurveys.filter((survey) => survey.id !== surveyId)
    setUnansweredSurveys(updatedUnanswered)

    if (updatedUnanswered.length > 0) {
      // If there are more unanswered surveys, show the next one
      setCurrentSurveyToDisplay(updatedUnanswered[0])
      setShowUserSurveyPopup(true) // Re-open popup immediately for the next question
    } else {
      // All surveys answered, close popup
      setShowUserSurveyPopup(false)
      setCurrentSurveyToDisplay(null)
      alert("You have answered all available surveys. Thank you!") // Simple success message
    }
  }

  // Carousel auto-advance for banner
  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1))
      }, 5000) // Change image every 5 seconds
      return () => clearInterval(interval)
    }
  }, [events.length])

  const handleSuggestionChange = (e) => {
    const { name, value } = e.target
    setSuggestionForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSuggestionSubmit = () => {
    console.log("Suggestion submitted:", suggestionForm)
    setShowSuggestionPopup(false)
    setSuggestionForm({
      name: "",
      email: "",
      contactNumber: "",
      comment: "",
    })
  }

  const handleDonationSubmit = () => {
    console.log("Donation submitted:", { currency: selectedCurrency, amount: donationAmount })
    setShowDonationPopup(false)
    setSelectedCurrency("")
    setDonationAmount("")
  }

  const handleQuestionnaireComplete = (answers) => {
    console.log("Questionnaire completed:", answers)
    // You might want to persist these answers or mark questionnaire as done here
    // For now, it simply closes the popup.
    setShowQuestionnaire(false)
  }

  // Event carousel navigation for Programs & Events section
  const handlePrevEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1))
  }

  const handleNextEvent = () => {
    setCurrentEventIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1))
  }

  const currentEvent = events[currentEventIndex]
  const currentBannerEvent = events[currentBannerIndex]

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return dateString
    }
  }

  return (
    <DashboardLayout userDetails={userDetails}>
      <div className="p-4 md:p-6 font-instrument">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-xl md:text-2xl">
              Welcome, <span className="text-xl md:text-2xl font-bold">{userName || "Loading..."}</span>
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="text-sm font-medium">Membership Status</div>
            <div className="text-[#B93815] p-1 rounded bg-[#FBF0E9] text-sm">• Not Confirmed</div>
            <button
              onClick={() => setShowMembershipPopup(true)}
              className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm flex items-center justify-center"
            >
              Pay Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Banner Section - Now a Carousel */}
        <div className="relative bg-gray-200 h-40 md:h-56 rounded-lg mb-6 overflow-hidden">
          {loadingEvents ? (
            <div className="flex items-center justify-center h-full text-gray-500">Loading banner events...</div>
          ) : errorEvents ? (
            <div className="flex items-center justify-center h-full text-red-500">{errorEvents}</div>
          ) : events.length > 0 && currentBannerEvent ? (
            <Link to={`/event-details/${currentBannerEvent.id}`} className="block w-full h-full">
              <img
                src={
                  currentBannerEvent.banner_image_url || "https://placehold.co/1000x224/cccccc/ffffff?text=Event+Banner"
                }
                alt={currentBannerEvent.title || "Event Banner"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = "https://placehold.co/1000x224/cccccc/ffffff?text=Event+Banner"
                }}
              />
              {/* Optional: Add a title overlay on the banner */}
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white p-2 text-center">
                <h3 className="font-semibold text-sm md:text-lg">{currentBannerEvent.title}</h3>
              </div>
            </Link>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">No events to display in banner.</div>
          )}

          {/* Carousel Navigation Buttons */}
          {events.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 md:p-2 rounded-full z-10 hover:bg-opacity-75 transition-opacity"
                onClick={() =>
                  setCurrentBannerIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1))
                }
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 md:p-2 rounded-full z-10 hover:bg-opacity-75 transition-opacity"
                onClick={() =>
                  setCurrentBannerIndex((prevIndex) => (prevIndex === events.length - 1 ? 0 : prevIndex + 1))
                }
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Carousel Dots Indicator */}
          {events.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
              {events.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${currentBannerIndex === idx ? "bg-white" : "bg-gray-400 opacity-75"}`}
                  onClick={() => setCurrentBannerIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>

        {/* Boxes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5">
          {/* Suggestion Box */}
          <div
            onClick={() => setShowSuggestionPopup(true)}
            className="bg-[#F8E5D9] p-6 md:p-8 rounded-lg flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-orange-600 font-semibold text-lg md:text-xl">Suggestion Box</h2>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 md:h-16 md:w-16 text-[#D15300]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          {/* Donation Box */}
          <div
            onClick={() => setShowDonationPopup(true)}
            className="bg-[#BCCFDC] p-6 md:p-8 rounded-lg flex justify-between items-start cursor-pointer hover:shadow-md transition-shadow"
          >
            <div>
              <h2 className="text-[#20608B] font-semibold text-lg md:text-xl">Donation Box</h2>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 md:h-16 md:w-16 text-[#20608B]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Programs & News Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* Alumni Programs & Events */}
          <div>
            <h2 className="text-xs font-semibold pt-3 uppercase mb-2 border-t-2 border-orange-500 pb-1">
              Alumni Programs & Events
            </h2>
            {loadingEvents ? (
              <div className="text-gray-500">Loading events...</div>
            ) : errorEvents ? (
              <div className="text-red-500">{errorEvents}</div>
            ) : currentEvent ? (
              <div className="flex flex-col h-full">
                <Link to={`/event-details/${currentEvent.id}`} className="block">
                  <h3 className="font-medium text-base mb-1 hover:underline">{currentEvent.title}</h3>
                </Link>
                <p className="text-gray-600 text-sm mb-2 mt-1">
                  {currentEvent.description.length > 200
                    ? `${currentEvent.description.substring(0, 200)}...`
                    : currentEvent.description}
                </p>
                <hr className="my-2" />
                <div className="mt-3">
                  <p className="text-black font-semibold text-lg mb-1">{currentEvent.venue}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {formatDate(currentEvent.start_date)} | {currentEvent.meeting_time || "N/A"}
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="border border-gray-300 p-1 hover:bg-gray-100 rounded"
                      onClick={handlePrevEvent}
                      disabled={events.length <= 1}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      className="border border-gray-300 p-1 hover:bg-gray-100 rounded"
                      onClick={handleNextEvent}
                      disabled={events.length <= 1}
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">No upcoming events.</div>
            )}
          </div>

          {/* News for Alumni */}
          <div>
            <h2 className="text-xs font-semibold uppercase mb-2 border-t-2 border-orange-500 pb-1 pt-2">
              News for Alumni
            </h2>
            {loadingNews ? (
              <div className="text-gray-500">Loading news...</div>
            ) : errorNews ? (
              <div className="text-red-500">{errorNews}</div>
            ) : news.length > 0 ? (
              <div className="flex flex-col gap-4">
                {news.map((item) => (
                  <Link to={`/news-details/${item.id}`} key={item.id} className="flex mt-2 gap-3 items-start">
                    <img
                      src={item.banner_image_url || "https://placehold.co/80x80/cccccc/ffffff?text=NoImg"}
                      alt={item.title}
                      className="w-12 h-12 md:w-16 md:h-16 object-cover rounded flex-shrink-0"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://placehold.co/80x80/cccccc/ffffff?text=NoImg"
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm md:text-base leading-tight mb-1 hover:underline truncate">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-xs">{formatDate(item.created_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">No recent news.</div>
            )}
          </div>
        </div>
      </div>

      {/* Membership Registration Fee Popup */}
      <MembershipPopup
        showMembershipPopup={showMembershipPopup}
        setShowMembershipPopup={setShowMembershipPopup}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
      />

      {/* Suggestion Box Popup */}
      {showSuggestionPopup && (
        <SuggestionPopup
          showSuggestionPopup={showSuggestionPopup}
          setShowSuggestionPopup={setShowSuggestionPopup}
          suggestionForm={suggestionForm}
          handleSuggestionChange={handleSuggestionChange}
          handleSuggestionSubmit={handleSuggestionSubmit}
        />
      )}

      {/* Donation Box Popup */}
      <DonationPopup
        showDonationPopup={showDonationPopup}
        setShowDonationPopup={setShowDonationPopup}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        donationAmount={donationAmount}
        setDonationAmount={setDonationAmount}
        handleDonationSubmit={handleDonationSubmit}
      />

      {/* Questionnaire Popup (original, separate from the new survey) */}
      {showQuestionnaire && <QuestionnairePopup onComplete={handleQuestionnaireComplete} />}

      {/* User Survey Popup - Only show if there are unanswered surveys */}
      {loadingUserSurveyLogic ? (
        // Optionally show a small loading indicator for survey logic
        <div className="sr-only">Loading surveys for user...</div>
      ) : (
        currentSurveyToDisplay && ( // Only render if a survey question is loaded and ready to display
          <SurveyPopup
            show={showUserSurveyPopup}
            onClose={() => setShowUserSurveyPopup(false)} // Allow closing if user opts out
            surveyData={currentSurveyToDisplay}
            onSurveySubmitted={handleUserSurveySubmitted}
          />
        )
      )}
    </DashboardLayout>
  )
}

export default Home
