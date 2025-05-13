import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

function Mydonations() {
    const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")

  // Sample donations data
  const donations = [
    {
      donator: "Uche ThankGod Chukwuebuka",
      donation: "Udemba School Renovation",
      date: "April 14, 2025",
      amount: "N200,000.00",
    },
    {
      donator: "Uche ThankGod Chukwuebuka",
      donation: "Udemba School Renovation",
      date: "April 14, 2025",
      amount: "N200,000.00",
    },
    {
      donator: "Uche ThankGod Chukwuebuka",
      donation: "Udemba School Renovation",
      date: "April 14, 2025",
      amount: "N200,000.00",
    },
    {
      donator: "Uche ThankGod Chukwuebuka",
      donation: "Udemba School Renovation",
      date: "April 14, 2025",
      amount: "N200,000.00",
    },
  ]

  const totalItems = 48
  const totalPages = 5

  return (
    <DashboardLayout>
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="py-4 px-6 border-b">
        <button className="flex text-sm shadow p-2 rounded items-center text-gray-600">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Go Back
        </button>
      </div>

      <div className="px-6 py-4">
        {/* Search and Download */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
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
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <button className="flex items-center text-gray-600 border border-gray-300 rounded px-3 py-2 text-sm w-full md:w-auto justify-between">
                <span>Sort By</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <button className="bg-[#D85E00] text-white rounded px-4 py-2 text-sm whitespace-nowrap">
              Download List
            </button>
          </div>
        </div>

        {/* Donations Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-[#F2F2F2]">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Donator
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Donation
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Donation Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-4 px-4 text-sm text-gray-900">{donation.donator}</td>
                  <td className="py-4 px-4 text-sm underline font-medium">
                    <a href="#" className=" hover:underline">
                      {donation.donation}
                    </a>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{donation.date}</td>
                  <td className="py-4 px-4 text-sm text-[#007038] font-medium">{donation.amount}</td>
                  <td className="py-4 px-4 text-sm text-gray-900 text-right">
                    <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center justify-end">
                      Download Receipt
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="text-sm text-gray-700 mb-4 md:mb-0">Total: {totalItems}</div>

          <div className="flex items-center">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300"
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 ${
                  currentPage === page
                    ? "bg-gray-200 text-gray-800 font-medium"
                    : "border border-gray-300 text-gray-600"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <span className="mx-1">...</span>

            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 mx-1">
              16
            </button>

            <button
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300"
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="text-sm text-gray-700 mt-4 md:mt-0 md:ml-4">2 / page</div>
        </div>
      </div>
    </div>
    </DashboardLayout>
  )
}

export default Mydonations