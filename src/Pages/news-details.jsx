"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import DashboardLayout from "../Components/Layout/DashboardLayout" // Assuming you want a layout
import { Calendar, ArrowLeft } from "lucide-react"
// Removed useAuth import as it's no longer needed for public access
// import { useAuth } from "../contexts/AuthContext"

const NewsDetails = () => {
  const { id } = useParams() // Get the news ID from the URL
  const [newsItem, setNewsItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Removed token, isAuthenticated, authLoading from useAuth hook
  // const { token, isAuthenticated, loading: authLoading } = useAuth()

  useEffect(() => {
    const fetchNewsDetails = async () => {
      // Removed authentication checks as per user's request for public access
      // if (authLoading) return;
      // if (!isAuthenticated || !token) {
      //   setError("Please log in to view news details.");
      //   setLoading(false);
      //   return;
      // }

      try {
        setLoading(true)
        setError(null)
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          // Corrected URL to use news_id as a query parameter as per API snippet
          url: `https://unizikalumni-api.tfnsolutions.us/api/news/article?news_id=${id}`,
          headers: {
            'Accept': 'application/json',
            // Removed Authorization header for public access, despite it being in the provided snippet
            // If the API truly requires authorization for this endpoint even for public viewing,
            // you'll need to re-add the useAuth hook and the Authorization header.
            // 'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.request(config);
        setNewsItem(response.data); // Assuming news data is directly in response.data
      } catch (err) {
        console.error("Error fetching news details:", err);
        setError("Failed to load news details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetails();
    }
  }, [id]); // Removed token, isAuthenticated, authLoading from dependency array

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

  // Removed conditional rendering based on authLoading and isAuthenticated for public access
  // if (authLoading) {
  //   return (
  //     <DashboardLayout>
  //       <div className="flex justify-center items-center h-screen text-gray-500">Loading authentication...</div>
  //     </DashboardLayout>
  //   );
  // }

  // if (!isAuthenticated) {
  //   return (
  //     <DashboardLayout>
  //       <div className="flex justify-center items-center h-screen text-red-500">Please log in to view news details.</div>
  //     </DashboardLayout>
  //   );
  // }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-gray-500">Loading news details...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
      </DashboardLayout>
    );
  }

  if (!newsItem) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-gray-500">News item not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-2">
            {/* Changed link to go back to events-news page, assuming it's the main listing */}
            {/* <Link to="/events-news" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to News
            </Link> */}
          </div>

          <h1 className="text-3xl md:text-3xl font-bold text-gray-800 mb-4">{newsItem.title}</h1>

          {/* News Banner */}
          {newsItem.banner_image_url && (
            <div className="w-full h-64 md:h-80 bg-gray-200 rounded-sm overflow-hidden mb-6">
              <img
                src={newsItem.banner_image_url}
                alt={newsItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x400/cccccc/ffffff?text=No+Image";
                }}
              />
            </div>
          )}

          {/* News Metadata */}
          <div className="flex items-center gap-4 text-gray-600 text-sm mb-6">
            {newsItem.created_at && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Published on {formatDate(newsItem.created_at)}</span>
              </div>
            )}
            {newsItem.type && (
              <span className="bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {newsItem.type}
              </span>
            )}
            {/* {newsItem.status && (
              <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                Status: {newsItem.status}
              </span>
            )} */}
          </div>

          {/* News Description */}
          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="text-lg leading-relaxed">{newsItem.description}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewsDetails;
