import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import DonationBox from "./Pages/Donations/DonationBox";
import MemberChamber from "./Pages/MemberChamber";
import Account from "./Pages/Account";
import Mydonations from "./Pages/Donations/my-donations";
import Alldonations from "./Pages/Donations/all-donations";
import DonationDetail from "./Pages/Donations/donation-details";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donation" element={<DonationBox />} />
        <Route path="/member-chamber" element={<MemberChamber />} />
        <Route path="/account" element={<Account />} />
        <Route path="/support" element={<Home />} />
        <Route path="/my-donations" element={<Mydonations />} />
        <Route path="/all-donations" element={<Alldonations />} />
        <Route path="/donation-details" element={<DonationDetail />} />
      </Routes>
    </Router>
  )
}

export default App
