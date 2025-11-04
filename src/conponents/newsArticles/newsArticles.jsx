import React, { useState } from 'react';
import { useGetArticleFilterQuery } from "../../redux/feature/articleAPI/articleAPI.js";
import Loading from "../Loading/Loading.jsx";
import FilterArticle from "./filterArticle.jsx";
import { Link } from "react-router-dom";
import { X, Filter } from 'lucide-react';

const NewsArticles = () => {
    const [filterState, setFilterState] = useState({ category: 'all' });
    const { category } = filterState;
    const [showFilter, setShowFilter] = useState(false);

    const { data: productdata, error, isLoading } = useGetArticleFilterQuery({
        category: category !== "all" ? category : ''
    });

    const totalData = productdata?.data?.articleData || [];
    const [visibleProduct, setVisibleProduct] = useState(8);

    const handleClick = () => setVisibleProduct(prev => prev + 4);

    if (isLoading) return (
        <div className="flex justify-center mt-10">
            <Loading />
        </div>
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-red-600">
                <p className="text-lg font-semibold">Failed to load articles.</p>
                <p className="text-sm text-gray-600">{error?.error || "Something went wrong."}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row relative">
            {/* Toggle Button - Mobile */}
            <div className="md:hidden flex justify-end p-4">
                <button
                    onClick={() => setShowFilter(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md"
                >
                    <Filter size={18} /> Filter
                </button>
            </div>

            {/* Sidebar - Desktop */}
            <div className="hidden md:block md:w-[300px] border-r border-gray-200">
                <FilterArticle filterState={filterState} setFilterState={setFilterState} />
            </div>

            {/* Sidebar - Mobile Toggle */}
            {showFilter && (
                <div className="fixed inset-0 z-50  backdrop-brightness-50 flex justify-start">
                    <div className="w-[80%] max-w-[350px] bg-white h-full shadow-md p-4 relative">
                        <button
                            onClick={() => setShowFilter(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
                        >
                            <X size={24} />
                        </button>
                        <FilterArticle filterState={filterState} setFilterState={setFilterState} />
                    </div>
                    {/* Close area */}
                    <div
                        onClick={() => setShowFilter(false)}
                        className="flex-1"
                    />
                </div>
            )}

            {/* Article Section */}
            <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white">
                <h2 className="text-xl font-semibold mb-6">News Articles:</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {
                        totalData.slice(0, visibleProduct).map((item, index) => (
                            <div key={index} className="border rounded-lg shadow-sm overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-[200px] object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-md font-medium mb-1 truncate">{item.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3 capitalize">{item.category}</p>
                                    <Link to={`/read-post/${item._id}`}>
                                        <button className="w-full border border-gray-300 text-black font-medium py-1 rounded-md hover:bg-blue-600 hover:text-white transition">
                                            Read Article
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {visibleProduct < totalData.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={handleClick}
                            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsArticles;
