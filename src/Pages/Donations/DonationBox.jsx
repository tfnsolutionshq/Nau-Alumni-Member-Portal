import DashboardLayout from '../../Components/Layout/DashboardLayout';
import { ChevronRight } from "lucide-react"

function DonationBox() {

  // Sample donation projects data
  const projects = [
    {
      id: 1,
      title: "Udemba School Renovation",
      timeRemaining: "23:00:13",
      description:
        "Dr. Rita Orji is a Nigerian and, interestingly, one of Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie...",
    },
    {
      id: 2,
      title: "Udemba School Renovation",
      timeRemaining: "23:00:13",
      description:
        "Dr. Rita Orji is a Nigerian and, interestingly, one of Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie...",
    },
    {
      id: 3,
      title: "Udemba School Renovation",
      timeRemaining: "23:00:13",
      description:
        "Dr. Rita Orji is a Nigerian and, interestingly, one of Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie...",
    },
    {
      id: 4,
      title: "Udemba School Renovation",
      timeRemaining: "23:00:13",
      description:
        "Dr. Rita Orji is a Nigerian and, interestingly, one of Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie...",
    },
    {
      id: 5,
      title: "Udemba School Renovation",
      timeRemaining: "23:00:13",
      description:
        "Dr. Rita Orji is a Nigerian and, interestingly, one of Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie...",
    },
    {
      id: 6,
      title: "Udemba School Renovation",
      timeRemaining: "23:00:13",
      description:
        "Dr. Rita Orji is a Nigerian and, interestingly, one of Nnamdi Azikiwe University alumni who has attained success in her career as a in the department of computer science at Dalhousie...",
    },
  ]
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-4 md:p-6">
        {/* Header with Sort and View My Donations */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <button className="flex items-center text-gray-600 border border-gray-300 rounded px-3 py-2 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
              Sort By
            </button>
          </div>
          <button className="bg-[#FF6900] text-white rounded px-4 py-2 text-sm flex items-center">
            View My Donations
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className=" p-2 border border-gray-200 overflow-hidden">
              {/* Project Image */}
              <div className="bg-gray-200 h-48 w-full"></div>

              {/* Project Content */}
              <div className="py-3 px-1">
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                <p className="text-gray-700 text-sm mb-3"><span className="bg-[#EDEBEE] p-1 rounded">{project.timeRemaining}</span></p>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                <a href="#" className="text-sm text-blue-900 hover:underline">
                  See More
                </a>
                <hr className='mt-3'/>
                {/* Donate Button */}
                <div className="pt-3 flex justify-between items-center">
                  <a href="#" className="text-[#D85E00] text-sm font-medium">
                    DONATE HERE
                  </a>
                  <ChevronRight className="h-4 w-4 text-[#D85E00]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DonationBox;