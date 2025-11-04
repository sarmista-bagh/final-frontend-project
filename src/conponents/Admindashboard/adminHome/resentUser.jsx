import React, { useState } from 'react';
import Loading from "../../Loading/Loading.jsx";
import { Link } from "react-router-dom";
import {useGetAllusersQuery} from "../../../redux/feature/user/userAPI.js";

const ResentPost = () => {
    const { data, error, isLoading } = useGetAllusersQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const UserperPage = 5;

    const userData = data?.data || [];

    const indexOfLastNews = currentPage * UserperPage;
    const indexOfFirstNews = indexOfLastNews - UserperPage;
    const currerentUser = userData.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(userData.length / UserperPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const HandlecurrerentPage = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center mt-10">
                <Loading />
            </div>
        );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600 px-4">
                <p className="text-lg font-semibold text-center">Failed to load articles.</p>
                <p className="text-sm text-gray-600 text-center">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-4 w-full max-w-full overflow-hidden">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <h2 className="font-semibold text-lg sm:text-xl">Recent Post News</h2>
                <Link to="/dashboard/all-user" className="shrink-0">
                    <button className="bg-black text-white px-3 py-1 rounded cursor-pointer whitespace-nowrap text-sm sm:text-base">
                        See all
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-sm sm:text-base">
                    <thead>
                    <tr className="text-left text-gray-500 border-b">
                        <th className="py-2 px-3 whitespace-nowrap">User image</th>
                        <th className="py-2 px-3">Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currerentUser.map((post) => (
                        <tr key={post.id} className="border-t hover:bg-gray-50">
                            <td className="py-2 px-3">
                                <img
                                    src={post.profileImage}
                                    alt="Post"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </td>
                            <td className="py-2 px-3">{post.username}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {currerentUser.length > 0 && (
                <div className="flex flex-wrap justify-center mt-6 gap-2 text-sm sm:text-base">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md border font-medium ${
                            currentPage === 1
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        Previous
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            onClick={() => HandlecurrerentPage(index + 1)}
                            key={index}
                            className={`px-3 py-2 rounded-md border font-medium ${
                                currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md border font-medium ${
                            currentPage === totalPages
                                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ResentPost;
