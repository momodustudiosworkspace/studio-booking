"use client";

import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";


const timelineData = [
    {
        title: "booked",
        description: "Understanding the requirements and gathering insights to plan the next steps effectively.",
    },
    {
        title: "prep",
        description: "Creating wireframes, layouts, and prototypes to visualize the user experience.",
    },
    {
        title: "profs ready",
        description: "Building the core features, writing clean code, and integrating APIs.",
    },
    {
        title: "final delivery",
        description: "Conducting QA tests and deploying the final version to production.",
    },
];

const DashboardBookingTimeline = ()=> {
    return (
        <div className="relative border-l-2 border-dashed border-gray-300 ml-2 mt-6">
            {timelineData.map((item, index) => (
                <div key={index} className="mb-10 relative">
                    {/* Icon */}
                    <div className="absolute -left-[10px] top-1 bg-white rounded-full">
                       {index > 2 ? <DashboardIcons value="circle-outlined-black" /> : <DashboardIcons value="check-solid-black" />}
                    </div>

                    {/* Text Content */}
                    <div className="ml-8 pb-6 border-b-[1px] border-gray-300 -mt-2">
                        <h3 className="text-lg font-semibold text-gray-800 capitalize">{item.title}</h3>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default DashboardBookingTimeline