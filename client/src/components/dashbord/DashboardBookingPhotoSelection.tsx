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
    setSelectedPhotos((prevSelected) => {
      const alreadySelected = prevSelected.includes(selectedPhoto);

      // Deselect if already selected
      if (alreadySelected) {
        return prevSelected.filter((photo) => photo !== selectedPhoto);
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
    <div className="grid sm:grid-cols-4 grid-cols-2 gap-y-6 gap-x-2 w-full">
      {photos.map((photo, index) => {
        const isSelected = selectedPhotos.includes(index);
        const selectionNumber = isSelected
          ? selectedPhotos.indexOf(index) + 1
          : null;

        return (
          <div
            key={index}
            className={`relative group hover:cursor-pointer sm:w-[310px] w-full sm:ml-4 sm:h-[420px] rounded-lg overflow-hidden transition-all duration-300`}
          >
            <Image
              src={photo}
              alt={`photo-${index}`}
              width={320}
              height={420}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />

            {/* ✅ Inner green overlay border */}
            {isSelected && (
              <div className="absolute inset-0 rounded-lg border-[4px] border-green-400 pointer-events-none" />
            )}

            {/* Selection badge */}
            {isSelected && (
              <div className="absolute top-3 right-3 bg-green-400 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm shadow-md">
                {selectionNumber}
              </div>
            )}

            {/* Hover select button */}
            <button
              onClick={() => handleSelectedPhotos(index)}
              className={`absolute bottom-3 left-1/2 -translate-x-1/2 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 ${isSelected ? "bg-green-400" : "bg-black/70"
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
