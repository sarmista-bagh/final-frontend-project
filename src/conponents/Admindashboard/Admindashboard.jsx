import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {
    LayoutDashboard,
    FilePlus,
    FileText,
    LogOut,
    Users
} from 'lucide-react';
import {logoutUser} from "../../redux/feature/auth/authSlice.jsx";
import {removeToken} from "../../utilitis/sessionHelper.js";
import {useDispatch} from "react-redux";
import {useLogoutMutation} from "../../redux/feature/auth/authAPI.js";

const Admindashboard = () => {

    const dispatch = useDispatch();
    const [Logout]=useLogoutMutation()
    const navigate = useNavigate();

    const Handlelogout=async()=>{
        try {
            await Logout().unwrap()
            dispatch(logoutUser());
            removeToken()
            navigate("/login");
        }catch(err){
            console.error(err)
        }
    }

    const navLinks = [
        { to: "/dashboard/admin", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { to: "/dashboard/creat-post", label: "Create Post", icon: <FilePlus size={18} /> },
        { to: "/dashboard/your-articles", label: "Your Articles", icon: <FileText size={18} /> },
        {to:"/dashboard/all-user",label: "All User",icon: <Users  size={18} /> },
    ];

    return (
        <div className="min-h-screen flex flex-col justify-between bg-white">
            <div>
                <div className="p-4 border-b">
                    <Link to="/">
                        <h2 className="text-2xl font-bold">
                            <span className="text-gray-500">Morning</span>
                            <span className="text-black">Dispatch</span>
                        </h2>
                    </Link>
                    <i className="text-sm text-gray-500">Admin dashboard</i>
                </div>
                <nav className="flex flex-col gap-1 mt-4 px-2">
                    {navLinks.map(({to, label, icon}) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({isActive}) =>
                                `flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 transition ${
                                    isActive ? "bg-gray-200 font-semibold text-blue-600" : "text-gray-700"
                                }`
                            }
                        >
                            {icon}
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="p-4">
                <button
                    onClick={Handlelogout}
                    className="bg-red-500 text-white px-4 py-2 w-full rounded hover:bg-red-600 flex items-center justify-center gap-2 transition">
                    <LogOut size={18}/> Logout
                </button>
            </div>
        </div>
    );
};

export default Admindashboard;
