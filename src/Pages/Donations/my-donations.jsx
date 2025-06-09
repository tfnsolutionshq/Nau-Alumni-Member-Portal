"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react" // Import useEffect
import { ChevronLeft, ChevronRight } from "lucide-react"
import axios from "axios" // Import axios
import { useAuth } from "../../contexts/AuthContext" // Import useAuth
import { Link } from "react-router-dom" // Import Link for navigation

function Mydonations() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [donations, setDonations] = useState([]) // State for fetched donations
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token, isAuthenticated, loading: authLoading } = useAuth() // Get auth state and token

  useEffect(() => {
    const fetchMyDonations = async () => {
      setLoading(true)
      setError(null)

      // Ensure authentication is ready and token is available
      if (authLoading) return; // Wait until auth state is resolved
      if (!isAuthenticated || !token) {
        setError("Please log in to view your donations.")
        setLoading(false)
        return
      }

      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://unizikalumni-api.tfnsolutions.us/api/member/donations', // Endpoint for logged-in member's donations
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` // Include Authorization header
          }
        };
        const response = await axios.request(config);

        if (response.data && Array.isArray(response.data.data)) {
          setDonations(response.data.data);
        } else {
          setDonations([]);
          setError("Invalid donations data format.");
        }
      } catch (err) {
        console.error("Error fetching my donations:", err);
        if (err.response?.status === 401) {
          setError("Authentication failed. Please log in again.");
        } else {
          setError("Failed to load your donations. Please try again later.");
        }
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyDonations();
  }, [token, isAuthenticated, authLoading]); // Re-run when token or auth state changes

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const filteredDonations = donations.filter((donation) => {
    const donatorName = `${donation.member?.first_name || ''} ${donation.member?.last_name || ''}`.toLowerCase();
    const donationTitle = donation.title?.toLowerCase() || ''; // Assuming title is directly on the donation object
    const searchTermLower = searchTerm.toLowerCase();

    return donatorName.includes(searchTermLower) || donationTitle.includes(searchTermLower);
  });

  const totalItems = filteredDonations.length
  // Simple pagination for display, actual API pagination would be needed for large datasets
  const itemsPerPage = 10; // Example
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDonations = filteredDonations.slice(startIndex, endIndex);

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    // Always show first page
    buttons.push(1);

    // Show ellipsis if there's a gap between 1 and current page
    if (currentPage > 2 && totalPages > 3) {
      buttons.push('...');
    }

    // Show current page if not 1 or totalPages
    if (currentPage > 1 && currentPage < totalPages) {
      buttons.push(currentPage);
    }

    // Show ellipsis if there's a gap between current page and last page
    if (currentPage < totalPages - 1 && totalPages > 3) {
      buttons.push('...');
    }

    // Show last page if there is more than one page
    if (totalPages > 1) {
      buttons.push(totalPages);
    }

    // Filter out duplicate page numbers and '...'
    const uniqueButtons = [...new Set(buttons)];

    return uniqueButtons.map((page, index) => (
      page === '...' ? (
        <span key={index} className="mx-1">...</span>
      ) : (
        <button
          key={page}
          className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 ${currentPage === page
              ? "bg-gray-200 text-gray-800 font-medium"
              : "border border-gray-300 text-gray-600"
            }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      )
    ));
  };


  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center">Loading authentication...</div>
      </DashboardLayout>
    )
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="min-h-screen px-6 py-4 flex justify-center items-center text-red-600">
          Please log in to view your donations.
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="py-4 px-6 border-b">
          <Link to="/donations" className="flex text-sm w-fit shadow p-2 rounded items-center text-gray-600">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Go Back
          </Link>
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
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">Loading your donations...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-red-500">{error}</div>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-500">You have no donations yet.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-[#F2F2F2]">
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
                  {currentDonations.map((donationItem) => (
                    <tr key={donationItem.id} className="bg-white">

                      <td className="py-4 px-4 text-sm font-medium">
                        <div className="">
                          {donationItem.title || 'N/A'}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-900">{donationItem.donators && donationItem.donators.length > 0
                        ? formatDate(donationItem.donators[0].donation_date)
                        : 'No date available'
                      }</td>
                      <td className="py-4 px-4 text-sm text-[#007038] font-medium">₦{donationItem.donators?.[0]?.amount || '0.00'}</td>
                      <td className="py-4 px-4 text-sm text-gray-900 text-right">
                        {donationItem.receipt_image_url && (
                          <a href={donationItem.receipt_image_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center justify-end">
                            Download Receipt
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <div className="text-sm text-gray-700 mb-4 md:mb-0">Total: {totalItems}</div>

            <div className="flex items-center">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {renderPaginationButtons()}

              <button
                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="text-sm text-gray-700 mt-4 md:mt-0 md:ml-4">{itemsPerPage} / page</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Mydonations
