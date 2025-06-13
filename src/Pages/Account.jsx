// import { useState, useEffect } from "react"
// import DashboardLayout from "../Components/Layout/DashboardLayout"
// // import { ResetPasswordModal, DeleteAccountModal } from "../Components/Security/SecurityModals"
// import { useAuth } from "../contexts/AuthContext"
// import { ChevronDown } from "lucide-react"
// import axios from "axios"

// function Account() {
//   const [activeTab, setActiveTab] = useState("profileView")
//   // const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
//   // const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
//   const { token, isAuthenticated } = useAuth()

//   // Loading and error states
//   const [loading, setLoading] = useState(true)
//   const [updating, setUpdating] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)

//   // Dropdown data
//   const [chapters, setChapters] = useState([])
//   const [programmes, setProgrammes] = useState([])
//   const [courses, setCourses] = useState([])

//   // Add these new state variables after the existing state declarations
//   const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false)
//   const [publicProfileOpen, setPublicProfileOpen] = useState(false)
//   const [imagePreview, setImagePreview] = useState(null)
//   const [existingProfilePhoto, setExistingProfilePhoto] = useState(null)

//   // State for form data
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     birthMonth: "",
//     maritalStatus: "",
//     courseId: "",
//     programmeId: "",
//     graduationYear: "",
//     location: "",
//     chapterOfInterest: "",
//     employmentStatus: "",
//     placeOfWork: "",
//     profilePhoto: null,
//     bio: "",
//     socials: [],
//   })

//   // Password change form
//   const [passwordData, setPasswordData] = useState({
//     password: "",
//     passwordConfirmation: "",
//   })

//   // Fetch user details from /my-details endpoint
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       if (!isAuthenticated || !token) {
//         setLoading(false)
//         return
//       }

//       try {
//         setLoading(true)
//         const config = {
//           method: "get",
//           maxBodyLength: Number.POSITIVE_INFINITY,
//           url: "https://unizikalumni-api.tfnsolutions.us/api/my-details",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }

//         const response = await axios.request(config)

//         if (response.data && response.data.data) {
//           const userData = response.data.data

//           // Get birth month from API response
//           const birthMonth = userData.birth_month || ""

//           setFormData({
//             firstName: userData.first_name || "",
//             lastName: userData.last_name || "",
//             email: userData.email || "",
//             phone: userData.phone || "",
//             birthMonth: birthMonth,
//             maritalStatus: userData.marital_status || "",
//             courseId: userData.course_id || "",
//             programmeId: userData.programme_id || "",
//             graduationYear: userData.graduation_year || "",
//             location: userData.location || "",
//             chapterOfInterest: userData.chapter_of_interest || "",
//             employmentStatus: userData.employment_status || "",
//             placeOfWork: userData.place_of_work || "",
//             profilePhoto: null, // File input, will be set separately
//             bio: userData.bio, // Not in API response, keeping empty
//             socials: userData.socials || [],
//           })

//           // Set existing profile photo URL if available
//           if (userData.profile_photo_url) {
//             setExistingProfilePhoto(userData.profile_photo_url)
//             setImagePreview(userData.profile_photo_url)
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching user details:", err)
//         setError("Failed to load user details. Please refresh the page.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserDetails()
//   }, [isAuthenticated, token])

//   // Fetch dropdown data (chapters, programmes, courses)
//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         // Fetch Chapters
//         const chaptersConfig = {
//           method: "get",
//           maxBodyLength: Number.POSITIVE_INFINITY,
//           url: "https://unizikalumni-api.tfnsolutions.us/api/chapters",
//           headers: { Accept: "application/json" },
//         }
//         const chaptersResponse = await axios.request(chaptersConfig)
//         if (chaptersResponse.data.chapters && Array.isArray(chaptersResponse.data.chapters.data)) {
//           setChapters(chaptersResponse.data.chapters.data)
//         }

//         // Fetch Programmes
//         const programmesConfig = {
//           method: "get",
//           maxBodyLength: Number.POSITIVE_INFINITY,
//           url: "https://unizikalumni-api.tfnsolutions.us/api/programmes",
//           headers: {},
//         }
//         const programmesResponse = await axios.request(programmesConfig)
//         if (Array.isArray(programmesResponse.data)) {
//           setProgrammes(programmesResponse.data)
//         }

//         // Fetch Courses
//         const coursesConfig = {
//           method: "get",
//           maxBodyLength: Number.POSITIVE_INFINITY,
//           url: "https://unizikalumni-api.tfnsolutions.us/api/courses",
//           headers: {},
//         }
//         const coursesResponse = await axios.request(coursesConfig)
//         if (Array.isArray(coursesResponse.data)) {
//           setCourses(coursesResponse.data)
//         }
//       } catch (err) {
//         console.error("Error fetching dropdown data:", err)
//       }
//     }

//     fetchDropdownData()
//   }, [])

//   // Replace the existing handleChange function with this updated version
//   const handleChange = (e) => {
//     const { name, value, files } = e.target
//     if (name === "profilePhoto") {
//       const file = files[0]
//       setFormData((prev) => ({ ...prev, [name]: file }))

//       // Create image preview
//       if (file) {
//         const reader = new FileReader()
//         reader.onloadend = () => {
//           setImagePreview(reader.result)
//         }
//         reader.readAsDataURL(file)
//       } else {
//         setImagePreview(null)
//       }
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }))
//     }
//     // Clear messages on input change
//     if (error) setError(null)
//     if (success) setSuccess(null)
//   }

//   // Handle password form changes
//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target
//     setPasswordData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   // Find the handleSocialChange function and update it to auto-populate URLs based on platform
//   // Replace the existing handleSocialChange function with this:

//   const handleSocialChange = (index, field, value) => {
//     const updatedSocials = [...formData.socials]

//     // If changing the platform, set a default URL structure
//     if (field === "platform") {
//       let baseUrl = ""
//       switch (value) {
//         case "Instagram":
//           baseUrl = "https://instagram.com/"
//           break
//         case "Facebook":
//           baseUrl = "https://facebook.com/"
//           break
//         case "X":
//           baseUrl = "https://x.com/"
//           break
//         case "LinkedIn":
//           baseUrl = "https://linkedin.com/in/"
//           break
//         case "TikTok":
//           baseUrl = "https://tiktok.com/@"
//           break
//         case "Github":
//           baseUrl = "https://github.com/"
//           break
//         default:
//           baseUrl = ""
//       }

//       updatedSocials[index] = {
//         ...updatedSocials[index],
//         [field]: value,
//         url: baseUrl,
//       }
//     } else {
//       updatedSocials[index] = { ...updatedSocials[index], [field]: value }
//     }

//     setFormData((prev) => ({ ...prev, socials: updatedSocials }))
//   }

//   const addNewSocial = () => {
//     setFormData((prev) => ({
//       ...prev,
//       socials: [...prev.socials, { platform: "", url: "" }],
//     }))
//   }

//   const removeSocial = (index) => {
//     const updatedSocials = formData.socials.filter((_, i) => i !== index)
//     setFormData((prev) => ({ ...prev, socials: updatedSocials }))
//   }

//   // Handle profile update submission
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!isAuthenticated || !token) {
//       setError("You must be logged in to update your profile.")
//       return
//     }

//     setUpdating(true)
//     setError(null)
//     setSuccess(null)

//     const data = new FormData()

//     // Map form data to API expected field names
//     data.append("first_name", formData.firstName)
//     data.append("last_name", formData.lastName)
//     data.append("email", formData.email)
//     data.append("phone", formData.phone)

//     data.append("birth_month", formData.birthMonth)

//     data.append("marital_status", formData.maritalStatus)
//     data.append("course_id", formData.courseId)
//     data.append("programme_id", formData.programmeId)
//     data.append("graduation_year", formData.graduationYear)
//     data.append("location", formData.location)
//     data.append("chapter_of_interest", formData.chapterOfInterest)
//     data.append("employment_status", formData.employmentStatus)
//     data.append("place_of_work", formData.placeOfWork)

//     if (formData.employmentStatus === "employed" && !formData.placeOfWork) {
//       setError("Place of work is required when employment status is set to employed.")
//       window.scrollTo({ top: 0, behavior: "smooth" })
//       return
//     }

//     if (formData.profilePhoto) {
//       data.append("profile_photo", formData.profilePhoto)
//     }

//     data.append("bio", formData.bio)

//     // Handle socials
//     formData.socials.forEach((social, index) => {
//       if (social.platform && social.url) {
//         data.append(`socials[${index}][platform]`, social.platform)
//         data.append(`socials[${index}][url]`, social.url)
//       }
//     })

//     try {
//       const config = {
//         method: "post",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/profile/update",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // FormData automatically sets Content-Type with boundary
//         },
//         data: data,
//       }

//       const response = await axios.request(config)
//       console.log("Profile update response:", response.data)
//       setSuccess("Profile updated successfully!")
//     } catch (err) {
//       console.error("Profile update error:", err)
//       if (err.response && err.response.data) {
//         if (err.response.data.errors) {
//           const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
//           setError(err.response.data.message + ": " + errorMessages)
//         } else {
//           setError(err.response.data.message || "Profile update failed. Please try again.")
//         }
//       } else {
//         setError("Profile update failed. Please check your network and try again.")
//       }
//     } finally {
//       setUpdating(false)
//     }
//   }

//   // Handle password change
//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault()
//     if (!isAuthenticated || !token) {
//       setError("You must be logged in to change your password.")
//       return
//     }

//     if (passwordData.password !== passwordData.passwordConfirmation) {
//       setError("Passwords do not match.")
//       return
//     }

//     if (passwordData.password.length < 8) {
//       setError("Password must be at least 8 characters long.")
//       return
//     }

//     setUpdating(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const data = JSON.stringify({
//         password: passwordData.password,
//         password_confirmation: passwordData.passwordConfirmation,
//       })

//       const config = {
//         method: "post",
//         maxBodyLength: Number.POSITIVE_INFINITY,
//         url: "https://unizikalumni-api.tfnsolutions.us/api/password/update",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: data,
//       }

//       const response = await axios.request(config)
//       console.log("Password update response:", response.data)
//       setSuccess("Password updated successfully!")
//       setPasswordData({ password: "", passwordConfirmation: "" })
//     } catch (err) {
//       console.error("Password update error:", err)
//       if (err.response && err.response.data) {
//         setError(err.response.data.message || "Password update failed. Please try again.")
//       } else {
//         setError("Password update failed. Please check your network and try again.")
//       }
//     } finally {
//       setUpdating(false)
//     }
//   }

//   // Generate years for graduation year dropdown
//   const currentYear = new Date().getFullYear()
//   const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

//   // Get course and programme names for display
//   const getCourseName = (courseId) => {
//     const course = courses.find((c) => c.id === courseId)
//     return course ? course.name : ""
//   }

//   const getProgrammeName = (programmeId) => {
//     const programme = programmes.find((p) => p.id === programmeId)
//     return programme ? `${programme.name} (${programme.level})` : ""
//   }

//   const getChapterName = (chapterId) => {
//     const chapter = chapters.find((c) => c.id === chapterId)
//     return chapter ? chapter.name : ""
//   }

//   useEffect(() => {
//     if (error || success) {
//       window.scrollTo({ top: 0, behavior: "smooth" })
//     }
//   }, [error, success])

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="w-full mx-auto px-8 py-3">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-gray-500">Loading user details...</div>
//           </div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   return (
//     <DashboardLayout>
//       <div className="w-full mx-auto px-8 py-3">
//         {/* Success/Error Messages */}
//         {success && (
//           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
//             {success}
//           </div>
//         )}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
//         )}

//         {/* Tabs */}
//         <div className="flex justify-center border-b">
//           <button
//             className={`px-4 py-2 ${activeTab === "profileView" ? "border-b-2 border-[#D85E00] text-[#D85E00]" : "text-gray-500"}`}
//             onClick={() => setActiveTab("profileView")}
//           >
//             Public Profile View
//           </button>
//           <button
//             className={`px-4 py-2 ${activeTab === "security" ? "border-b-2 border-[#D85E00] text-[#D85E00]" : "text-gray-500"}`}
//             onClick={() => setActiveTab("security")}
//           >
//             Security
//           </button>
//         </div>

//         <div className="mt-8">
//           {/* Profile View Tab */}
//           {activeTab === "profileView" && (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Personal Details Section */}
//               <div className="border border-gray-200 rounded-lg">
//                 <button
//                   type="button"
//                   onClick={() => setPersonalDetailsOpen(!personalDetailsOpen)}
//                   className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                 >
//                   <h2 className="text-lg font-medium">Personal Details</h2>
//                   <ChevronDown className={`w-5 h-5 transition-transform ${personalDetailsOpen ? "rotate-180" : ""}`} />
//                 </button>

//                 {personalDetailsOpen && (
//                   <div className="p-4 border-t border-gray-200 space-y-6">
//                     {/* Profile Photo */}
//                     <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
//                       {imagePreview || existingProfilePhoto ? (
//                         <img
//                           src={imagePreview || existingProfilePhoto || "/placeholder.svg"}
//                           alt="Profile preview"
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-8 w-8 text-gray-400"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                           />
//                         </svg>
//                       )}
//                     </div>

//                     <div>
//                       <label htmlFor="profilePhoto" className="text-gray-600 flex items-center cursor-pointer">
//                         Upload Photo
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 ml-1"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </label>
//                       <input
//                         type="file"
//                         id="profilePhoto"
//                         name="profilePhoto"
//                         accept="image/*"
//                         onChange={handleChange}
//                         className="hidden"
//                         disabled={updating}
//                       />
//                     </div>

//                     {/* Personal Details */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                           First Name
//                         </label>
//                         <input
//                           type="text"
//                           id="firstName"
//                           name="firstName"
//                           value={formData.firstName}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           disabled={updating}
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                           Last Name
//                         </label>
//                         <input
//                           type="text"
//                           id="lastName"
//                           name="lastName"
//                           value={formData.lastName}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           disabled={updating}
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         disabled={updating}
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                         Contact Number
//                       </label>
//                       <input
//                         type="tel"
//                         id="phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         disabled={updating}
//                         required
//                       />
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Public Profile View Section */}
//               <div className="border border-gray-200 rounded-lg">
//                 <button
//                   type="button"
//                   onClick={() => setPublicProfileOpen(!publicProfileOpen)}
//                   className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
//                 >
//                   <h2 className="text-lg font-medium">Public Profile View</h2>
//                   <ChevronDown className={`w-5 h-5 transition-transform ${publicProfileOpen ? "rotate-180" : ""}`} />
//                 </button>

//                 {publicProfileOpen && (
//                   <div className="p-4 border-t border-gray-200 space-y-6">
//                     <div>
//                       <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700 mb-1">
//                         Birth Month
//                       </label>
//                       <div className="relative">
//                         <select
//                           id="birthMonth"
//                           name="birthMonth"
//                           value={formData.birthMonth}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                           disabled={updating}
//                         >
//                           <option value="">Select month</option>
//                           <option value="january">January</option>
//                           <option value="february">February</option>
//                           <option value="march">March</option>
//                           <option value="april">April</option>
//                           <option value="may">May</option>
//                           <option value="june">June</option>
//                           <option value="july">July</option>
//                           <option value="august">August</option>
//                           <option value="september">September</option>
//                           <option value="october">October</option>
//                           <option value="november">November</option>
//                           <option value="december">December</option>
//                         </select>
//                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
//                         Marital Status
//                       </label>
//                       <div className="relative">
//                         <select
//                           id="maritalStatus"
//                           name="maritalStatus"
//                           value={formData.maritalStatus}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                           disabled={updating}
//                         >
//                           <option value="">Select status</option>
//                           <option value="single">Single</option>
//                           <option value="married">Married</option>
//                           <option value="divorced">Divorced</option>
//                           <option value="widowed">Widowed</option>
//                         </select>
//                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
//                         Location
//                       </label>
//                       <input
//                         type="text"
//                         id="location"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         placeholder="e.g. Lagos, Nigeria"
//                         disabled={updating}
//                       />
//                     </div>

//                     {/* Academic Details */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                       <div>
//                         <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
//                           Year of Graduation
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="graduationYear"
//                             name="graduationYear"
//                             value={formData.graduationYear}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                             disabled={updating}
//                           >
//                             <option value="">Select year</option>
//                             {years.map((year) => (
//                               <option key={year} value={year}>
//                                 {year}
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                         </div>
//                       </div>
//                       <div>
//                         <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
//                           Course of Study
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="courseId"
//                             name="courseId"
//                             value={formData.courseId}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                             disabled={updating}
//                           >
//                             <option value="">Select course</option>
//                             {courses.map((course) => (
//                               <option key={course.id} value={course.id}>
//                                 {course.name}
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                         </div>
//                       </div>
//                       <div>
//                         <label htmlFor="programmeId" className="block text-sm font-medium text-gray-700 mb-1">
//                           Programme
//                         </label>
//                         <div className="relative">
//                           <select
//                             id="programmeId"
//                             name="programmeId"
//                             value={formData.programmeId}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                             disabled={updating}
//                           >
//                             <option value="">Select programme</option>
//                             {programmes.map((programme) => (
//                               <option key={programme.id} value={programme.id}>
//                                 {programme.name} ({programme.level})
//                               </option>
//                             ))}
//                           </select>
//                           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Professional Details */}
//                     <div>
//                       <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
//                         Employment Status
//                       </label>
//                       <div className="relative">
//                         <select
//                           id="employmentStatus"
//                           name="employmentStatus"
//                           value={formData.employmentStatus}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                           disabled={updating}
//                         >
//                           <option value="">Select option</option>
//                           <option value="employed">Employed</option>
//                           <option value="self-employed">Self-employed</option>
//                           <option value="unemployed">Unemployed</option>
//                           <option value="retired">Retired</option>
//                           <option value="other">Other</option>
//                         </select>
//                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                       </div>
//                     </div>

//                     {(formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") && (
//                       <div>
//                         <label htmlFor="placeOfWork" className="block text-sm font-medium text-gray-700 mb-1">
//                           Place of Work
//                         </label>
//                         <input
//                           type="text"
//                           id="placeOfWork"
//                           name="placeOfWork"
//                           value={formData.placeOfWork}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           placeholder="Enter workplace"
//                           disabled={updating}
//                           required={formData.employmentStatus === "employed"}
//                         />
//                       </div>
//                     )}

//                     {/* Bio */}
//                     <div>
//                       <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
//                         BIO
//                       </label>
//                       <textarea
//                         id="bio"
//                         name="bio"
//                         value={formData.bio}
//                         onChange={handleChange}
//                         placeholder="Enter your bio..."
//                         rows={4}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                         disabled={updating}
//                       ></textarea>
//                     </div>

//                     {/* Socials */}
//                     <div>
//                       <h3 className="text-lg font-medium mb-4">Social Media</h3>

//                       {formData.socials.map((social, index) => (
//                         <div
//                           key={index}
//                           className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-md"
//                         >
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
//                             <div className="relative">
//                               <select
//                                 value={social.platform}
//                                 onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                                 disabled={updating}
//                               >
//                                 <option value="">Select platform</option>
//                                 <option value="Instagram">Instagram</option>
//                                 <option value="Facebook">Facebook</option>
//                                 <option value="X">X</option>
//                                 <option value="LinkedIn">LinkedIn</option>
//                                 <option value="TikTok">TikTok</option>
//                                 <option value="Github">Github</option>
//                               </select>
//                               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                             </div>
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
//                             <div className="flex gap-2">
//                               <input
//                                 type="url"
//                                 value={social.url}
//                                 onChange={(e) => handleSocialChange(index, "url", e.target.value)}
//                                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 placeholder="https://..."
//                                 disabled={updating}
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => removeSocial(index)}
//                                 className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
//                                 disabled={updating}
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       <button
//                         type="button"
//                         onClick={addNewSocial}
//                         className="flex items-center text-[#D85E00] mt-2 hover:text-[#C04D00] transition-colors"
//                         disabled={updating}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4 mr-1"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         Add Social Media
//                       </button>
//                     </div>

//                     <div>
//                       <label htmlFor="chapterOfInterest" className="block text-sm font-medium text-gray-700 mb-1">
//                         Chapter
//                       </label>
//                       <div className="relative">
//                         <select
//                           id="chapterOfInterest"
//                           name="chapterOfInterest"
//                           value={formData.chapterOfInterest}
//                           onChange={handleChange}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
//                           disabled={updating}
//                         >
//                           <option value="">Select chapter</option>
//                           {chapters.map((chapter) => (
//                             <option key={chapter.id} value={chapter.id}>
//                               {chapter.name}
//                             </option>
//                           ))}
//                         </select>
//                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                   disabled={updating}
//                 >
//                   {updating ? "Updating" : "Update Profile"}
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Security Tab */}
//           {activeTab === "security" && (
//             <div className="space-y-0">
//               {/* Password Change Form */}
//               <div className="bg-gray-50 rounded-lg">
//                 <h3 className="text-lg font-medium mb-4">Change Password</h3>
//                 <form onSubmit={handlePasswordSubmit} className="space-y-4">
//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                       New Password
//                     </label>
//                     <input
//                       type="password"
//                       id="password"
//                       name="password"
//                       value={passwordData.password}
//                       onChange={handlePasswordChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       placeholder="Enter new password (min. 8 characters)"
//                       disabled={updating}
//                       required
//                       minLength={8}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
//                       Confirm New Password
//                     </label>
//                     <input
//                       type="password"
//                       id="passwordConfirmation"
//                       name="passwordConfirmation"
//                       value={passwordData.passwordConfirmation}
//                       onChange={handlePasswordChange}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       placeholder="Confirm new password"
//                       disabled={updating}
//                       required
//                       minLength={8}
//                     />
//                   </div>
//                   <div className="flex justify-end">
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       disabled={updating}
//                     >
//                       {updating ? "Updating..." : "Change Password"}
//                     </button>
//                   </div>
//                 </form>
//               </div>

//               {/* Other Security Options
//               <div className="space-y-4">
//                 <button
//                   onClick={() => setIsResetPasswordOpen(true)}
//                   className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
//                 >
//                   <span>Reset Password</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path
//                       fillRule="evenodd"
//                       d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>

//                 <button
//                   onClick={() => setIsDeleteAccountOpen(true)}
//                   className="w-full flex justify-between items-center px-4 py-3 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
//                 >
//                   <span>Delete Account Profile</span>
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path
//                       fillRule="evenodd"
//                       d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </button>
//               </div> */}

//               {/* Modal Components */}
//               {/* <ResetPasswordModal isOpen={isResetPasswordOpen} onClose={() => setIsResetPasswordOpen(false)} />
//               <DeleteAccountModal isOpen={isDeleteAccountOpen} onClose={() => setIsDeleteAccountOpen(false)} /> */}
//             </div>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default Account



















"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "../Components/Layout/DashboardLayout"
import { useAuth } from "../contexts/AuthContext"
import { ChevronDown, Eye, EyeOff } from "lucide-react" // Import Eye and EyeOff icons
import axios from "axios"

function Account() {
  const [activeTab, setActiveTab] = useState("profileView")
  const { token, isAuthenticated } = useAuth()

  // Loading and error states
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Dropdown data
  const [chapters, setChapters] = useState([])
  const [programmes, setProgrammes] = useState([])
  const [courses, setCourses] = useState([])

  // Add these new state variables after the existing state declarations
  const [personalDetailsOpen, setPersonalDetailsOpen] = useState(false)
  const [publicProfileOpen, setPublicProfileOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [existingProfilePhoto, setExistingProfilePhoto] = useState(null)

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthMonth: "",
    maritalStatus: "",
    courseId: "",
    programmeId: "",
    graduationYear: "",
    location: "",
    chapterOfInterest: "",
    employmentStatus: "",
    placeOfWork: "",
    profilePhoto: null,
    bio: "",
    socials: [],
  })

  // Password change form
  const [passwordData, setPasswordData] = useState({
    password: "",
    passwordConfirmation: "",
  })

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Fetch user details from /my-details endpoint
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
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
          const userData = response.data.data

          // Get birth month from API response
          const birthMonth = userData.birth_month || ""

          setFormData({
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            birthMonth: birthMonth,
            maritalStatus: userData.marital_status || "",
            courseId: userData.course_id || "",
            programmeId: userData.programme_id || "",
            graduationYear: userData.graduation_year || "",
            location: userData.location || "",
            chapterOfInterest: userData.chapter_of_interest || "",
            employmentStatus: userData.employment_status || "",
            placeOfWork: userData.place_of_work || "",
            profilePhoto: null, // File input, will be set separately
            bio: userData.bio, // Not in API response, keeping empty
            socials: userData.socials || [],
          })

          // Set existing profile photo URL if available
          if (userData.profile_photo_url) {
            setExistingProfilePhoto(userData.profile_photo_url)
            setImagePreview(userData.profile_photo_url)
          }
        }
      } catch (err) {
        console.error("Error fetching user details:", err)
        setError("Failed to load user details. Please refresh the page.")
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [isAuthenticated, token])

  // Fetch dropdown data (chapters, programmes, courses)
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch Chapters
        const chaptersConfig = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/chapters",
          headers: { Accept: "application/json" },
        }
        const chaptersResponse = await axios.request(chaptersConfig)
        if (chaptersResponse.data.chapters && Array.isArray(chaptersResponse.data.chapters.data)) {
          setChapters(chaptersResponse.data.chapters.data)
        }

        // Fetch Programmes
        const programmesConfig = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/programmes",
          headers: {},
        }
        const programmesResponse = await axios.request(programmesConfig)
        if (Array.isArray(programmesResponse.data)) {
          setProgrammes(programmesResponse.data)
        }

        // Fetch Courses
        const coursesConfig = {
          method: "get",
          maxBodyLength: Number.POSITIVE_INFINITY,
          url: "https://unizikalumni-api.tfnsolutions.us/api/courses",
          headers: {},
        }
        const coursesResponse = await axios.request(coursesConfig)
        if (Array.isArray(coursesResponse.data)) {
          setCourses(coursesResponse.data)
        }
      } catch (err) {
        console.error("Error fetching dropdown data:", err)
      }
    }

    fetchDropdownData()
  }, [])

  // Replace the existing handleChange function with this updated version
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profilePhoto") {
      const file = files[0]
      setFormData((prev) => ({ ...prev, [name]: file }))

      // Create image preview
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(file)
      } else {
        setImagePreview(null)
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
    // Clear messages on input change
    if (error) setError(null)
    if (success) setSuccess(null)
  }

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...formData.socials]

    // If changing the platform, set a default URL structure
    if (field === "platform") {
      let baseUrl = ""
      switch (value) {
        case "Instagram":
          baseUrl = "https://instagram.com/"
          break
        case "Facebook":
          baseUrl = "https://facebook.com/"
          break
        case "X":
          baseUrl = "https://x.com/"
          break
        case "LinkedIn":
          baseUrl = "https://linkedin.com/in/"
          break
        case "TikTok":
          baseUrl = "https://tiktok.com/@"
          break
        case "Github":
          baseUrl = "https://github.com/"
          break
        default:
          baseUrl = ""
      }

      updatedSocials[index] = {
        ...updatedSocials[index],
        [field]: value,
        url: baseUrl,
      }
    } else {
      updatedSocials[index] = { ...updatedSocials[index], [field]: value }
    }

    setFormData((prev) => ({ ...prev, socials: updatedSocials }))
  }

  const addNewSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "", url: "" }],
    }))
  }

  const removeSocial = (index) => {
    const updatedSocials = formData.socials.filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, socials: updatedSocials }))
  }

  // Handle profile update submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated || !token) {
      setError("You must be logged in to update your profile.")
      return
    }

    // Client-side validation for "Place of Work"
    if (formData.employmentStatus === "employed" && !formData.placeOfWork.trim()) {
      setError("Place of Work is required when your Employment Status is 'Employed'.")
      window.scrollTo({ top: 0, behavior: "smooth" })
      setUpdating(false); // Ensure updating state is reset
      return
    }


    setUpdating(true)
    setError(null)
    setSuccess(null)

    const data = new FormData()

    // Map form data to API expected field names
    data.append("first_name", formData.firstName)
    data.append("last_name", formData.lastName)
    data.append("email", formData.email)
    data.append("phone", formData.phone)

    data.append("birth_month", formData.birthMonth)

    data.append("marital_status", formData.maritalStatus)
    data.append("course_id", formData.courseId)
    data.append("programme_id", formData.programmeId)
    data.append("graduation_year", formData.graduationYear)
    data.append("location", formData.location)
    data.append("chapter_of_interest", formData.chapterOfInterest)
    data.append("employment_status", formData.employmentStatus)
    data.append("place_of_work", formData.placeOfWork)

    if (formData.profilePhoto) {
      data.append("profile_photo", formData.profilePhoto)
    }

    data.append("bio", formData.bio)

    // Handle socials
    formData.socials.forEach((social, index) => {
      if (social.platform && social.url) {
        data.append(`socials[${index}][platform]`, social.platform)
        data.append(`socials[${index}][url]`, social.url)
      }
    })

    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/profile/update",
        headers: {
          Authorization: `Bearer ${token}`,
          // FormData automatically sets Content-Type with boundary
        },
        data: data,
      }

      const response = await axios.request(config)
      console.log("Profile update response:", response.data)
      setSuccess("Profile updated successfully!")
    } catch (err) {
      console.error("Profile update error:", err)
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors).flat().join(". ")
          setError(err.response.data.message + ": " + errorMessages)
        } else {
          setError(err.response.data.message || "Profile update failed. Please try again.")
        }
      } else {
        setError("Profile update failed. Please check your network and try again.")
      }
    } finally {
      setUpdating(false)
    }
  }

  // Handle password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated || !token) {
      setError("You must be logged in to change your password.")
      return
    }

    if (passwordData.password !== passwordData.passwordConfirmation) {
      setError("Passwords do not match.")
      return
    }

    if (passwordData.password.length < 8) {
      setError("Password must be at least 8 characters long.")
      return
    }

    setUpdating(true)
    setError(null)
    setSuccess(null)

    try {
      const data = JSON.stringify({
        password: passwordData.password,
        password_confirmation: passwordData.passwordConfirmation,
      })

      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/password/update",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      }

      const response = await axios.request(config)
      console.log("Password update response:", response.data)
      setSuccess("Password updated successfully!")
      setPasswordData({ password: "", passwordConfirmation: "" })
    } catch (err) {
      console.error("Password update error:", err)
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Password update failed. Please try again.")
      } else {
        setError("Password update failed. Please check your network and try again.")
      }
    } finally {
      setUpdating(false)
    }
  }

  // Generate years for graduation year dropdown
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  // Get course and programme names for display
  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId)
    return course ? course.name : ""
  }

  const getProgrammeName = (programmeId) => {
    const programme = programmes.find((p) => p.id === programmeId)
    return programme ? `${programme.name} (${programme.level})` : ""
  }

  const getChapterName = (chapterId) => {
    const chapter = chapters.find((c) => c.id === chapterId)
    return chapter ? chapter.name : ""
  }

  useEffect(() => {
    if (error || success) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [error, success])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="w-full mx-auto px-8 py-3">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading user details...</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="w-full mx-auto px-8 py-3">
        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
        )}

        {/* Tabs */}
        <div className="flex justify-center border-b">
          <button
            className={`px-4 py-2 ${activeTab === "profileView" ? "border-b-2 border-[#D85E00] text-[#D85E00]" : "text-gray-500"}`}
            onClick={() => setActiveTab("profileView")}
          >
            Public Profile View
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "security" ? "border-b-2 border-[#D85E00] text-[#D85E00]" : "text-gray-500"}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>

        <div className="mt-8">
          {/* Profile View Tab */}
          {activeTab === "profileView" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details Section */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPersonalDetailsOpen(!personalDetailsOpen)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-lg font-medium">Personal Details</h2>
                  <ChevronDown className={`w-5 h-5 transition-transform ${personalDetailsOpen ? "rotate-180" : ""}`} />
                </button>

                {personalDetailsOpen && (
                  <div className="p-4 border-t border-gray-200 space-y-6">
                    {/* Profile Photo */}
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                      {imagePreview || existingProfilePhoto ? (
                        <img
                          src={imagePreview || existingProfilePhoto || "/placeholder.svg"}
                          alt="Profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>

                    <div>
                      <label htmlFor="profilePhoto" className="text-gray-600 flex items-center cursor-pointer">
                        Upload Photo
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </label>
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        disabled={updating}
                      />
                    </div>

                    {/* Personal Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          disabled={updating}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          disabled={updating}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={updating}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={updating}
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Public Profile View Section */}
              <div className="border border-gray-200 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPublicProfileOpen(!publicProfileOpen)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <h2 className="text-lg font-medium">Public Profile View</h2>
                  <ChevronDown className={`w-5 h-5 transition-transform ${publicProfileOpen ? "rotate-180" : ""}`} />
                </button>

                {publicProfileOpen && (
                  <div className="p-4 border-t border-gray-200 space-y-6">
                    <div>
                      <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700 mb-1">
                        Birth Month
                      </label>
                      <div className="relative">
                        <select
                          id="birthMonth"
                          name="birthMonth"
                          value={formData.birthMonth}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                          disabled={updating}
                        >
                          <option value="">Select month</option>
                          <option value="january">January</option>
                          <option value="february">February</option>
                          <option value="march">March</option>
                          <option value="april">April</option>
                          <option value="may">May</option>
                          <option value="june">June</option>
                          <option value="july">July</option>
                          <option value="august">August</option>
                          <option value="september">September</option>
                          <option value="october">October</option>
                          <option value="november">November</option>
                          <option value="december">December</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        Marital Status
                      </label>
                      <div className="relative">
                        <select
                          id="maritalStatus"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                          disabled={updating}
                        >
                          <option value="">Select status</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        placeholder="e.g. Lagos, Nigeria"
                        disabled={updating}
                      />
                    </div>

                    {/* Academic Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
                          Year of Graduation
                        </label>
                        <div className="relative">
                          <select
                            id="graduationYear"
                            name="graduationYear"
                            value={formData.graduationYear}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                            disabled={updating}
                          >
                            <option value="">Select year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                          Course of Study
                        </label>
                        <div className="relative">
                          <select
                            id="courseId"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                            disabled={updating}
                          >
                            <option value="">Select course</option>
                            {courses.map((course) => (
                              <option key={course.id} value={course.id}>
                                {course.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="programmeId" className="block text-sm font-medium text-gray-700 mb-1">
                          Programme
                        </label>
                        <div className="relative">
                          <select
                            id="programmeId"
                            name="programmeId"
                            value={formData.programmeId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                            disabled={updating}
                          >
                            <option value="">Select programme</option>
                            {programmes.map((programme) => (
                              <option key={programme.id} value={programme.id}>
                                {programme.name} ({programme.level})
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    </div>

                    {/* Professional Details */}
                    <div>
                      <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                        Employment Status
                      </label>
                      <div className="relative">
                        <select
                          id="employmentStatus"
                          name="employmentStatus"
                          value={formData.employmentStatus}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                          disabled={updating}
                        >
                          <option value="">Select option</option>
                          <option value="employed">Employed</option>
                          <option value="self-employed">Self-employed</option>
                          <option value="unemployed">Unemployed</option>
                          <option value="retired">Retired</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>

                    {(formData.employmentStatus === "employed" || formData.employmentStatus === "self-employed") && (
                      <div>
                        <label htmlFor="placeOfWork" className="block text-sm font-medium text-gray-700 mb-1">
                          Place of Work
                        </label>
                        <input
                          type="text"
                          id="placeOfWork"
                          name="placeOfWork"
                          value={formData.placeOfWork}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Enter workplace"
                          disabled={updating}
                        />
                      </div>
                    )}

                    {/* Bio */}
                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                        BIO
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        placeholder="Enter your bio..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={updating}
                      ></textarea>
                    </div>

                    {/* Socials */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Social Media</h3>

                      {formData.socials.map((social, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border border-gray-200 rounded-md"
                        >
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                            <div className="relative">
                              <select
                                value={social.platform}
                                onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                                disabled={updating}
                              >
                                <option value="">Select platform</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Facebook">Facebook</option>
                                <option value="X">X</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="TikTok">TikTok</option>
                                <option value="Github">Github</option>
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={social.url}
                                onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="https://..."
                                disabled={updating}
                              />
                              <button
                                type="button"
                                onClick={() => removeSocial(index)}
                                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                disabled={updating}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addNewSocial}
                        className="flex items-center text-[#D85E00] mt-2 hover:text-[#C04D00] transition-colors"
                        disabled={updating}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add Social Media
                      </button>
                    </div>

                    <div>
                      <label htmlFor="chapterOfInterest" className="block text-sm font-medium text-gray-700 mb-1">
                        Chapter
                      </label>
                      <div className="relative">
                        <select
                          id="chapterOfInterest"
                          name="chapterOfInterest"
                          value={formData.chapterOfInterest}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                          disabled={updating}
                        >
                          <option value="">Select chapter</option>
                          {chapters.map((chapter) => (
                            <option key={chapter.id} value={chapter.id}>
                              {chapter.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={updating}
                >
                  {updating ? "Updating" : "Update Profile"}
                </button>
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-0">
              {/* Password Change Form */}
              <div className="bg-gray-50 rounded-lg"> {/* Added padding for better spacing */}
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <div className="relative"> {/* Added relative for positioning eye icon */}
                      <input
                        type={showPassword ? "text" : "password"} // Toggle type
                        id="password"
                        name="password"
                        value={passwordData.password}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10" // Added pr-10 for icon space
                        placeholder="Enter new password (min. 8 characters)"
                        disabled={updating}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative"> {/* Added relative for positioning eye icon */}
                      <input
                        type={showConfirmPassword ? "text" : "password"} // Toggle type
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={passwordData.passwordConfirmation}
                        onChange={handlePasswordChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10" // Added pr-10 for icon space
                        placeholder="Confirm new password"
                        disabled={updating}
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={updating}
                    >
                      {updating ? "Updating..." : "Change Password"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Other Security Options (commented out as per original file) */}
              {/* <div className="space-y-4">
                <button
                  onClick={() => setIsResetPasswordOpen(true)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span>Reset Password</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setIsDeleteAccountOpen(true)}
                  className="w-full flex justify-between items-center px-4 py-3 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                >
                  <span>Delete Account Profile</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div> */}

              {/* Modal Components (commented out as per original file) */}
              {/* <ResetPasswordModal isOpen={isResetPasswordOpen} onClose={() => setIsResetPasswordOpen(false)} />
              <DeleteAccountModal isOpen={isDeleteAccountOpen} onClose={() => setIsDeleteAccountOpen(false)} /> */}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Account
