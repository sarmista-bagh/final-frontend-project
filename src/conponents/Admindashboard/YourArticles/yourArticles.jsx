import React, { useState } from 'react';
import { useDeleteArticleMutation, useGetAllArticlesQuery } from "../../../redux/feature/articleAPI/articleAPI.js";
import Loading from "../../Loading/Loading.jsx";
import { confirmDelete, showError, showSuccess } from "../../../utilitis/sweetalertHelper.js";
import { Link } from "react-router-dom";

const YourArticles = () => {
    const { data, error, isLoading, refetch } = useGetAllArticlesQuery();
    const [deleteArticle] = useDeleteArticleMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const NewsperPage = 10;

    const newsData = data?.data || [];

    const HandledeleteArticle = async (id) => {
        const result = await confirmDelete();
        if (result.isConfirmed) {
            try {
                await deleteArticle(id).unwrap();
                await showSuccess("Successfully deleted article");
                refetch();
            } catch (e) {
                console.error(e);
                showError("Failed to delete article");
            }
        }
    };

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
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load articles.</p>
                <p className="text-sm text-gray-600">
                    {error?.error || "Something went wrong. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <h2 className="text-lg md:text-xl font-semibold mb-2">All Article</h2>
            <p className="mb-4 text-sm md:text-base">
                Showing {indexOfFirstNews + 1} to {newsData.length} Article
            </p>
            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px] border table-auto">
                    <thead>
                    <tr className="bg-gray-100 text-left text-sm">
                        <th className="p-2 border">Date updated</th>
                        <th className="p-2 border">Post image</th>
                        <th className="p-2 border">Post title</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Delete</th>
                        <th className="p-2 border">Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currerentNews.map((item, index) => (
                        <tr key={index} className="border-t hover:bg-gray-50 text-sm">
                            <td className="p-2 border">{new Date(item.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 border">
                                <div className="w-16 h-10 overflow-hidden rounded">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </td>
                            <td className="p-2 border break-words">{item.title}</td>
                            <td className="p-2 border break-words">{item.category}</td>
                            <td
                                onClick={() => HandledeleteArticle(item?._id)}
                                className="p-2 border text-red-600 cursor-pointer text-center"
                            >
                                Delete
                            </td>
                            <td className="p-2 border text-green-600 cursor-pointer text-center">
                                <Link to={`/dashboard/update-post/${item?._id}`}>Edit</Link>
                            </td>
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

            <p className="mt-4 text-sm text-center text-gray-500">
                A list of your recent published articles.
            </p>
        </div>
    );
};

export default YourArticles;
