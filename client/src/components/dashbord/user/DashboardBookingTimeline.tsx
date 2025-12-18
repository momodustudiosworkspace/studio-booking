"use client";

import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";

const timelineData = [
  {
    title: "booked",
    description:
      "Understanding the requirements and gathering insights to plan the next steps effectively.",
  },
  {
    title: "prep",
    description:
      "Creating wireframes, layouts, and prototypes to visualize the user experience.",
  },
  {
    title: "profs ready",
    description:
      "Building the core features, writing clean code, and integrating APIs.",
  },
  {
    title: "final delivery",
    description:
      "Conducting QA tests and deploying the final version to production.",
  },
];

const DashboardBookingTimeline = () => {
  return (
    <div className='relative mt-6 ml-2 border-l-2 border-dashed border-gray-300'>
      {timelineData.map((item, index) => (
        <div key={index} className='relative mb-10'>
          {/* Icon */}
          <div className='absolute top-1 -left-[10px] rounded-full bg-white'>
            {index > 2 ? (
              <DashboardIcons value='circle-outlined-black' />
            ) : (
              <DashboardIcons value='check-solid-black' />
            )}
          </div>

          {/* Text Content */}
          <div className='-mt-2 ml-8 border-b-[1px] border-gray-300 pb-6'>
            <h3 className='text-lg font-semibold text-gray-400 capitalize'>
              {item.title}
            </h3>
            <p className='mt-1 text-sm leading-relaxed text-white'>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DashboardBookingTimeline;
