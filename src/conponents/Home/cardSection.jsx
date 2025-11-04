import React from 'react';
import { BookOpen, Globe, Rocket } from 'lucide-react';

const CardSection = () => {
    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-10">
                Why You'll Love Morning Dispatch
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card 1 */}
                <div
                    className="bg-gray-100 p-6 rounded-lg shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="flex justify-center mb-4">
                        <BookOpen className="w-10 h-10 text-pink-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Diverse Content</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Explore news on a variety of topics, from technology to lifestyle.
                    </p>
                </div>

                {/* Card 2 */}
                <div
                    className="bg-gray-100 p-6 rounded-lg shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="flex justify-center mb-4">
                        <Globe className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Community Driven</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Connect with writers and readers who share your interests.
                    </p>
                </div>

                {/* Card 3 */}
                <div
                    className="bg-gray-100 p-6 rounded-lg shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <div className="flex justify-center mb-4">
                        <Rocket className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        A seamless platform for sharing and discovering great content.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardSection;
