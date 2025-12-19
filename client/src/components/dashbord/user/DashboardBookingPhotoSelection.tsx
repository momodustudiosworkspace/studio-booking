"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const photos = [
  "/dashboard/select.jpg",
  "/dashboard/select-2.jpg",
  "/dashboard/select-2.jpg",
  "/dashboard/select-2.jpg",
  "/dashboard/select-2.jpg",
  "/dashboard/select-2.jpg",
  "/dashboard/select-2.jpg",
  "/dashboard/select-2.jpg",
  "/dashboard/select-2.jpg",
];

interface DashboardBookingPhotoSelectionProps {
  setTotalSelectedPhotos: (value: number) => void;
}

const DashboardBookingPhotoSelection = ({
  setTotalSelectedPhotos,
}: DashboardBookingPhotoSelectionProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([]);
  const totalPhotoSelection = 4;
  const handleSelectedPhotos = (selectedPhoto: number) => {
    setSelectedPhotos(prevSelected => {
      const alreadySelected = prevSelected.includes(selectedPhoto);

      // Deselect if already selected
      if (alreadySelected) {
        return prevSelected.filter(photo => photo !== selectedPhoto);
      }

      // Prevent selecting more than limit
      if (prevSelected.length >= totalPhotoSelection) {
        return prevSelected; // only allow deselection
      }

      // Add new selection
      return [...prevSelected, selectedPhoto];
    });
  };

  // Notify parent when selections change
  useEffect(() => {
    setTotalSelectedPhotos(selectedPhotos.length);
  }, [selectedPhotos, setTotalSelectedPhotos]);

  return (
    <div className='grid w-full grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-5'>
      {photos.map((photo, index) => {
        const isSelected = selectedPhotos.includes(index);
        const selectionNumber = isSelected
          ? selectedPhotos.indexOf(index) + 1
          : null;

        return (
          <div
            key={index}
            className={`group relative w-full overflow-hidden rounded-lg transition-all duration-300 hover:cursor-pointer sm:h-[320px] sm:w-[229px]`}
          >
            <Image
              src={photo}
              alt={`photo-${index}`}
              width={320}
              height={420}
              className='h-full w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105'
            />

            {/* ✅ Inner green overlay border */}
            {isSelected && (
              <div className='pointer-events-none absolute inset-0 rounded-lg border-[4px] border-green-400' />
            )}

            {/* Selection badge */}
            {isSelected && (
              <div className='absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-sm font-semibold text-white shadow-md'>
                {selectionNumber}
              </div>
            )}

            {/* Hover select button */}
            <button
              onClick={() => handleSelectedPhotos(index)}
              className={`absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg px-4 py-2 text-sm text-white transition-colors duration-200 ${
                isSelected ? "bg-green-400" : "bg-black/70"
              }`}
            >
              {isSelected ? "Deselect" : "Select"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardBookingPhotoSelection;
