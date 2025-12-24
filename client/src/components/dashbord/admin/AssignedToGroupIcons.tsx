import { BookingAssignedTo } from "@/types/booking.types";
import React from "react";

interface GroupIconsProps {
  groups?: BookingAssignedTo[]; // each item is initials like "EM"
}

const AssignedToGroupIcons = ({ groups }: GroupIconsProps) => {
  console.log("Groups: ", groups);

  return (
    <div className='flex -space-x-2'>
      {groups && groups.length > 0 ? (
        groups.map((initials, index) => (
          <div
            key={index}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg ring-1 ring-gray-900'
          >
            {initials.first_name?.[0] || ""}
            {initials.last_name?.[0] || ""}
          </div>
        ))
      ) : (
        <>Not assigned</>
      )}
    </div>
  );
};

export default AssignedToGroupIcons;
