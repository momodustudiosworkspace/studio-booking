import RedirectArrowWhiteOutlined from "@/assets/icons/RedirectArrowWhiteOutlined";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardOneProps {
  title: string;
  description: string;
  image: string;
}
const CardOne = ({
  title,
  description,
  image,
}: CardOneProps): React.JSX.Element => {
  return (
    <div className='flex w-full flex-col gap-3'>
      <Image
        src={image}
        alt={`momodu studios ${description}`}
        className='w-full'
        width={300}
        height={200}
        quality={100}
        loading='lazy'
      />
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>{title}</h1>
        <Link href={"/"}>
          <RedirectArrowWhiteOutlined />
        </Link>
      </div>
      <p className='text-xs text-[#AAAAAA]'>{description}</p>
    </div>
  );
};

export default CardOne;
