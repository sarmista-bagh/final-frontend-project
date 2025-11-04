import React from 'react';
import image from "../../assets/news-laptop-computer-isolated-white-19625034.webp";

const Blog = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between bg-yellow-100 border border-green-300 rounded-lg p-6 md:p-12 mt-15 gap-6">
                {/* Left content */}
                <div className="flex-1 pr-0 md:pr-10 text-center md:text-left">
                    <h2 className="text-2xl font-semibold mb-2">
                        Want to know more about today&apos;s <span className="text-red-600 font-bold">TOP 10</span> news?
                    </h2>
                    <p className="text-gray-700 mb-4">Checkout these top news articles!</p>
                    <button className="bg-blue-600 w-full md:w-auto hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold cursor-pointer">
                        Stay Updated with Daily News: Your Go-To Resources
                    </button>
                </div>

                {/* Right image */}
                <div className="w-full md:w-[400px] h-[270px] flex-shrink-0">
                    <img
                        src={image}
                        alt="News"
                        className="rounded-md w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Blog;
