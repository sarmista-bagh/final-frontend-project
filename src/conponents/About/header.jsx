import React from 'react';
import image from "../../assets/vectorized-hand-drawing-retro-gray-portable-typewriter-retro-gray-portable-typewriter-127420885.webp";

const Header = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 py-10 md:py-16 bg-white">
                {/* Text Section */}
                <div className="max-w-md w-full text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        Who We Are
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                        We are a passionate team committed to driving change through innovation and collaboration.
                        Our platform is designed to empower individuals and organizations to unlock their true
                        potential.
                    </p>
                </div>

                {/* Image Section */}
                <div className="w-full max-w-sm">
                    <img
                        src={image}
                        alt="Typewriter"
                        className="rounded-lg w-full h-auto object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
