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
    <div className='flex sm:flex-row flex-col px-8 sm:justify-between border-[#CCCCCC] border-b-[1px] border-t-[1px]'>
      {STATISTICS.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col items-center gap-3 border-b-[1px] border-gray-500 sm:border-none py-10 ${index === 0 ? "border-t-[1px]" : "border-t-0"} `}
        >
          <CountUp
            end={stat.count}
            duration={5}
            delay={2}
            suffix='+'
            className='sm:text-5xl text-3xl font-bold'
          />
          {/* <h2 className=''>{stat.value}</h2> */}
          <p className='text-gray-500'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
