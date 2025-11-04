import React, { useState } from 'react';
import { PanelLeftOpen } from "lucide-react";
import UpdateProfile from "./updateProfile.jsx";
import { useGetSingleUserQuery } from "../../../redux/feature/user/userAPI.js";
import { useSelector } from "react-redux";
import Loading from "../../Loading/Loading.jsx";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, error, isLoading } = useGetSingleUserQuery(user?._id);
    const userData = data?.data || {};

    const { username, profession, bio, profileImage } = userData;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const HandleModalopen = () => {
        setIsModalOpen(true);
    };
    const HandleModalclose = () => {
        setIsModalOpen(false);
    };

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load profile.</p>
                <p className="text-sm text-gray-600">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-[900px] mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                    src={profileImage}
                    alt="User Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-lg sm:text-xl font-bold">Username: {username}</h2>
                    <p className="text-gray-500 text-sm">User Bio: {bio}</p>
                    <p className="text-gray-500 text-sm">Profession: {profession}</p>
                </div>
            </div>

            <PanelLeftOpen
                onClick={HandleModalopen}
                className="text-gray-500 cursor-pointer hover:text-gray-700 self-start sm:self-center"
            />

            <UpdateProfile
                isModalOpen={isModalOpen}
                HandleModalclose={HandleModalclose}
            />
        </div>
    );
};

export default Profile;
