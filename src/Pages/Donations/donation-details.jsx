import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function DonationDetail() {
    // Sample donation data
    const donation = {
        title: "Udemba School Renovation",
        postedDate: "June 17, 2023",
        timeRemaining: "23:00:13",
        totalContributions: "₦891,900",
        totalParticipations: "1,900",
        description:
            "Dr. Rita Orji is a Nigerian and, interestingly, one of Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie. Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie. Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie. Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dartmouth Azikiwe Uni",
    }

    // Sample donations list
    const donationsList = [
        { name: "Uche ThankGod", date: "April 14, 2024", amount: "N100,000"   },
        { name: "Anonymous Participant", date: "April 14, 2024", amount: "N100,000"  },
        { name: "Anonymous Participant", date: "April 14, 2024", amount: "N100,000"  },
        { name: "Anonymous Participant", date: "April 14, 2024", amount: "N100,000"  },
        { name: "Anonymous Participant", date: "April 14, 2024", amount: "N100,000"  },
    ]

    // Sample recent donations
    const recentDonations = [
        {
            title: "Udemba School Renovation",
            date: "17 AUG 2023",
        },
        {
            title: "Udemba School Renovation",
            date: "17 AUG 2023",
        },
        {
            title: "Udemba School Renovation",
            date: "17 AUG 2023",
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

                <div className="max-w-6xl mx-auto py-6 px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h1 className="text-2xl font-bold">{donation.title}</h1>
                        <div>
                            <hr className="w-56 mb-2 bg-[#D15300] h-0.5" />
                            <a href="#" className="text-[#D15300] flex items-center justify-between font-medium mt-2 md:mt-0">
                                DONATE HERE
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </a>
                        </div>
                    </div>

                    {/* Project Image */}
                    <div className="w-full h-72 bg-gray-200 mb-6"></div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Description and Donation List */}
                        <div className="lg:col-span-2">
                            {/* Posted Date */}
                            <div className="flex items-center mb-4">
                                <span className="text-sm text-gray-500">Posted: {donation.postedDate}</span>
                            </div>

                            {/* Project Description */}
                            <p className="text-sm text-gray-900 mb-4">{donation.description}</p>
                            
                            <a href="#" className="text-[#D85E00] text-sm">
                                See More
                            </a>

                            {/* Donation List */}
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold">Donation List</h2>
                                    <a href="#" className="text-[#D85E00] text-sm">
                                        SEE ALL
                                    </a>
                                </div>

                                <div className="overflow-x-auto bg-[#F7F7F8] rounded">
                                    <table className="min-w-full">
                                        <tbody>
                                            {donationsList.map((donation, index) => (
                                                <tr key={index} className="border-b border-gray-100 bg-white">
                                                    <td className="py-3 px-2 text-sm">{donation.name}</td>
                                                    <td className="py-3 px-2 text-sm text-gray-500">{donation.date}</td>
                                                    <td className="py-3 px-2 text-sm text-[#007038] font-medium">{donation.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="mt-8 text-sm text-gray-700">
                                <p className="mb-2">For enquiries, reach out to:</p>
                                <p className="mb-1">Hotline: +2348096468647</p>
                                <p>Whatsapp: +2348988839130</p>
                            </div>
                        </div>

                        {/* Right Column - Stats and Recent Donations */}
                        <div className="lg:col-span-1">
                            {/* Stats */}
                            <div className="bg-[#FCFCFC] border border-gray-200 p-4 mb-6">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                    <span className="text-sm">Closes In</span>
                                    <span className="font-base text-sm p-1 bg-[#EDEBEE] rounded">{donation.timeRemaining}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                    <span className="text-sm">Total Contributions</span>
                                    <span className="font-medium">{donation.totalContributions}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm">Total Participations</span>
                                    <span className="font-medium">{donation.totalParticipations}</span>
                                </div>
                                <hr className="h-0.5 bg-[#D15300] mb-3 mt-8"/>
                                <a href="#" className="w-full flex items-center justify-between text-[#D85E00] font-medium mt-2">
                                    <span>DONATE HERE</span>
                                    <ChevronRight className="h-4 w-4" />
                                </a>
                            </div>

                            {/* Recent Donations */}
                            <div>
                                <h3 className="font-medium mb-4">RECENT DONATIONS</h3>
                                <div className="space-y-4">
                                    {recentDonations.map((donation, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                                            <div>
                                                <h4 className="font-medium text-sm">{donation.title}</h4>
                                                <p className="text-xs text-gray-500">{donation.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
