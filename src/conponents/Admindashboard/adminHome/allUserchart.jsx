import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0000FF', '#E0E7FF'];  // Blue

const AllUserchart = ({ totalUser }) => {
    const targetTotal = 100;
    const data = [
        { name: 'Total Users', value: totalUser },
        { name: 'Remaining', value: targetTotal - totalUser },
    ];

    return (
        <div
            className="w-full max-w-md mx-auto p-4 bg-white rounded-xl shadow-md flex flex-col items-center">
            <h1 className="text-xl sm:text-2xl font-medium mb-2 text-center">All Users</h1>
            <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            startAngle={90}
                            endAngle={-270}
                            cornerRadius={15}
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={window.innerWidth < 640 ? 18 : 24}  // smaller font on mobile
                            fontWeight="bold"
                            fill="#333"
                        >
                            {totalUser}
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <h1 className="text-gray-500 pt-4 text-center text-sm sm:text-base">
                Showing total user for all time
            </h1>
        </div>
    );
};

export default AllUserchart;
