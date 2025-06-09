"use client"

import { Link } from 'react-router-dom';
import DashboardLayout from '../../Components/Layout/DashboardLayout';
import { ChevronRight } from "lucide-react"
import { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios'; // Import axios

function DonationBox() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://unizikalumni-api.tfnsolutions.us/api/donations', // Endpoint for all donations
          headers: {
            'Accept': 'application/json'
          }
        };
        const response = await axios.request(config);
        if (response.data && Array.isArray(response.data.data)) {
          setProjects(response.data.data);
        } else {
          setProjects([]);
          setError("Invalid donations data format.");
        }
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to load donations. Please try again later.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const calculateTimeRemaining = (endDate) => {
    if (!endDate) return "N/A";
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime(); // Difference in milliseconds

    if (diff <= 0) {
      return "Closed";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-gray-500">Loading donations...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="text-red-500">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

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
          <Link to={`/my-donations`} className="text-sm text-blue-900 hover:underline">
            <button className="bg-[#FF6900] text-white rounded px-4 py-2 text-sm flex items-center">
              View My Donations
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </Link>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-gray-500 text-center py-10">No donation projects available.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className=" p-2 border border-gray-200 overflow-hidden">
                {/* Project Image */}
                <div className="h-48 w-full relative">
                  <img
                    src={project.banner_image_url || "https://placehold.co/400x192/cccccc/ffffff?text=No+Image"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x192/cccccc/ffffff?text=No+Image";
                    }}
                  />
                </div>

                {/* Project Content */}
                <div className="py-3 px-1">
                  <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    <span className="bg-[#EDEBEE] p-1 rounded">
                      {calculateTimeRemaining(project.end_date)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                  <Link to={`/donation-details/${project.id}`} className="text-sm text-blue-900 hover:underline">
                    See More
                  </Link>
                  <hr className='mt-3'/>
                  {/* Donate Button */}
                  <div className="pt-3 flex justify-between items-center">
                    <Link to={`/donation-details/${project.id}`} className="text-[#D85E00] text-sm font-medium">
                      DONATE HERE
                    </Link>
                    <ChevronRight className="h-4 w-4 text-[#D85E00]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DonationBox;
