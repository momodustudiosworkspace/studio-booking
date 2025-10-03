import RedirectArrowWhiteOutlined from '@/assets/icons/RedirectArrowWhiteOutlined';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface CardOneProps {
title:string;
description:string;
image:string;
}
const CardOne = ({ title, description, image }: CardOneProps): React.JSX.Element => {
  return (

    <div className='flex flex-col gap-3 w-full'>
        <Image src={image} alt={`momodu studios ${description}`} className='w-full' width={300} height={200} quality={100} loading='lazy'/>
        <div className='flex justify-between items-center'>
            <h1 className='text-2xl'>{title}</h1>
            <Link href={'/'}><RedirectArrowWhiteOutlined /></Link>
        </div>
        <p className='text-[#AAAAAA] text-xs'>{description}</p>
    </div>
  )
}

export default CardOne