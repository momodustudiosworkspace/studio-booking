"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
  "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
];

export default function CarouselContainer() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className='flex justify-center bg-black py-20'>
      <div className='mx-auto overflow-hidden rounded-xl' ref={emblaRef}>
        <div className='flex max-w-7xl px-4'>
          {images.map((src, index) => (
            <div key={index} className='relative min-w-full flex-shrink-0'>
              <div className='absolute text-white'>Welcome</div>
              <Image
                height={300}
                width={400}
                src={src}
                alt={`Slide ${index + 1}`}
                className='h-[400px] w-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
