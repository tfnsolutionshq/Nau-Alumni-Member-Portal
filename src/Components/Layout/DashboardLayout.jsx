import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SupportPopup from '../Support/SupportPopup';

// Icons
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const DonationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const MemberIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const AccountIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const SupportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const NotificationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const SuggestionBoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const DonationBoxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);

const DashboardLayout = ({ children }) => {
    const [userName, setUserName] = useState('Adeola');
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState('Home');
    const location = useLocation();

    // Update page title based on current route
    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setPageTitle('Home');
        else if (path === '/donation') setPageTitle('Donation Box');
        else if (path === '/member-chamber') setPageTitle('Member Chamber');
        else if (path === '/account') setPageTitle('Account');
        else if (path === '/support') setPageTitle('Support');
        else if (path === '/my-donations') setPageTitle('My Donations');
        else if (path === '/all-donations') setPageTitle('All Donations');
        else if (path === '/donation-details') setPageTitle('Donation Details');
        else setPageTitle('Home');
    }, [location]);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Support Popup */}
            <SupportPopup isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
            {/* Mobile Menu Button - Only visible on small screens */}
            <div className="lg:hidden fixed top-4 left-4 z-20">
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-md bg-[#066AAB] text-white"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-10 w-64 bg-[#066AAB] text-white flex flex-col h-full transition-transform duration-300 ease-in-out`}>
                {/* Logo */}
                <div className="p-4 border-white">
                    <img
                        src="https://github.com/tfnsolutionshq/Unizik-Alumni-Assets/blob/main/unizik-logo%201.png?raw=true"
                        alt="Nnamdi Azikiwe University"
                        className="h-14"
                    />
                    <h1></h1>
                </div>
                <hr className='mx-3' />
                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul>
                        <li>
                            <Link 
                                to="/" 
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname === '/' ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                            >
                                <HomeIcon />
                                <span className="ml-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/donation" 
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname === '/donation' ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                            >
                                <DonationIcon />
                                <span className="ml-3">Donation Box</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/member-chamber" 
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname === '/member-chamber' ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                            >
                                <MemberIcon />
                                <span className="ml-3">Member Chamber</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/account" 
                                className={`flex items-center mx-3 rounded-md px-4 py-3 ${location.pathname === '/account' ? 'bg-white text-black' : 'hover:bg-blue-800 transition-colors duration-200'}`}
                            >
                                <AccountIcon />
                                <span className="ml-3">Account</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Support */}
                <div className="p-4 border-t border-blue-800">
                    <button 
                        onClick={() => setIsSupportOpen(true)} 
                        className="flex items-center text-sm w-full hover:bg-blue-800 rounded-md px-4 py-2 transition-colors duration-200"
                    >
                        <SupportIcon />
                        <span className="ml-3">Support</span>
                    </button>

                    {/* User Info */}
                    <div className="flex items-center mt-4 pt-4 border-t border-blue-800">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            {userName.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <div className="text-sm font-medium">{userName}</div>
                            <div className="text-xs text-blue-200">test@unizik.edu.ng</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 ml-0">
                {/* Header */}
                <header className="bg-white border-b z-10">
                    <div className="flex items-center justify-between py-4 px-6">
                        <h1 className="text-lg font-medium">{pageTitle}</h1>

                        <div className="flex items-center space-x-4">
                            {/* Search - Hidden on small screens */}
                            <div className="relative hidden md:block">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SearchIcon />
                                </span>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Notifications */}
                            <button className="p-1 rounded-full hover:bg-gray-100">
                                <NotificationIcon />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;