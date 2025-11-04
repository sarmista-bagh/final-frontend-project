import React from 'react';

const teamMembers = [
    {
        name: "Jaime Lannister",
        role: "CEO",
        img: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
    },
    {
        name: "Cersei Lannister",
        role: "CTO",
        img: "https://cdn-icons-png.flaticon.com/512/236/236831.png",
    },
    {
        name: "Daenerys Targaryen",
        role: "Lead Designer",
        img: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
    },
];

const TeamSection = () => {
    return (
        <div className="py-10 bg-gradient-to-b from-gray-100 to-white text-center">
            <div className="max-w-[1400px] mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">
                    Meet Our Team
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4"
                            />
                            <h3 className="text-base md:text-lg font-semibold text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
