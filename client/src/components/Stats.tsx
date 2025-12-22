import React from "react";

const Stats = () => {
  const stats = [
    { id: 1, name: "Session every 24 hours", value: "14" },
    { id: 2, name: "Outdoor events", value: "2300" },
    { id: 3, name: "New users annually", value: "250" },
  ];
  return (
    <div className='py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <dl className='grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3'>
          {stats.map(stat => (
            <div
              key={stat.id}
              className='mx-auto flex max-w-xs flex-col gap-y-4'
            >
              <dt className='text-base/7 text-gray-400'>{stat.name}</dt>
              <dd className='order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl'>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
