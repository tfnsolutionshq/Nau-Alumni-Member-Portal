"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import DashboardLayout from "../Components/Layout/DashboardLayout" // Assuming you want a layout
import { MapPin, Calendar, Clock, ArrowLeft } from "lucide-react"
// Removed useAuth import as it's no longer needed for public access
// import { useAuth } from "../contexts/AuthContext"

const EventDetails = () => {
  const { id } = useParams() // Get the event ID from the URL
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Removed token, isAuthenticated, authLoading from useAuth hook
  // const { token, isAuthenticated, loading: authLoading } = useAuth()

  useEffect(() => {
    const fetchEventDetails = async () => {
      // Removed authentication checks
      // if (authLoading) return;
      // if (!isAuthenticated || !token) {
      //   setError("Please log in to view event details.");
      //   setLoading(false);
      //   return;
      // }

      try {
        setLoading(true)
        setError(null)
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          // Corrected URL to use event_id as a query parameter
          url: `https://unizikalumni-api.tfnsolutions.us/api/event?event_id=${id}`,
          headers: {
            'Accept': 'application/json',
            // Removed Authorization header
            // 'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.request(config);
        // Assuming the actual event data might be nested if the response is an object with message/data
        // Based on previous API responses, it's often directly `response.data` for single items,
        // but if it comes wrapped (e.g., { data: { event_details: ... } }), you might need to adjust.
        // For now, assuming direct response.data for simplicity, as per your snippet.
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setError("Failed to load event details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
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

  // Removed conditional rendering based on authLoading and isAuthenticated
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
  //       <div className="flex justify-center items-center h-screen text-red-500">Please log in to view event details.</div>
  //     </DashboardLayout>
  //   );
  // }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-gray-500">Loading event details...</div>
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

  if (!event) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-gray-500">Event not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            {/* Changed link to go back to events-news page, assuming it's the main listing */}
            <Link to="/events-news" className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </Link>
          </div>

          {/* Event Banner */}
          {event.banner_image_url && (
            <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden mb-6">
              <img
                src={event.banner_image_url}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/800x400/cccccc/ffffff?text=No+Image";
                }}
              />
            </div>
          )}

          {/* Event Title */}
          <h1 className="text-3xl md:text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>

          {/* Event Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6">
            {event.venue && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{event.venue}</span>
              </div>
            )}
            {(event.start_date || event.end_date) && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
              </div>
            )}
            {event.meeting_time && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{event.meeting_time}</span>
              </div>
            )}
            {event.chapter && (
              <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {event.chapter}
              </span>
            )}
            {event.type && (
              <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
                {event.type}
              </span>
            )}
          </div>

          {/* Event Description */}
          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="text-lg leading-relaxed">{event.description}</p>
            {event.additional_comment && (
              <>
                <h3 className="text-xl font-semibold mt-6 mb-2">Additional Comments:</h3>
                <p className="italic">{event.additional_comment}</p>
              </>
            )}
          </div>

          {/* Registration and Map Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {event.requires_registration === 1 && event.registration_url && (
              <a
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Register Now
              </a>
            )}
            {event.map_url && (
              <a
                href={event.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MapPin className="w-5 h-5 mr-2" />
                View on Map
              </a>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventDetails;
