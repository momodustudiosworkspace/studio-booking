"use client";
import React from "react";
import CountUp from "react-countup";

const Statistics = (): React.JSX.Element => {
  const STATISTICS = [
    { label: "Studio Session", value: "1550+", count: 1550 },
    { label: "Studio Session", value: "2000+", count: 2000 },
    { label: "Photographers", value: "15+", count: 15 },
    { label: "client rating", value: "4.5/5", count: 4.5 },
  ];
  return (
    <div className='flex flex-col px-8'>
      {STATISTICS.map((stat, index) => (
        <div
          key={index}
          className={`flex flex-col items-center gap-3 border-b-[1px] border-gray-500 py-10 ${index === 0 ? "border-t-[1px]" : "border-t-0"} `}
        >
          <CountUp
            end={stat.count}
            duration={5}
            delay={2}
            suffix='+'
            className='text-3xl font-bold'
          />
          {/* <h2 className=''>{stat.value}</h2> */}
          <p className='text-gray-500'>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
