import { useState } from 'react';
import DashboardLayout from '../Components/Layout/DashboardLayout';
import { ResetPasswordModal, DeleteAccountModal } from '../Components/Security/SecurityModals';

function Account() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "ThankGod",
    lastName: "Uche",
    dateOfBirth: "",
    email: "dgreatuc@gmail.com",
    contactNumber: "+234 706 979 0950",
    yearOfGraduation: "2019",
    courseOfStudy: "Electronics and Computer Engineering",
    programme: "MSC",
    career: "Senior Product Engineer",
    chapter: "Lagos",
    positionHeld: "IT Support",
    bio: "",
    socials: [{ platform: "LinkedIn", url: "LinkedIn.com/uche" }],
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle social media input changes
  const handleSocialChange = (index, field, value) => {
    const updatedSocials = [...formData.socials]
    updatedSocials[index] = { ...updatedSocials[index], [field]: value }
    setFormData((prev) => ({
      ...prev,
      socials: updatedSocials,
    }))
  }

  // Add new social media field
  const addNewSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "", url: "" }],
    }))
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <DashboardLayout>
      <div className="w-full mx-auto px-8 py-3">
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                placeholder="DD/MM/YYYY"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors"
              >
                Update Changes
              </button>
            </div>
          </form>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
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
            
            {/* Modal Components */}
            <ResetPasswordModal 
              isOpen={isResetPasswordOpen} 
              onClose={() => setIsResetPasswordOpen(false)} 
            />
            <DeleteAccountModal 
              isOpen={isDeleteAccountOpen} 
              onClose={() => setIsDeleteAccountOpen(false)} 
            />
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
              <button type="button" className="text-gray-600 flex items-center">
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
              </button>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Academic Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="yearOfGraduation" className="block text-sm font-medium text-gray-700 mb-1">
                  Year of Graduation
                </label>
                <input
                  type="text"
                  id="yearOfGraduation"
                  name="yearOfGraduation"
                  value={formData.yearOfGraduation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="courseOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                  Course of Study
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="courseOfStudy"
                    name="courseOfStudy"
                    value={formData.courseOfStudy}
                    onChange={handleChange}
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
                <label htmlFor="programme" className="block text-sm font-medium text-gray-700 mb-1">
                  Programme
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="programme"
                    name="programme"
                    value={formData.programme}
                    onChange={handleChange}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="chapter" className="block text-sm font-medium text-gray-700 mb-1">
                  Chapter
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="chapter"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleChange}
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
                <label htmlFor="positionHeld" className="block text-sm font-medium text-gray-700 mb-1">
                  Position Held
                </label>
                <input
                  type="text"
                  id="positionHeld"
                  name="positionHeld"
                  value={formData.positionHeld}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                placeholder="Enter your suggestion..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            {/* Socials */}
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

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#D85E00] text-white rounded-md hover:bg-[#C04D00] transition-colors"
              >
                Publish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </DashboardLayout>
  );
}

export default Account;