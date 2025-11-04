import React from 'react';
import { useLoginMutation } from "../../redux/feature/auth/authAPI.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/feature/auth/authSlice.jsx";

const Logins = () => {
    const navigate = useNavigate();
    const [Login] = useLoginMutation();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (userData) => {
        try {
            const response = await Login(userData).unwrap();
            const { user } = response;
            dispatch(setUser(user));
            toast.success("Login successful");
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div
                className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg bg-white p-8 md:p-10"
            >
                {/* Left Side - Branding */}
                <div className="flex flex-col justify-center px-4 md:px-6 mb-8 md:mb-0 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800">
                        <span className="text-gray-500">Morning</span>
                        <span className="text-black">Dispatch</span>
                    </h1>
                    <h2 className="text-xl font-semibold mt-4">Sign in to your account.</h2>
                    <p className="text-sm text-gray-500 mt-1">Welcome back, Please provide your details</p>
                </div>

                {/* Right Side - Form */}
                <div className="flex flex-col justify-center px-4 md:px-6">
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                {...register("email", { required: "Valid email is required" })}
                                type="email"
                                placeholder="xyz@company.com"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                {...register("password", { required: "Valid password is required" })}
                                type="password"
                                placeholder="Password"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-600 mt-6 text-center">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Logins;
