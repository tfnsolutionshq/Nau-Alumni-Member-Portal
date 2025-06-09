import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./Pages/home";
import DonationBox from "./Pages/Donations/DonationBox";
import MemberChamber from "./Pages/MemberChamber";
import Account from "./Pages/Account";
import EventDetails from "./Pages/event-details";
import NewsDetails from "./Pages/news-details";
import Mydonations from "./Pages/Donations/my-donations";
import Alldonations from "./Pages/Donations/all-donations";
import DonationDetail from "./Pages/Donations/donation-details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/donations" element={
          <ProtectedRoute>
            <DonationBox />
          </ProtectedRoute>
        } />
        <Route path="/member-chamber" element={
          <ProtectedRoute>
            <MemberChamber />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/support" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/my-donations" element={
          <ProtectedRoute>
            <Mydonations />
          </ProtectedRoute>
        } />
        <Route path="/all-donations/:id" element={
          <ProtectedRoute>
            <Alldonations />
          </ProtectedRoute>
        } />
        <Route path="/donation-details/:id" element={
          <ProtectedRoute>
            <DonationDetail />
          </ProtectedRoute>
        } />
        <Route path="/event-details/:id" element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        } />
        <Route path="/news-details/:id" element={
          <ProtectedRoute>
            <NewsDetails />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
