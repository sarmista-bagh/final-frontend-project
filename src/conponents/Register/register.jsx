import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "../../redux/feature/auth/authAPI.js";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const [signUp] = useSignUpMutation();

    const onSubmit = async (data) => {
        try {
            await signUp(data).unwrap();
            navigate("/login");
        } catch (error) {
            console.log(error);
            setMessage("Please provide valid email and password");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-lg bg-white p-8 md:p-10">
                {/* Left Side */}
                <div className="flex flex-col justify-center px-4 md:px-6 mb-8 md:mb-0 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800">
                        <span className="text-gray-500">Morning</span>
                        <span className="text-black">Dispatch</span>
                    </h1>
                    <h2 className="text-xl font-semibold mt-4">Sign up for an account.</h2>
                    <p className="text-sm text-gray-500 mt-1">Join us and get started today.</p>
                </div>

                {/* Right Side */}
                <div className="flex flex-col justify-center px-4 md:px-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                {...register("username", { required: "Username is required" })}
                                type="text"
                                placeholder="Username"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                {...register("email", { required: "Valid email required" })}
                                type="email"
                                placeholder="xyz@email.com"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                {...register("password", { required: "Password required" })}
                                type="password"
                                placeholder="Password"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        {message && <p className="text-sm text-red-500">{message}</p>}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 cursor-pointer"
                        >
                            Submit
                        </button>

                        <p className="text-sm text-gray-600 mt-4 text-center">
                            Have an account?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
