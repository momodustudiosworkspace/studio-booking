import { BookingAssignedTo } from "@/types/booking.types";
import React from "react";

interface GroupIconsProps {
    groups?: BookingAssignedTo[]; // each item is initials like "EM"
}

const DashboardGroupIcons = ({ groups }: GroupIconsProps) => {
    console.log("Groups: ", groups);
    
    return (
        <div className="flex -space-x-2">
            {groups && groups.length > 0 ? (
                groups.map((initials, index) => (
                    <div
                        key={index}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 text-white font-bold text-lg ring-2 ring-gray-900"
                    >
                        {initials.first_name?.[0] || ""}{initials.last_name?.[0] || ""}
                        
                    </div>
                ))
            ) : (
                <>
                   Not assigned
                </>
            )}
        </div>
    );
};

export default DashboardGroupIcons;
