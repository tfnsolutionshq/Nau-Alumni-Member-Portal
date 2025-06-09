"use client"

import DashboardLayout from "../../Components/Layout/DashboardLayout"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import axios from "axios"
import { Link, useParams } from "react-router-dom" // Import useParams

function AllDonatorsForProject() { // Renamed component for clarity
    const { id } = useParams(); // Get the donation ID from the URL
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    const [donatorsForCurrentProject, setDonatorsForCurrentProject] = useState([]) // State to hold donators for the specific project
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [donationTitle, setDonationTitle] = useState("Selected Donation"); // State to store the donation's title

    useEffect(() => {
        const fetchDonationDonators = async () => {
            setLoading(true)
            setError(null)
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    // Endpoint for a single donation, which contains its donators
                    url: `https://unizikalumni-api.tfnsolutions.us/api/donations/donation?donation_id=${id}`,
                    headers: {
                        'Accept': 'application/json'
                    }
                };
                const response = await axios.request(config);

                // Assuming the response directly contains the donation object
                if (response.data) {
                    setDonationTitle(response.data.title || "Unknown Donation"); // Set the donation title
                    if (response.data.donators && Array.isArray(response.data.donators)) {
                        // Filter donators to ensure they have member data, or default to anonymous
                        const formattedDonators = response.data.donators.map(donator => ({
                            ...donator,
                            // Ensure member data is consistent for display
                            member: donator.member || { first_name: '', last_name: 'Anonymous' }
                        }));
                        setDonatorsForCurrentProject(formattedDonators);
                    } else {
                        setDonatorsForCurrentProject([]);
                        setError("No donators found for this donation or invalid data format.");
                    }
                } else {
                    setDonatorsForCurrentProject([]);
                    setError("Donation not found.");
                    setDonationTitle("Donation Not Found");
                }
            } catch (err) {
                console.error("Error fetching donators for project:", err);
                setError("Failed to load donators for this project. Please try again later.");
                setDonatorsForCurrentProject([]);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDonationDonators();
        } else {
            setLoading(false);
            setError("No donation ID provided in the URL.");
            setDonationTitle("No Donation Selected");
        }
    }, [id]); // Re-run effect when the donation ID changes

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

    const filteredDonators = donatorsForCurrentProject.filter((donator) => {
        const donatorName = `${donator.member?.first_name || ''} ${donator.member?.last_name || 'Anonymous'}`.toLowerCase();
        const amount = donator.amount?.toString().toLowerCase() || '';
        const searchTermLower = searchTerm.toLowerCase();

        return (
            donatorName.includes(searchTermLower) ||
            amount.includes(searchTermLower)
        );
    });

    // Pagination logic
    const itemsPerPage = 10;
    const totalItems = filteredDonators.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDonators = filteredDonators.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPaginationButtons = () => {
        const buttons = [];
        if (totalPages >= 1) {
            buttons.push(1);
        }

        if (currentPage > 2 && totalPages > 3) {
            buttons.push('...');
        }

        if (currentPage > 1 && currentPage < totalPages) {
            buttons.push(currentPage);
        }

        if (currentPage < totalPages - 1 && totalPages > 3) {
            buttons.push('...');
        }

        if (totalPages > 1 && !buttons.includes(totalPages)) {
            buttons.push(totalPages);
        }

        return buttons.map((page, index) => (
            page === '...' ? (
                <span key={`ellipsis-${index}`} className="mx-1">...</span>
            ) : (
                <button
                    key={page}
                    className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 ${
                        currentPage === page
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

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-white">
                {/* Back Button */}
                <div className="py-4 px-6 border-b">
                    {/* Link back to the main donations listing or previous page */}
                    <Link to="/donations" className="flex w-fit text-sm shadow p-2 rounded items-center text-gray-600">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Go Back to Donations
                    </Link>
                </div>

                <div className="py-4 px-6">
                    {/* Header */}
                    <h1 className="text-2xl font-bold mb-6">Donators for: <span className="text-orange-500">{donationTitle}</span></h1>

                    {/* Search and Download */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search by donator name or amount..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-full md:w-80"
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

                    {/* Donators Table */}
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-500">Loading donators...</div>
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-red-500">{error}</div>
                        </div>
                    ) : filteredDonators.length === 0 ? (
                        <div className="flex justify-center items-center py-8">
                            <div className="text-gray-500">No donators found for this donation.</div>
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto border">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                                Donator Name
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
                                        {currentDonators.map((donator, index) => (
                                            <tr key={donator.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="py-4 px-4 text-sm text-gray-900">
                                                    {`${donator.member.first_name || ''} ${donator.member.last_name || 'Anonymous'}`.trim()}
                                                </td>
                                                <td className="py-4 px-4 text-sm text-gray-900">{formatDate(donator.donation_date)}</td>
                                                <td className="py-4 px-4 text-sm text-green-600 font-semibold">₦{parseFloat(donator.amount).toFixed(2)}</td>
                                                <td className="py-4 px-4 text-sm text-gray-900 text-right">
                                                    {donator.receipt_image_url && (
                                                        <a href={donator.receipt_image_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 flex items-center justify-end">
                                                            View Receipt
                                                            <ChevronRight className="h-4 w-4 ml-1" />
                                                        </a>
                                                    )}
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
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AllDonatorsForProject
