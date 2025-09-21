"use client"
import React from 'react'
import Avatar from 'react-avatar';
import { Rating } from 'react-simple-star-rating';

interface CardOneProps {
title:string;
subtitle?:string;
description?:string;
author:string;
image?:string;
rating?:number;
}
const CardTwo = ({title,description,author,image, subtitle, rating}:CardOneProps) => {

  return (
    <div className='bg-[#FAFAFA]'>
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence"  className='rounded-full' />
        <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence"  className='rounded-full' />
       

        <Rating initialValue={rating} iconsCount={rating} allowFraction readonly size={20} />
        <h1>{title}</h1>
        
    </div>
  )
}

export default CardTwo