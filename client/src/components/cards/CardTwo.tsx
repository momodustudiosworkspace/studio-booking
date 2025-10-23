"use client";
import React from "react";
import Avatar from "react-avatar";
// import { Rating } from 'react-simple-star-rating';

interface CardOneProps {
  title: string;
  // subtitle?: string;
  description?: string;
  author: string;
  // image: string;
  // rating: number;
}
const CardTwo = ({
  title,
  description,
  author,
}: CardOneProps): React.JSX.Element => {
  return (
    <div className='flex flex-col gap-6 rounded-md bg-[#FAFAFA] px-4 pt-6 pb-16'>
      {/* bg-[#FAFAFA] */}
      <div>
        <Avatar
          name='Ryan Florence'
          src='https://bit.ly/ryan-florence'
          size='50'
          className='rounded-full'
        />
        <Avatar
          name='Ryan Florence'
          src='https://bit.ly/ryan-florence'
          size='50'
          className='-ml-2 rounded-full'
        />
      </div>
      {/* <div className='  w-full flex'>

        <Rating />
      
      </div> */}

      <h1 className='font-montserrat text-2xl font-bold'>{title}</h1>
      <div>
        <p className='text-lg font-semibold'>{author}</p>
        <h1>{description}</h1>
      </div>
    </div>
  );
};

export default CardTwo;
