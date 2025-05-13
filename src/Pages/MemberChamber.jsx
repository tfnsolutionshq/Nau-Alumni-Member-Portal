import DashboardLayout from "../Components/Layout/DashboardLayout"
import { useState } from "react"

export default function NominationElectionPage() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("nomination")

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      {/* Tab Navigation */}
      <div className="flex justify-center pt-4 border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "nomination" ? "border-b-2 border-[#D85E00] font-medium text-[#D85E00]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("nomination")}
        >
          Nomination
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "election" ? "border-b-2 border-[#D85E00] font-medium text-[#D85E00]" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("election")}
        >
          Election
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-col items-center justify-center h-[80vh]">
        {activeTab === "nomination" ? (
          <div className="text-center">
            <h2 className="text-lg font-medium mb-1">No Nomination ongoing at the moment</h2>
            <p className="text-sm text-gray-500">Check back Later</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-medium mb-1">No Election at the moment</h2>
            <p className="text-sm text-gray-500">Check back Later</p>
          </div>
        )}
      </div>
    </div>
  </DashboardLayout>
  )
}
