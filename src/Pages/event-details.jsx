// import { useState, useEffect } from "react"
// import { useParams, Link } from "react-router-dom"
// import axios from "axios"
// import DashboardLayout from "../Components/Layout/DashboardLayout" // Assuming you want a layout
// import { MapPin, Calendar, Clock, ArrowLeft } from "lucide-react"
// import { useAuth } from "../contexts/AuthContext" // Re-introducing useAuth for member portal

// const EventDetails = () => {
//   const { id } = useParams() // Get the event ID from the URL
//   const [event, setEvent] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const { token, isAuthenticated, loading: authLoading } = useAuth() // Use auth context

//   useEffect(() => {
//     const fetchEventDetails = async () => {
//       // Authentication checks for member portal
//       if (authLoading) return; // Wait until auth state is resolved

//       if (!isAuthenticated || !token) {
//         setError("Please log in to view event details.");
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true)
//         setError(null)
//         const config = {
//           method: 'get',
//           maxBodyLength: Infinity,
//           url: `https://unizikalumni-api.tfnsolutions.us/api/event?event_id=${id}`,
//           headers: {
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}` // Include Authorization header
//           }
//         };
//         const response = await axios.request(config);
//         setEvent(response.data);
//       } catch (err) {
//         console.error("Error fetching event details:", err);
//         setError("Failed to load event details. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchEventDetails();
//     }
//   }, [id, token, isAuthenticated, authLoading]); // Add auth-related dependencies

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     } catch (error) {
//       return dateString;
//     }
//   };

//   // Function to add event to Google Calendar
//   const handleAddToGoogleCalendar = () => {
//     if (!event) return;

//     const title = encodeURIComponent(event.title || "Alumni Event");
//     const description = encodeURIComponent(event.description || "");
//     const location = encodeURIComponent(`${event.venue || ""} ${event.location || ""}`).trim();

//     let datesParam = '';

//     if (event.start_date && event.end_date) {
//         if (event.meeting_time) {
//             // Event with specific time
//             // Combine date and time, then convert to ISO format (UTC) for Google Calendar
//             const startDateTime = new Date(`${event.start_date} ${event.meeting_time}`);
//             // Assuming end time is same as start time if not explicitly provided for end_date
//             const endDateTime = new Date(`${event.end_date} ${event.meeting_time}`);

//             // Format for Google Calendar: YYYYMMDDTHHMMSSZ
//             const formatForGoogleCalendar = (dateObj) => {
//                 if (isNaN(dateObj.getTime())) return ''; // Return empty string for invalid date
//                 // toISOString gives "YYYY-MM-DDTHH:mm:ss.sssZ"
//                 // Remove hyphens, colons, and milliseconds, then append Z
//                 return dateObj.toISOString().replace(/[-:]|\.\d{3}/g, '').slice(0, 15) + 'Z';
//             };

//             datesParam = `${formatForGoogleCalendar(startDateTime)}/${formatForGoogleCalendar(endDateTime)}`;

//         } else {
//             // All-day event
//             // Google Calendar's end date for all-day events is exclusive.
//             // So, if the event ends on '2024-06-16', the URL should specify '2024-06-17'
//             const endDateObj = new Date(event.end_date);
//             endDateObj.setDate(endDateObj.getDate() + 1); // Add one day for exclusive end date

//             const formatAllDayDate = (dateObj) => dateObj.toISOString().slice(0, 10).replace(/-/g, '');

//             datesParam = `${formatAllDayDate(new Date(event.start_date))}/${formatAllDayDate(endDateObj)}`;
//         }
//     }

//     const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${description}&location=${location}`;
//     window.open(googleCalendarUrl, '_blank');
//   };

//   if (authLoading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-screen text-gray-500">Loading authentication...</div>
//       </DashboardLayout>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-screen text-red-500">Please log in to view event details.</div>
//       </DashboardLayout>
//     );
//   }

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-screen text-gray-500">Loading event details...</div>
//       </DashboardLayout>
//     );
//   }

//   if (error) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
//       </DashboardLayout>
//     );
//   }

//   if (!event) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-screen text-gray-500">Event not found.</div>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <div className="min-h-screen bg-white p-6">
//         <div className="w-full mx-auto px-2">
//           {/* Back Button */}
//           <div className="mb-2">
//             <div className="flex items-center text-gray-600 hover:text-orange-500 transition-colors">
//               {/* <ArrowLeft className="w-5 h-5 mr-2" /> */}
//               Event Details
//             </div>
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>
//           {/* Event Banner */}
//           {event.banner_image_url && (
//             <div className="w-full h-64 md:h-80 bg-gray-200 rounded-sm overflow-hidden mb-6">
//               <img
//                 src={event.banner_image_url}
//                 alt={event.title}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "https://placehold.co/800x400/cccccc/ffffff?text=No+Image";
//                 }}
//               />
//             </div>
//           )}


//           {/* Event Metadata */}
//           <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6">
//             {event.venue && (
//               <div className="flex items-center">
//                 <MapPin className="w-4 h-4 mr-1" />
//                 <span>{event.venue}</span>
//               </div>
//             )}
//             {(event.start_date || event.end_date) && (
//               <div className="flex items-center">
//                 <Calendar className="w-4 h-4 mr-1" />
//                 <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
//               </div>
//             )}
//             {event.meeting_time && (
//               <div className="flex items-center">
//                 <Clock className="w-4 h-4 mr-1" />
//                 <span>{event.meeting_time}</span>
//               </div>
//             )}
//             {event.chapter && (
//               <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
//                 {event.chapter}
//               </span>
//             )}
//             {event.type && (
//               <span className="bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full text-xs font-medium">
//                 {event.type}
//               </span>
//             )}
//           </div>

//           {/* Event Description */}
//           <div className="prose max-w-none text-gray-700 mb-8">
//             <p className="text-lg leading-relaxed">{event.description}</p>
//             {event.additional_comment && (
//               <>
//                 <h3 className="text-xl font-semibold mt-6 mb-2">Additional Comments:</h3>
//                 <p className="italic">{event.additional_comment}</p>
//               </>
//             )}
//           </div>

//           {/* Registration, Map, and Add to Calendar Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             {event.requires_registration === 1 && event.registration_url && (
//               <a
//                 href={event.registration_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//               >
//                 Register Now
//               </a>
//             )}
//             {event.map_url && (
//               <a
//                 href={event.map_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <MapPin className="w-5 h-5 mr-2" />
//                 View on Map
//               </a>
//             )}
//             {/* New: Add to Google Calendar Button */}
//             <button
//               onClick={handleAddToGoogleCalendar}
//               className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <Calendar className="w-5 h-5 mr-2" />
//               Add to Google Calendar
//             </button>
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default EventDetails;










"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import DashboardLayout from "../Components/Layout/DashboardLayout" // Assuming you want a layout
import { MapPin, Calendar, Clock, ArrowLeft } from "lucide-react"
import { useAuth } from "../contexts/AuthContext" // Re-introducing useAuth for member portal

const EventDetails = () => {
  const { id } = useParams() // Get the event ID from the URL
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token, isAuthenticated, loading: authLoading } = useAuth() // Use auth context

  useEffect(() => {
    const fetchEventDetails = async () => {
      // Authentication checks for member portal
      if (authLoading) return; // Wait until auth state is resolved

      if (!isAuthenticated || !token) {
        setError("Please log in to view event details.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true)
        setError(null)
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `https://unizikalumni-api.tfnsolutions.us/api/event?event_id=${id}`,
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}` // Include Authorization header
          }
        };
        const response = await axios.request(config);
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
  }, [id, token, isAuthenticated, authLoading]); // Add auth-related dependencies

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

  // Helper to format date for Google Calendar (YYYYMMDDTHHMMSSZ)
  const formatForGoogleCalendar = (dateObj) => {
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toISOString().replace(/[-:]|\.\d{3}/g, '').slice(0, 15) + 'Z';
  };

  // Helper to format date for Apple Calendar (YYYYMMDDTHHMMSS)
  const formatForAppleCalendar = (dateObj) => {
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toISOString().replace(/[-:]|\.\d{3}/g, '').slice(0, 15); // No 'Z' for local time or add timezone explicitly
  };

  // Function to create an .ics file content
  const createIcsContent = (eventData) => {
    const startDate = new Date(`${eventData.start_date} ${eventData.meeting_time || '00:00'}`);
    const endDate = new Date(`${eventData.end_date} ${eventData.meeting_time || '23:59'}`); // Assuming end of day if no meeting time

    // For all-day events, Apple Calendar expects dates in YYYYMMDD format without time
    // For timed events, it expects YYYYMMDDTHHMMSS
    const dtstart = eventData.meeting_time
      ? formatForAppleCalendar(startDate)
      : eventData.start_date.replace(/-/g, ''); // YYYYMMDD
    const dtend = eventData.meeting_time
      ? formatForAppleCalendar(endDate)
      : eventData.end_date.replace(/-/g, ''); // YYYYMMDD (exclusive for all-day events in ICS, so add one day)

    // For all-day events, DTEND should be one day after the event ends.
    // Example: if event is Jan 1, 2024 to Jan 1, 2024 (all day), DTSTART:20240101 DTEND:20240102
    let icsEndDate = new Date(eventData.end_date);
    if (!eventData.meeting_time) {
        icsEndDate.setDate(icsEndDate.getDate() + 1);
    }
    const finalDTEnd = eventData.meeting_time
        ? formatForAppleCalendar(endDate)
        : icsEndDate.toISOString().slice(0, 10).replace(/-/g, '');


    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Alumni Association//NONSGML v1.0//EN',
      'BEGIN:VEVENT',
      `UID:${eventData.id}`,
      `DTSTAMP:${formatForAppleCalendar(new Date())}`, // Current timestamp
      `DTSTART:${dtstart}`,
      `DTEND:${finalDTEnd}`,
      `SUMMARY:${eventData.title || "Alumni Event"}`,
      `DESCRIPTION:${eventData.description || ""}`,
      `LOCATION:${`${eventData.venue || ""} ${eventData.location || ""}`.trim()}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    return icsContent;
  };

  // Function to add event to calendar (platform-dependent)
  const handleAddToCalendar = () => {
    if (!event) return;

    const title = encodeURIComponent(event.title || "Alumni Event");
    const description = encodeURIComponent(event.description || "");
    const location = encodeURIComponent(`${event.venue || ""} ${event.location || ""}`).trim();

    // Check for iOS devices
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
      // Generate and download .ics file for Apple Calendar
      const icsContent = createIcsContent(event);
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${event.title || 'Alumni Event'}.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href); // Clean up the URL object
    } else {
      // Generate Google Calendar URL for other devices
      let datesParam = '';
      if (event.start_date && event.end_date) {
        const startDateTime = new Date(`${event.start_date} ${event.meeting_time || '00:00'}`);
        const endDateTime = new Date(`${event.end_date} ${event.meeting_time || '23:59'}`);

        datesParam = `${formatForGoogleCalendar(startDateTime)}/${formatForGoogleCalendar(endDateTime)}`;
      }
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${datesParam}&details=${description}&location=${location}`;
      window.open(googleCalendarUrl, '_blank');
    }
  };


  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-gray-500">Loading authentication...</div>
      </DashboardLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen text-red-500">Please log in to view event details.</div>
      </DashboardLayout>
    );
  }

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
        <div className="w-full mx-auto">
          {/* Back Button */}
          <div className="mb-2">
            <div className="flex items-center text-gray-600 ">
              Event Details
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{event.title}</h1>

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

          {/* Registration, Map, and Add to Calendar Buttons */}
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
            {/* New: Add to Calendar Button (Google/Apple) */}
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EventDetails;
