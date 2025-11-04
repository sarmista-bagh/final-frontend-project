import React, { useState } from 'react';
import { useGetAllArticlesQuery } from "../../../redux/feature/articleAPI/articleAPI.js";
import Loading from "../../Loading/Loading.jsx";
import { Link } from "react-router-dom";

const ResentPost = () => {
    const { data, error, isLoading } = useGetAllArticlesQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const NewsperPage = 5;

    const newsData = data?.data || [];

    const indexOfLastNews = currentPage * NewsperPage;
    const indexOfFirstNews = indexOfLastNews - NewsperPage;
    const currerentNews = newsData.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(newsData.length / NewsperPage);

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
                <h2 className="font-semibold text-lg">Recent Post News</h2>
                <Link to="/dashboard/your-articles" className="shrink-0">
                    <button className="bg-black text-white px-3 py-1 rounded cursor-pointer whitespace-nowrap">
                        See all
                    </button>
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-sm">
                    <thead>
                    <tr className="text-left text-gray-500 border-b">
                        <th className="py-2 px-3">Post image</th>
                        <th className="py-2 px-3">Post Title</th>
                        <th className="py-2 px-3">Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currerentNews.map((post) => (
                        <tr key={post.id} className="border-t hover:bg-gray-50">
                            <td className="py-2 px-3">
                                <img
                                    src={post.image}
                                    alt="Post"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </td>
                            <td className="py-2 px-3">{post.title}</td>
                            <td className="py-2 px-3">{post.category}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {currerentNews.length > 0 && (
                <div className="flex flex-wrap justify-center mt-6 gap-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md border text-sm font-medium ${
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
                            className={`px-3 py-2 rounded-md border text-sm font-medium ${
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
                        className={`px-4 py-2 rounded-md border text-sm font-medium ${
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
