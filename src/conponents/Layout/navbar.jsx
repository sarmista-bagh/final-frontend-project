import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../../utilitis/sessionHelper.js";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/feature/auth/authAPI.js";
import { logoutUser } from "../../redux/feature/auth/authSlice.jsx";

const Navbar = () => {
    const [logout] = useLogoutMutation();
    const { user } = useSelector((state) => state.auth);
    const token = getToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(logoutUser());
            removeToken();
            navigate("/login");
            setIsMobileMenuOpen(false); // close mobile menu on logout
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header className="bg-white shadow-md py-4 relative z-50">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    <span className="text-gray-500">Morning</span>
                    <span className="text-black">Dispatch</span>
                </Link>

                {/* Search - desktop only */}
                <div className="hidden md:block flex-1 max-w-sm mx-8 relative group">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 transition duration-300 group-focus-within:bg-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/news-article">News Articles</NavLink>
                    <NavLink to="/about">About</NavLink>

                    {token ? (
                        <div className="flex items-center space-x-6">
                            <Link
                                to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/profile"}
                            >
                                <button className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-700 transition text-sm cursor-pointer">Dashboard</button>
                            </Link>
                            <button onClick={handleLogout} className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-700 transition text-sm cursor-pointer">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-700 transition text-sm cursor-pointer">
                                Login
                            </button>
                        </Link>
                    )}
                </nav>

                {/* Mobile menu toggle */}
                <button
                    aria-label="Toggle menu"
                    className="md:hidden text-gray-700"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-6 flex flex-col h-full">
                    <button
                        onClick={toggleMobileMenu}
                        className="mb-6 self-end text-gray-700"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>

                    <div className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    </div>

                    <nav className="flex flex-col space-y-6">
                        <MobileNavLink to="/" toggle={toggleMobileMenu}>
                            Home
                        </MobileNavLink>
                        <MobileNavLink to="/news-article" toggle={toggleMobileMenu}>
                            News Articles
                        </MobileNavLink>
                        <MobileNavLink to="/about" toggle={toggleMobileMenu}>
                            About
                        </MobileNavLink>

                        {token ? (
                            <>
                                <Link
                                    to={user?.role === "admin" ? "/dashboard/admin" : "/dashboard/profile"}
                                    onClick={toggleMobileMenu}
                                >
                                    <button className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-700 transition text-sm cursor-pointer w-full text-left">Dashboard</button>
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMobileMenu();
                                    }}
                                    className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-700 transition text-sm cursor-pointer w-full text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onClick={toggleMobileMenu}>
                                <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 transition w-full">
                                    Login
                                </button>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>

            {/* Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-brightness-50 z-30"
                    onClick={toggleMobileMenu}
                />
            )}
        </header>
    );
};

const NavLink = ({ to, children }) => (
    <Link to={to} className="text-gray-700 hover:text-black transition duration-200">
        {children}
    </Link>
);

const MobileNavLink = ({ to, children, toggle }) => (
    <Link to={to} onClick={toggle} className="text-gray-700 hover:text-black transition">
        {children}
    </Link>
);

export default Navbar;
