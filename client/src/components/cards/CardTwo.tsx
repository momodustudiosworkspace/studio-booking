"use client"
import React from 'react'
import Avatar from 'react-avatar';
import { Rating } from 'react-simple-star-rating';

interface CardOneProps {
  title: string;
  subtitle?: string;
  description?: string;
  author: string;
  image: string;
  rating: number;
}
const CardTwo = ({ title, description, author, image, subtitle, rating }: CardOneProps) => {

  return (
    <div className='bg-[#FAFAFA]  rounded-md px-4 pt-6 pb-16 flex flex-col gap-6'>
      {/* bg-[#FAFAFA] */}
      <div>
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" size='50' className='rounded-full' />
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" size='50' className='rounded-full -ml-2' />

      </div>
      {/* <div className='  w-full flex'>

        <Rating />
      </div> */}

      <h1 className='text-2xl font-montserrat font-bold'>{title}</h1>
      <div>
        <p className='font-semibold text-lg'>{author}</p>
        <h1>{description}</h1>
      </div>

    </div>
  )
}

export default CardTwo