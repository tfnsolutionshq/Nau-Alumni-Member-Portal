import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState } from "react"
import { ChevronLeft } from "lucide-react"

function Alldonations() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")

    // Sample donations data
    const donations = [
        {
            donator: "Anonymous Participant",
            date: "April 14, 2025",
            amount: "N100,000.00",
        },
        {
            donator: "Uche ThankGod Chukwuebuka",
            date: "April 14, 2025",
            amount: "N400,000.00",
            highlight: true,
        },
        {
            donator: "Uche ThankGod Chukwuebuka",
            date: "April 14, 2025",
            amount: "N10,000.00",
        },
        {
            donator: "Uche ThankGod Chukwuebuka",
            date: "April 14, 2025",
            amount: "N70,000.00",
            highlight: true,
        },
        {
            donator: "Uche ThankGod Chukwuebuka",
            date: "April 14, 2025",
            amount: "N800,000.00",
        },
        {
            donator: "Anonymous Participant",
            date: "April 14, 2025",
            amount: "N400,000.00",
            highlight: true,
        },
        {
            donator: "Uche ThankGod Chukwuebuka",
            date: "April 14, 2025",
            amount: "N300,000.00",
        },
        {
            donator: "Anonymous Participant",
            date: "April 14, 2025",
            amount: "N100,000.00",
            highlight: true,
        },
    ]
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

                <div className="py-4 px-6">
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
                    <div className="overflow-x-auto border">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Donator
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Donation Date
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {donations.map((donation, index) => (
                                    <tr key={index} className={donation.highlight ? "bg-blue-50" : "bg-white"}>
                                        <td className="py-4 px-4 text-sm text-gray-900">{donation.donator}</td>
                                        <td className="py-4 px-4 text-sm text-gray-900">{donation.date}</td>
                                        <td className="py-4 px-4 text-sm text-green-600 font-semibold">{donation.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Alldonations