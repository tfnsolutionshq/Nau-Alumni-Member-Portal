// "use client"

// import { Link, useParams } from "react-router-dom"
// import DashboardLayout from "../../Components/Layout/DashboardLayout"
// import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useState, useEffect } from "react"
// import axios from "axios"

// export default function DonationDetail() {
//     const { id } = useParams() // Get the donation ID from the URL
//     const [donation, setDonation] = useState(null)
//     const [recentDonations, setRecentDonations] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     // Fetch details for the specific donation
//     useEffect(() => {
//         const fetchDonation = async () => {
//             setLoading(true)
//             setError(null)
//             try {
//                 const config = {
//                     method: 'get',
//                     maxBodyLength: Infinity,
//                     // Corrected URL as per your latest snippet for single donation details
//                     url: `https://unizikalumni-api.tfnsolutions.us/api/donations/donation?donation_id=${id}`,
//                     headers: {
//                         'Accept': 'application/json'
//                     }
//                 };
//                 const response = await axios.request(config);
//                 // The provided snippet shows the donation object directly at response.data
//                 if (response.data) {
//                     setDonation(response.data);
//                 } else {
//                     setDonation(null);
//                     setError("Donation not found or invalid response structure.");
//                 }
//             } catch (err) {
//                 console.error("Error fetching donation details:", err);
//                 setError("Failed to load donation details. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchRecentDonations = async () => {
//             try {
//                 const config = {
//                     method: 'get',
//                     maxBodyLength: Infinity,
//                     url: 'https://unizikalumni-api.tfnsolutions.us/api/donations', // Endpoint for all donations
//                     headers: {
//                         'Accept': 'application/json'
//                     }
//                 };
//                 const response = await axios.request(config);
//                 if (response.data && Array.isArray(response.data.data)) {
//                     // Filter out the current donation and get up to 3 recent ones
//                     const filtered = response.data.data.filter(item => item.id !== id);
//                     // Sort by created_at in descending order to get the latest
//                     const latest = filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 3);
//                     setRecentDonations(latest);
//                 } else {
//                     setRecentDonations([]);
//                 }
//             } catch (err) {
//                 console.error("Error fetching recent donations:", err);
//                 setRecentDonations([]);
//             }
//         };

//         if (id) {
//             fetchDonation();
//             fetchRecentDonations(); // Fetch recent donations regardless of ID
//         } else {
//             setLoading(false);
//             setError("No donation ID provided.");
//         }
//     }, [id]); // Re-run effect if ID changes

//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//             });
//         } catch (error) {
//             return dateString;
//         }
//     };

//     const calculateTimeRemaining = (endDate) => {
//         if (!endDate) return "N/A";
//         const now = new Date();
//         const end = new Date(endDate);
//         const diff = end.getTime() - now.getTime(); // Difference in milliseconds

//         if (diff <= 0) {
//             return "Closed";
//         }

//         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//         return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//     };

//     if (loading) {
//         return (
//             <DashboardLayout>
//                 <div className="min-h-screen bg-white flex justify-center items-center">
//                     <div className="text-gray-500">Loading donation details...</div>
//                 </div>
//             </DashboardLayout>
//         );
//     }

//     if (error) {
//         return (
//             <DashboardLayout>
//                 <div className="min-h-screen bg-white flex justify-center items-center">
//                     <div className="text-red-500">{error}</div>
//                 </div>
//             </DashboardLayout>
//         );
//     }

//     if (!donation) {
//         return (
//             <DashboardLayout>
//                 <div className="min-h-screen bg-white flex justify-center items-center">
//                     <div className="text-gray-500">Donation not found.</div>
//                 </div>
//             </DashboardLayout>
//         );
//     }

//     // Access donators array from the fetched donation object
//     const donatorsList = donation.donators || [];

//     return (
//         <DashboardLayout>
//             <div className="min-h-screen bg-white">
//                 {/* Back Button */}
//                 <div className="py-4 px-6 border-b">
//                     <Link to="/donations" className="flex text-sm w-fit shadow p-2 rounded items-center text-gray-600">
//                         <ChevronLeft className="h-4 w-4 mr-1" />
//                         Go Back
//                     </Link>
//                 </div>

//                 <div className="w-full mx-auto py-6 px-8">
//                     {/* Header */}
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
//                         <h1 className="text-2xl font-bold">{donation.title}</h1>
//                         <div>
//                             <hr className="w-56 mb-2 bg-[#D15300] h-0.5" />
//                             <a href="#" className="text-[#D15300] flex items-center justify-between font-medium mt-2 md:mt-0">
//                                 DONATE HERE
//                                 <ChevronRight className="h-4 w-4 ml-1" />
//                             </a>
//                         </div>
//                     </div>

//                     {/* Project Image */}
//                     <div className="w-full h-72 bg-gray-200 mb-6 relative overflow-hidden rounded-md">
//                         <img
//                             src={donation.banner_image_url || "https://placehold.co/800x288/cccccc/ffffff?text=No+Image"}
//                             alt={donation.title}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = "https://placehold.co/800x288/cccccc/ffffff?text=No+Image";
//                             }}
//                         />
//                     </div>

//                     {/* Main Content Grid */}
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                         {/* Left Column - Description and Donation List */}
//                         <div className="lg:col-span-2">
//                             {/* Posted Date */}
//                             <div className="flex items-center mb-4">
//                                 <span className="text-sm text-gray-500">Posted: {formatDate(donation.created_at)}</span>
//                             </div>

//                             {/* Project Description */}
//                             <p className="text-gray-900 mb-4">{donation.description}</p>

//                             <Link to={`/all-donations/${donation.id}`} className="text-[#D85E00]"> {/* Link to donators page */}
//                                 See All Donators
//                             </Link>

//                             {/* Donation List */}
//                             <div className="mt-8">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <h2 className="font-bold">Recent Donators</h2>
//                                     <Link to={`/all-donations/${donation.id}`} className="text-[#D85E00] text-sm">
//                                         SEE ALL
//                                     </Link>
//                                 </div>

//                                 <div className="overflow-x-auto bg-[#F7F7F8] rounded">
//                                     <table className="min-w-full">
//                                         <tbody>
//                                             {donatorsList.length === 0 ? (
//                                                 <tr>
//                                                     <td colSpan="3" className="py-3 px-2 text-gray-500 text-center">No donators yet.</td>
//                                                 </tr>
//                                             ) : (
//                                                 donatorsList.map((donator, index) => (
//                                                     <tr key={donator.id || index} className="border-b border-gray-100 bg-white">
//                                                         <td className="py-3 px-2">
//                                                             {/* Access first_name and last_name from the nested member object */}
//                                                             {donator.member?.first_name} {donator.member?.last_name || "Anonymous"}
//                                                         </td>
//                                                         <td className="py-3 px-2 text-gray-500">{formatDate(donator.donation_date)}</td>
//                                                         <td className="py-3 px-2 text-[#007038] font-medium">₦{parseFloat(donator.amount).toFixed(2)}</td>
//                                                     </tr>
//                                                 ))
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>

//                             {/* Contact Information */}
//                             <div className="mt-8 text-gray-700">
//                                 <p className="mb-2">For enquiries, reach out to:</p>
//                                 <p className="mb-1">Hotline: +2348096468647</p>
//                                 <p>Whatsapp: +2348988839130</p>
//                             </div>
//                         </div>

//                         {/* Right Column - Stats and Recent Donations */}
//                         <div className="lg:col-span-1">
//                             {/* Stats */}
//                             <div className="bg-[#FCFCFC] border border-gray-200 p-4 mb-6">
//                                 <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
//                                     <span className="">Closes In</span>
//                                     <span className="font-base text-sm p-1 bg-[#EDEBEE] rounded">{calculateTimeRemaining(donation.end_date)}</span>
//                                 </div>
//                                 <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
//                                     <span className="">Total Contributions</span>
//                                     <span className="font-medium">₦{parseFloat(donation.total_contribution).toFixed(2)}</span>
//                                 </div>
//                                 <div className="flex justify-between items-center mb-4">
//                                     <span className="text-sm">Total Participations</span>
//                                     <span className="font-medium">{donation.no_of_participants || 0}</span>
//                                 </div>
//                                 <hr className="h-0.5 bg-[#D15300] mb-3 mt-8"/>
//                                 <a href="#" className="w-full flex items-center justify-between text-[#D85E00] font-medium mt-2">
//                                     <span>DONATE HERE</span>
//                                     <ChevronRight className="h-4 w-4" />
//                                 </a>
//                             </div>

//                             {/* Recent Donations */}
//                             <div>
//                                 <h3 className="font-medium mb-4">RECENT DONATIONS</h3>
//                                 <div className="space-y-4">
//                                     {recentDonations.length === 0 ? (
//                                         <div className="text-gray-500 text-sm">No recent donations.</div>
//                                     ) : (
//                                         recentDonations.map((item) => (
//                                             <Link key={item.id} to={`/donation-details/${item.id}`} className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-md transition-colors">
//                                                 <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
//                                                     <img
//                                                         src={item.banner_image_url || "https://placehold.co/48x48/cccccc/ffffff?text=NoImg"}
//                                                         alt={item.title}
//                                                         className="w-full h-full object-cover"
//                                                         onError={(e) => {
//                                                             e.target.onerror = null;
//                                                             e.target.src = "https://placehold.co/48x48/cccccc/ffffff?text=NoImg";
//                                                         }}
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <h4 className="font-medium">{item.title}</h4>
//                                                     <p className="text-gray-500">Closes: {formatDate(item.end_date)}</p>
//                                                 </div>
//                                             </Link>
//                                         ))
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </DashboardLayout>
//     )
// }











"use client"

import { Link, useParams } from "react-router-dom"
import DashboardLayout from "../../Components/Layout/DashboardLayout" // Re-added DashboardLayout
import { ChevronLeft, ChevronRight, Home, Calendar, Loader2, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../../contexts/AuthContext" // Import useAuth

export default function DonationDetail() {
    const { id } = useParams() // Get the donation ID from the URL
    const [donationData, setDonationData] = useState(null)
    const [donationsList, setDonationsList] = useState([]) // State for individual donations to this project (latest 5)
    const [recentDonations, setRecentDonations] = useState([]) // State for recent *other fundraisers*
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState("Loading...") // State for the countdown
    const { token, isAuthenticated, loading: authLoading } = useAuth(); // Use useAuth

    // Function to calculate and format time remaining
    const calculateTimeRemaining = (endDateString) => {
        if (!endDateString) return "N/A";
        const now = new Date();
        const end = new Date(endDateString);
        const diff = end.getTime() - now.getTime(); // Difference in milliseconds

        if (diff <= 0) {
            return "Closed";
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        let parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`); // Ensure seconds are shown if no other unit

        return parts.join(' ');
    };

    // Effect to fetch details for the specific donation
    useEffect(() => {
        const fetchDonation = async () => {
            // Wait for authentication to load
            if (authLoading) return;

            // Check if authenticated
            if (!isAuthenticated || !token) {
                setLoading(false);
                setError("Please log in to view donation details.");
                return;
            }

            setLoading(true)
            setError(null)
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://unizikalumni-api.tfnsolutions.us/api/donations/donation?donation_id=${id}`,
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}` // Include Authorization header
                    }
                };
                const response = await axios.request(config);

                if (response.data) {
                    setDonationData(response.data)
                    // Sort donators by created_at in descending order to get the latest
                    const sortedDonators = (response.data.donators || []).sort((a, b) =>
                        new Date(b.created_at) - new Date(a.created_at)
                    );
                    // Set donationsList to the latest 5 donations (transactions for this specific fundraiser)
                    setDonationsList(sortedDonators.slice(0, 5));

                    // Start the countdown timer when data is fetched
                    const intervalId = setInterval(() => {
                        setTimeRemaining(calculateTimeRemaining(response.data.end_date));
                    }, 1000);
                    // Clear interval on component unmount or if end_date changes
                    return () => clearInterval(intervalId);

                } else {
                    setDonationData(null)
                    setError("Donation project not found or invalid data format.")
                }
            } catch (err) {
                console.error("Error fetching donation details:", err)
                if (err.response?.status === 401) {
                    setError("Authentication failed. Please log in again.");
                } else {
                    setError("Failed to load donation details. Please try again.");
                }
                setDonationData(null)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchDonation()
        } else {
            setLoading(false);
            setError("No donation project ID provided.");
        }
    }, [id, token, isAuthenticated, authLoading]) // Dependency on ID and auth state ensures re-fetch

    // Effect to fetch overall recent donations (other fundraisers)
    useEffect(() => {
        const fetchOverallRecentDonations = async () => {
            // No auth check here as it's for "other donations" and may be publicly visible
            try {
                const config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: 'https://unizikalumni-api.tfnsolutions.us/api/donations', // Endpoint for all fundraisers
                    headers: {
                        'Accept': 'application/json',
                        // Assuming this endpoint might not require auth for public view, but adding if it's member portal.
                        // If it's strictly public, remove the Authorization header.
                        'Authorization': token ? `Bearer ${token}` : undefined
                    },
                };
                const response = await axios.request(config);

                // Assuming this endpoint returns a list of fundraisers (donation projects)
                if (response.data && Array.isArray(response.data.data)) {
                    // Filter out the current fundraiser and sort by creation date
                    const filteredAndSorted = response.data.data
                        .filter(fundraiser => fundraiser.id !== id) // Exclude the current fundraiser
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by most recent

                    // Take the latest 3 other fundraisers
                    setRecentDonations(filteredAndSorted.slice(0, 3));
                } else if (response.data && Array.isArray(response.data)) { // Fallback if it's directly an array
                    const filteredAndSorted = response.data
                        .filter(fundraiser => fundraiser.id !== id)
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setRecentDonations(filteredAndSorted.slice(0, 3));
                } else {
                    setRecentDonations([]);
                }
            } catch (err) {
                console.error("Error fetching overall recent donations:", err);
                setRecentDonations([]); // Ensure it's an empty array on error
            }
        };
        fetchOverallRecentDonations();
    }, [id, token]); // Depend on ID and token to re-fetch if we navigate or auth state changes

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

    const [isModalOpen, setIsModalOpen] = useState(false); // State for DonationModal

    if (authLoading) {
        return (
            <DashboardLayout>
                <div className="min-h-screen bg-white flex justify-center items-center">
                    <Loader2 className="animate-spin mr-2" size={24} /> Loading authentication...
                </div>
            </DashboardLayout>
        );
    }

    if (!isAuthenticated) {
        return (
            <DashboardLayout>
                <div className="min-h-screen bg-white flex justify-center items-center">
                    <div className="text-red-500">Please log in to view this page.</div>
                </div>
            </DashboardLayout>
        );
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="min-h-screen bg-white flex justify-center items-center">
                    <Loader2 className="animate-spin mr-2" size={24} /> Loading donation details...
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="min-h-screen bg-white flex justify-center items-center text-red-500">
                    {error}
                </div>
            </DashboardLayout>
        );
    }

    if (!donationData) {
        return (
            <DashboardLayout>
                <div className="min-h-screen bg-white flex justify-center items-center">
                    No donation details available.
                </div>
            </DashboardLayout>
        );
    }

    // Access donators array from the fetched donation object
    const donatorsList = donationData.donators || [];

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

                <div className="max-w-6xl mx-auto py-6 px-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">{donationData.title || "Untitled Donation"}</h1>
                        <div className="mt-4 md:mt-0">
                            <div className="w-full md:w-96 h-0.5 bg-[#D15300]"></div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full flex items-center justify-between text-[#D15300] font-medium mt-4"
                            >
                                <span>DONATE HERE</span>
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </button>
                        </div>
                    </div>

                    {/* Full-width Project Image */}
                    <div className="w-full h-96 bg-gray-200 mb-6 relative overflow-hidden rounded-md">
                        <img
                            src={donationData.banner_image_url || "https://placehold.co/800x288/cccccc/ffffff?text=No+Image"}
                            alt={donationData.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x288/cccccc/ffffff?text=No+Image"; }}
                        />
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
                        {/* Left Column - Description and Donation List */}
                        <div className="lg:col-span-2">
                            {/* Project Details */}
                            <div className="mb-8 ">
                                <div className="flex items-center mb-2">
                                    <Calendar className="mr-2 text-gray-500" />
                                    <span className="text-sm text-gray-500">Posted: {formatDate(donationData.created_at)}</span>
                                </div>
                                <p className="text-gray-700 mb-4">{donationData.description || "No description available."}</p>
                            </div>

                            {/* Donation List (Latest 5 donations to THIS fundraiser) */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="font-bold">Recent Donors</h2>
                                    {/* Link to a dedicated donation list page for this fundraiser */}
                                    <Link to={`/donators/${donationData.id}`} className="text-[#D85E00] text-sm flex items-center">
                                        <span>SEE ALL</span>
                                    </Link>
                                </div>

                                <div className="overflow-x-auto bg-gray-50 p-4">
                                    <table className="min-w-full">
                                        <tbody className="">
                                            {donatorsList.length > 0 ? (
                                                donatorsList.map((donation, index) => (
                                                    <tr key={donation.id || index} className="border-b mb-4 border-gray-100 gap-12">
                                                        <td className="py-3 text-sm bg-white px-3 ">
                                                            {`${donation.member?.first_name || 'Anonymous'} ${donation.member?.last_name || ''}`}
                                                        </td>
                                                        <td className="py-3 text-sm bg-white px-3 text-gray-500">{formatDate(donation.donation_date)}</td>
                                                        <td className="py-3 text-sm bg-white px-3 text-green-600">₦{parseFloat(donation.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="text-center py-4 text-gray-500">No donations recorded yet for this donation.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="text-sm mt-12 text-gray-700 font-medium">
                                <p className="mb-2">For enquiries, reach out to:</p>
                                <p className="mb-2">Hotline: +2348096468647</p>
                                <p>Whatsapp: +2348988839130</p>
                            </div>
                        </div>

                        {/* Right Column - Stats and Recent Donations (Other Fundraisers) */}
                        <div className="lg:col-span-1">
                            {/* Stats */}
                            <div className="bg-gray-50 rounded-md border border-gray-200 p-4 mb-6">
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                    <span className="text-sm">Closes In</span>
                                    <span className="font-medium text-sm bg-[#EDEBEE] p-1 rounded">
                                        {timeRemaining} {/* Display the realtime countdown */}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                    <span className="text-sm">Total Contributions</span>
                                    <span className="font-medium">
                                        ₦{parseFloat(donationData.total_contribution || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-sm">Total Participations</span>
                                    <span className="font-medium">{donationData.no_of_participants || 0}</span>
                                </div>
                                <div className="w-full h-0.5 bg-[#D15300] mt-6"></div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full flex items-center justify-between text-[#D15300] font-medium mt-4"
                                >
                                    <span>DONATE HERE</span>
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </button>
                            </div>

                            {/* Recent Donations (Other Fundraisers) */}
                            <div>
                                <h3 className="font-medium mb-4">OTHER DONATIONS</h3> {/* Changed title for clarity */}
                                <div className="space-y-4">
                                    {recentDonations.length > 0 ? (
                                        recentDonations.map((fundraiser, index) => (
                                            <Link key={fundraiser.id || index} to={`/donation-details/${fundraiser.id}`} className="flex items-center gap-3 group">
                                                <div className="w-16 h-16 relative overflow-hidden flex-shrink-0 rounded-md">
                                                    {/* Using fundraiser banner image */}
                                                    <img
                                                        src={fundraiser.banner_image_url || `https://placehold.co/64x64/cccccc/ffffff?text=Fundraiser`}
                                                        alt={fundraiser.title || "Fundraiser"}
                                                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                                                        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/cccccc/ffffff?text=Fundraiser`; }}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm group-hover:text-[#D85E00] transition-colors">
                                                        {fundraiser.title || 'Untitled Fundraiser'}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">{formatDate(fundraiser.created_at)}</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No other recent donations.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
