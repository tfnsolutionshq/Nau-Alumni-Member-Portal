// import { useState, useEffect } from "react"
// import { Link, useLocation } from "react-router-dom"
// import SupportPopup from "../Support/SupportPopup"
// import { useAuth } from "../../contexts/AuthContext"
// import axios from "axios" // Import axios

// // Icons (unchanged)
// const HomeIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//     />
//   </svg>
// )

// const DonationIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// )

// const MemberIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//     />
//   </svg>
// )

// const AccountIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//     />
//   </svg>
// )

// const SupportIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
//     />
//   </svg>
// )

// const SearchIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-5 w-5 text-gray-400"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//     />
//   </svg>
// )

// const NotificationIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//     />
//   </svg>
// )

// const MenuIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//   </svg>
// )

// const CloseIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//   </svg>
// )

// const DashboardLayout = ({ children }) => { // Removed userDetails prop
//   const [isSupportOpen, setIsSupportOpen] = useState(false)
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [pageTitle, setPageTitle] = useState("Home")
//   const location = useLocation()
//   const { logout, token, isAuthenticated, loading: authLoading } = useAuth() // Get auth state and token

//   const [userName, setUserName] = useState("User") // State for user's first name
//   const [userEmail, setUserEmail] = useState("user@unizik.edu.ng") // State for user's email
//   const [userInitial, setUserInitial] = useState("U") // State for user's initial

//   // Fetch user details from /my-details endpoint
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       // Only fetch if authentication is ready and user is authenticated
//       if (authLoading) return;
//       if (!isAuthenticated || !token) {
//         setUserName("Guest");
//         setUserEmail("guest@example.com");
//         setUserInitial("G");
//         return;
//       }

//       try {
//         const config = {
//           method: "get",
//           maxBodyLength: Number.POSITIVE_INFINITY,
//           url: "https://unizikalumni-api.tfnsolutions.us/api/my-details",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.request(config);

//         if (response.data && response.data.data) {
//           const memberData = response.data.data;
//           setUserName(memberData.first_name || "User");
//           setUserEmail(memberData.email || "user@unizik.edu.ng");
//           setUserInitial((memberData.first_name?.charAt(0) || "U").toUpperCase());
//         } else {
//           console.error("Invalid user details response format or no member data. Actual response:", response.data);
//           setUserName("User"); // Fallback if data format is unexpected
//           setUserEmail("user@unizik.edu.ng");
//           setUserInitial("U");
//         }
//       } catch (err) {
//         console.error("Error fetching user details:", err);
//         // Fallback on error, keep default user info
//         setUserName("User");
//         setUserEmail("user@unizik.edu.ng");
//         setUserInitial("U");
//       }
//     };

//     fetchUserDetails();
//   }, [authLoading, isAuthenticated, token]); // Re-fetch when auth state changes

//   const handleLogout = () => {
//     logout()
//     window.location.href = "https://unizikalumni.tfnsolutions.us//login"
//   }

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [location])

//   // Update page title based on current route
//   useEffect(() => {
//     const path = location.pathname
//     if (path === "/") setPageTitle("Home")
//     else if (path === "/donations") setPageTitle("Donation Box")
//     else if (path === "/member-chamber") setPageTitle("Member Chamber")
//     else if (path === "/account") setPageTitle("Account")
//     else if (path === "/support") setPageTitle("Support")
//     else if (path === "/my-donations") setPageTitle("My Donations")
//     else if (path === "/all-donations") setPageTitle("All Donations")
//     else if (path === "/donation-details") setPageTitle("Donation Details")
//     else setPageTitle("Home")
//   }, [location])

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isMobileMenuOpen &&
//         !event.target.closest(".mobile-sidebar") &&
//         !event.target.closest(".mobile-menu-button")
//       ) {
//         setIsMobileMenuOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isMobileMenuOpen])

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-50">
//       {/* Support Popup */}
//       <SupportPopup isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Menu Button - Only visible on small screens */}
//       <div className="lg:hidden fixed top-4 left-4 z-50">
//         <button
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           className="mobile-menu-button p-2 rounded-md bg-[#066AAB] text-white shadow-lg hover:bg-[#055a96] transition-colors"
//         >
//           {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`mobile-sidebar ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:relative z-50 w-64 bg-[#066AAB] text-white flex flex-col h-full transition-transform duration-300 ease-in-out shadow-xl`}
//       >
//         {/* Logo */}
//         <div className="p-4 border-b border-blue-700">
//           <img
//             src="https://github.com/tfnsolutionshq/Unizik-Alumni-Assets/blob/main/unizik-logo%201.png?raw=true"
//             alt="Nnamdi Azikiwe University"
//             className="h-12 md:h-14 w-auto"
//           />
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto py-4">
//           <ul className="space-y-1">
//             <li>
//               <Link
//                 to="/"
//                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                   location.pathname === "/"
//                     ? "bg-white text-[#066AAB] shadow-sm"
//                     : "hover:bg-blue-700 hover:bg-opacity-50"
//                 }`}
//               >
//                 <HomeIcon />
//                 <span className="ml-3">Home</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/donations"
//                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                   location.pathname === "/donations"
//                     ? "bg-white text-[#066AAB] shadow-sm"
//                     : "hover:bg-blue-700 hover:bg-opacity-50"
//                 }`}
//               >
//                 <DonationIcon />
//                 <span className="ml-3">Donation Box</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/member-chamber"
//                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                   location.pathname === "/member-chamber"
//                     ? "bg-white text-[#066AAB] shadow-sm"
//                     : "hover:bg-blue-700 hover:bg-opacity-50"
//                 }`}
//               >
//                 <MemberIcon />
//                 <span className="ml-3">Member Chamber</span>
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/account"
//                 className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
//                   location.pathname === "/account"
//                     ? "bg-white text-[#066AAB] shadow-sm"
//                     : "hover:bg-blue-700 hover:bg-opacity-50"
//                 }`}
//               >
//                 <AccountIcon />
//                 <span className="ml-3">Account</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>

//         {/* Support */}
//         <div className="p-4 border-t border-blue-700">
//           <button
//             onClick={() => setIsSupportOpen(true)}
//             className="flex items-center text-sm w-full hover:bg-blue-700 hover:bg-opacity-50 rounded-md px-4 py-2 transition-colors duration-200"
//           >
//             <SupportIcon />
//             <span className="ml-3">Support</span>
//           </button>

//           {/* User Info */}
//           <div className="flex items-center mt-4 pt-4 border-t border-blue-700">
//             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
//               {userInitial}
//             </div>
//             <div className="ml-3 flex-1 min-w-0">
//               <div className="text-sm font-medium truncate">{userName}</div>
//               <div className="text-xs text-blue-200 truncate">{userEmail}</div>
//             </div>
//             {/* Logout Icon */}
//             <button
//               onClick={handleLogout}
//               className="ml-2 p-2 text-blue-200 hover:text-white hover:bg-blue-700 hover:bg-opacity-50 rounded-full transition-colors duration-200 flex-shrink-0"
//               title="Logout"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 z-30 shadow-sm">
//           <div className="flex items-center justify-between py-3 px-4 lg:px-6">
//             {/* Page Title - Adjusted for mobile menu button */}
//             <div className="flex items-center">
//               <div className="lg:hidden w-12"></div> {/* Spacer for mobile menu button */}
//               <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{pageTitle}</h1>
//             </div>

//             <div className="flex items-center space-x-2 lg:space-x-4">
//               {/* Search - Hidden on small screens */}
//               <div className="relative hidden md:block">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//                   <SearchIcon />
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                 />
//               </div>

//               {/* Notifications */}
//               <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
//                 <NotificationIcon />
//                 {/* Notification badge */}
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               {/* User Avatar - Mobile */}
//               <div className="lg:hidden flex items-center">
//                 <div className="w-8 h-8 rounded-full bg-[#066AAB] flex items-center justify-center text-white font-bold text-sm">
//                   {userInitial}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
//       </div>
//     </div>
//   )
// }

// export default DashboardLayout









"use client"

import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import SupportPopup from "../Support/SupportPopup"
import { useAuth } from "../../contexts/AuthContext"
import axios from "axios"
import { Bell } from "lucide-react" // Import Bell icon from lucide-react

// Icons (unchanged)
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

const DonationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const MemberIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const AccountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
)

const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
    />
  </svg>
)

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const DashboardLayout = ({ children }) => {
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [pageTitle, setPageTitle] = useState("Home")
  const location = useLocation()
  const { logout, token, isAuthenticated, loading: authLoading } = useAuth()

  const [userName, setUserName] = useState("User")
  const [userEmail, setUserEmail] = useState("user@unizik.edu.ng")
  const [userInitial, setUserInitial] = useState("U")

  // Notification states
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [loadingNotifications, setLoadingNotifications] = useState(false)

  // Refs for click outside detection
  const notificationRef = useRef(null)
  const sidebarRef = useRef(null)

  // Fetch user details from /my-details endpoint
  useEffect(() => {
    const fetchUserDetails = async () => {
      // Only fetch if authentication is ready and user is authenticated
      if (authLoading) return
      if (!isAuthenticated || !token) {
        setUserName("Guest")
        setUserEmail("guest@example.com")
        setUserInitial("G")
        return
      }

      try {
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

        if (response.data && response.data.data) {
          const memberData = response.data.data
          setUserName(memberData.first_name || "User")
          setUserEmail(memberData.email || "user@unizik.edu.ng")
          setUserInitial((memberData.first_name?.charAt(0) || "U").toUpperCase())
        } else {
          console.error("Invalid user details response format or no member data. Actual response:", response.data)
          setUserName("User") // Fallback if data format is unexpected
          setUserEmail("user@unizik.edu.ng")
          setUserInitial("U")
        }
      } catch (err) {
        console.error("Error fetching user details:", err)
        // Fallback on error, keep default user info
        setUserName("User")
        setUserEmail("user@unizik.edu.ng")
        setUserInitial("U")
      }
    }

    fetchUserDetails()
  }, [authLoading, isAuthenticated, token]) // Re-fetch when auth state changes

  // Fetch notifications on component mount and periodically
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchNotifications()
      // Set up polling for new notifications every 30 seconds
      const interval = setInterval(fetchNotifications, 30000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated, token])

  const fetchNotifications = async () => {
    if (!isAuthenticated || !token) return

    try {
      setLoadingNotifications(true)
      const config = {
        method: "get",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/user/notifications",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.request(config)
      console.log("Notifications response:", response.data) // Debug log
      const notificationsData = response.data || []
      setNotifications(notificationsData)

      // Count unread notifications
      const unread = notificationsData.filter((notification) => !notification.read_at).length
      setUnreadCount(unread)
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setLoadingNotifications(false)
    }
  }

  const markAsRead = async (notificationId) => {
    if (!isAuthenticated || !token) return

    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/notification/mark-read",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify({
          notification_id: notificationId,
        }),
      }

      await axios.request(config)

      // Update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, read_at: new Date().toISOString() } : notification,
        ),
      )

      // Update unread count
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    if (!isAuthenticated || !token) return

    // Mark each unread notification as read
    const unreadNotifications = notifications.filter((notification) => !notification.read_at)

    for (const notification of unreadNotifications) {
      await markAsRead(notification.id)
    }
  }

  const formatNotificationType = (type) => {
    if (!type) return "Notification"
    if (type.includes("Suggestion")) return "Suggestion"
    if (type.includes("Member")) return "Member"
    if (type.includes("Event")) return "Event"
    if (type.includes("Donation")) return "Donation"
    return "Notification"
  }

  const formatTimeAgo = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const handleLogout = () => {
    logout()
    window.location.href = "https://unizikalumni.tfnsolutions.us//login"
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setShowNotifications(false)
  }, [location])

  // Update page title based on current route
  useEffect(() => {
    const path = location.pathname
    if (path === "/") setPageTitle("Home")
    else if (path === "/donations") setPageTitle("Donation Box")
    else if (path === "/member-chamber") setPageTitle("Member Chamber")
    else if (path === "/account") setPageTitle("Account")
    else if (path === "/support") setPageTitle("Support")
    else if (path === "/my-donations") setPageTitle("My Donations")
    else if (path === "/all-donations") setPageTitle("All Donations")
    else if (path === "/donation-details") setPageTitle("Donation Details")
    else setPageTitle("Home")
  }, [location])

  // Close mobile menu and notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false)
      }

      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen, showNotifications])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Support Popup */}
      <SupportPopup isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button p-2 rounded-md bg-[#066AAB] text-white shadow-lg hover:bg-[#055a96] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`mobile-sidebar ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:relative z-50 w-64 bg-[#066AAB] text-white flex flex-col h-full transition-transform duration-300 ease-in-out shadow-xl`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-700">
          <img
            src="https://github.com/tfnsolutionshq/Unizik-Alumni-Assets/blob/main/unizik-logo%201.png?raw=true"
            alt="Nnamdi Azikiwe University"
            className="h-12 md:h-14 w-auto"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === "/"
                    ? "bg-white text-[#066AAB] shadow-sm"
                    : "hover:bg-blue-700 hover:bg-opacity-50"
                }`}
              >
                <HomeIcon />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/donations"
                className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === "/donations"
                    ? "bg-white text-[#066AAB] shadow-sm"
                    : "hover:bg-blue-700 hover:bg-opacity-50"
                }`}
              >
                <DonationIcon />
                <span className="ml-3">Donation Box</span>
              </Link>
            </li>
            <li>
              <Link
                to="/member-chamber"
                className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === "/member-chamber"
                    ? "bg-white text-[#066AAB] shadow-sm"
                    : "hover:bg-blue-700 hover:bg-opacity-50"
                }`}
              >
                <MemberIcon />
                <span className="ml-3">Member Chamber</span>
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className={`flex items-center mx-3 rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === "/account"
                    ? "bg-white text-[#066AAB] shadow-sm"
                    : "hover:bg-blue-700 hover:bg-opacity-50"
                }`}
              >
                <AccountIcon />
                <span className="ml-3">Account</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Support */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={() => setIsSupportOpen(true)}
            className="flex items-center text-sm w-full hover:bg-blue-700 hover:bg-opacity-50 rounded-md px-4 py-2 transition-colors duration-200"
          >
            <SupportIcon />
            <span className="ml-3">Support</span>
          </button>

          {/* User Info */}
          <div className="flex items-center mt-4 pt-4 border-t border-blue-700">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
              {userInitial}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{userName}</div>
              <div className="text-xs text-blue-200 truncate">{userEmail}</div>
            </div>
            {/* Logout Icon */}
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-blue-200 hover:text-white hover:bg-blue-700 hover:bg-opacity-50 rounded-full transition-colors duration-200 flex-shrink-0"
              title="Logout"
              aria-label="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 z-30 shadow-sm">
          <div className="flex items-center justify-between py-3 px-4 lg:px-6">
            {/* Page Title - Adjusted for mobile menu button */}
            <div className="flex items-center">
              <div className="lg:hidden w-12"></div> {/* Spacer for mobile menu button */}
              <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{pageTitle}</h1>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search - Hidden on small screens */}
              <div className="relative hidden md:block">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[80vh] overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-gray-600"
                          aria-label="Close notifications"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="max-h-[calc(80vh-120px)] overflow-y-auto">
                      {loadingNotifications ? (
                        <div className="p-8 text-center text-gray-500">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                          <p className="mt-4">Loading notifications...</p>
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                          <Bell className="h-12 w-12 mx-auto text-gray-300" />
                          <p className="mt-4 font-medium">No notifications yet</p>
                          <p className="text-sm mt-2">You'll see new notifications here</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                              !notification.read_at ? "bg-blue-50" : ""
                            }`}
                            onClick={() => {
                              if (!notification.read_at) {
                                markAsRead(notification.id)
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                  !notification.read_at ? "bg-blue-500" : "bg-gray-300"
                                }`}
                              ></div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                                    {notification.data?.type || formatNotificationType(notification.type)}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatTimeAgo(notification.created_at)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-900 mt-1 line-clamp-3">
                                  {notification.data?.message || "New notification"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200 bg-gray-50">
                        <button
                          className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium py-1"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Avatar - Mobile */}
              <div className="lg:hidden flex items-center">
                <div className="w-8 h-8 rounded-full bg-[#066AAB] flex items-center justify-center text-white font-bold text-sm">
                  {userInitial}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
