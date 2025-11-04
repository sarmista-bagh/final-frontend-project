import React from "react";
import image from "../../assets/images.jpeg";

const Advertise = () => {
    return (
        <div className="w-full max-w-[1000px] mx-auto rounded-xl border border-emerald-200 bg-white shadow-sm flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-6 animate-fade-in mt-10">
            {/* Left: Text + Button */}
            <div className="flex-1 flex flex-col justify-center items-start text-center md:text-left">
                <h2 className="text-xl md:text-3xl font-semibold mb-2 text-black leading-snug">
                    Want to know more about today&apos;s
                    <span className="ml-1 font-bold text-red-600">TOP 10</span>
                    <span className="ml-1">news?</span>
                </h2>
                <p className="text-gray-500 text-sm md:text-base mb-5 max-w-md mx-auto md:mx-0">
                    Checkout these top news articles!
                </p>
                <button
                    className="w-full md:w-auto px-6 py-2 bg-black hover:bg-gray-800 transition-colors text-white font-medium rounded shadow focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    style={{ minWidth: "auto", maxWidth: "100%" }}
                >
                    Stay Updated with Daily News: Your Go-To Resources
                </button>
            </div>
            {/* Right: Illustration */}
            <div className="flex-shrink-0 flex items-center justify-center w-full md:w-[220px]">
                <img
                    src={image}
                    alt="News Illustration"
                    className="rounded-[6px] object-contain w-full max-w-[220px] h-[140px] bg-[#e6f3f7]"
                    draggable={false}
                />
            </div>
        </div>
    );
};

export default Advertise;
