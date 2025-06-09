"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "../Components/Layout/DashboardLayout"
import { ResetPasswordModal, DeleteAccountModal } from "../Components/Security/SecurityModals"
import { useAuth } from "../contexts/AuthContext"
import { ChevronDown } from "lucide-react"
import axios from "axios"

function Account() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
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
    // Profile view specific fields
    bio: "",
    career: "",
    positionHeld: "",
  })

  // Password change form
  const [passwordData, setPasswordData] = useState({
    password: "",
    passwordConfirmation: "",
  })

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

          // Format birth date from API response
          let formattedBirthDate = ""
          if (userData.birth_month) {
            try {
              const birthDate = new Date(userData.birth_month)
              formattedBirthDate = birthDate.toISOString().split("T")[0] // Format as YYYY-MM-DD
            } catch (e) {
              console.error("Error formatting birth date:", e)
            }
          }

          setFormData({
            firstName: userData.first_name || "",
            lastName: userData.last_name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            birthMonth: formattedBirthDate,
            maritalStatus: userData.marital_status || "",
            courseId: userData.course_id || "",
            programmeId: userData.programme_id || "",
            graduationYear: userData.graduation_year || "",
            location: userData.location || "",
            chapterOfInterest: userData.chapter_of_interest || "",
            employmentStatus: userData.employment_status || "",
            placeOfWork: userData.place_of_work || "",
            profilePhoto: null, // File input, will be set separately
            bio: "", // Not in API response, keeping empty
            career: "", // Not in API response, keeping empty
            positionHeld: "", // Not in API response, keeping empty
          })
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "profilePhoto") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
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

  // Handle profile update submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuthenticated || !token) {
      setError("You must be logged in to update your profile.")
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

    // Format birth date for API
    if (formData.birthMonth) {
      try {
        const dateObj = new Date(formData.birthMonth)
        data.append("birth_month", dateObj.toISOString())
      } catch (e) {
        data.append("birth_month", "")
      }
    } else {
      data.append("birth_month", "")
    }

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

    try {
      const config = {
        method: "post",
        maxBodyLength: Number.POSITIVE_INFINITY,
        url: "https://unizikalumni-api.tfnsolutions.us/api/members",
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
            className={`px-4 py-2 ${activeTab === "personal" ? "border-b-2 border-[#D85E00] text-[#D85E00]" : "text-gray-500"}`}
            onClick={() => setActiveTab("personal")}
          >
            Personal
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "security" ? "border-b-2 border-[#D85E00] text-[#D85E00]" : "text-gray-500"}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "profileView" ? "border-b-2 border-[#D85E00] text-[#D85E00]" : "text-gray-500"}`}
            onClick={() => setActiveTab("profileView")}
          >
            Profile View
          </button>
        </div>

        <div className="mt-8">
          {/* Personal Tab */}
          {activeTab === "personal" && (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <label htmlFor="birthMonth" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="birthMonth"
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={updating}
                />
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

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Changes"}
                </button>
              </div>
            </form>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              {/* Password Change Form */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={passwordData.password}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter new password (min. 8 characters)"
                      disabled={updating}
                      required
                      minLength={8}
                    />
                  </div>
                  <div>
                    <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      value={passwordData.passwordConfirmation}
                      onChange={handlePasswordChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Confirm new password"
                      disabled={updating}
                      required
                      minLength={8}
                    />
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

              {/* Other Security Options */}
              <div className="space-y-4">
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
              </div>

              {/* Modal Components */}
              <ResetPasswordModal isOpen={isResetPasswordOpen} onClose={() => setIsResetPasswordOpen(false)} />
              <DeleteAccountModal isOpen={isDeleteAccountOpen} onClose={() => setIsDeleteAccountOpen(false)} />
            </div>
          )}

          {/* Profile View Tab */}
          {activeTab === "profileView" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-lg font-medium">Profile Details</h2>

              {/* Profile Photo */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
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
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="profileFirstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="profileFirstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={updating}
                  />
                </div>
                <div>
                  <label htmlFor="profileLastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="profileLastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={updating}
                  />
                </div>
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
                <label htmlFor="career" className="block text-sm font-medium text-gray-700 mb-1">
                  Career
                </label>
                <input
                  type="text"
                  id="career"
                  name="career"
                  value={formData.career}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={updating}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div>
                  <label htmlFor="positionHeld" className="block text-sm font-medium text-gray-700 mb-1">
                    Position Held
                  </label>
                  <input
                    type="text"
                    id="positionHeld"
                    name="positionHeld"
                    value={formData.positionHeld}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={updating}
                  />
                </div>
              </div>

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

              {/* Socials - Commented Out */}
              {/*
              <div>
                <h3 className="text-lg font-medium mb-4">Socials</h3>

                {formData.socials.map((social, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Social</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={social.platform}
                          onChange={(e) => handleSocialChange(index, "platform", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input
                        type="text"
                        value={social.url}
                        onChange={(e) => handleSocialChange(index, "url", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}

                <button type="button" onClick={addNewSocial} className="flex items-center text-[#D85E00] mt-2">
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
                  Add New
                </button>
              </div>
              */}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={updating}
                >
                  {updating ? "Publishing..." : "Publish"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Account
