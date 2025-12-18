"use client";

import useEmblaCarousel from "embla-carousel-react";

const images = [
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
    "https://images.unsplash.com/photo-1478737270239-2f02b77fc618",
];

export default function CarouselContainer() {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    return (
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="min-w-full flex-shrink-0"
                    >
                        <img
                            src={src}
                            alt={`Slide ${index + 1}`}
                            className="h-[400px] w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
