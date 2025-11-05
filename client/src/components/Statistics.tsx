"use client";
import React from "react";
import CountUp from "react-countup";

const Statistics = (): React.JSX.Element => {
  const STATISTICS = [
    { label: "Studio Session", value: "5550+", count: 5550 },
    { label: "Happy clients", value: "2050+", count: 2050 },
    { label: "Photographers", value: "35+", count: 35 },
    { label: "client rating", value: "4.5/5", count: 4.5 },
  ];
  return (
    <div className='flex flex-col border-t-[1px] border-b-[1px] border-[#CCCCCC] px-8 sm:flex-row sm:justify-between'>
      {STATISTICS.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col items-center gap-3 border-b-[1px] border-gray-500 py-10 sm:border-none ${index === 0 ? "border-t-[1px]" : "border-t-0"} `}
        >
          <CountUp
            end={stat.count}
            duration={5}
            delay={2}
            suffix='+'
            className='text-3xl font-bold sm:text-5xl'
          />
          {/* <h2 className=''>{stat.value}</h2> */}
          <p className='text-gray-500'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
