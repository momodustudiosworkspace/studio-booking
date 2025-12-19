// "use client";

// // import { useGetAllStaffQuery } from "@/redux/services/admin/staff-management/adminStaffManagement.api";
// // import React, { useState } from "react";



// interface BookingProps {
//     id?: string | null | undefined;
//     location?: string | null | undefined;
//     date?: string | null | undefined;
//     client_name?: string | null | undefined;
//     startTime?: string | null | undefined;
//     status: "cancelled" | "completed" | "pending" | "confirmed" | undefined;
// }

// interface BookingTableProps{
//     bookings: BookingProps[],
//     isLoading:boolean
// }

// const DashboardBookingsTable = ({
//     bookings, isLoading }: BookingTableProps) => {
   
   
//     return (
//         <div className="w-full rounded-xl bg-white p-4 shadow-md">
//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse text-left">
//                     <thead>
//                         <tr className="border-b bg-gray-50">
//                             <th className="px-4 py-5">Client Name</th>
//                             <th className="px-4 py-5">Location</th>
//                             <th className="px-4 py-5">Date</th>
//                             <th className="px-4 py-5">Status</th>
//                             <th className="px-4 py-5">Assigned to</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {isLoading ? (
//                             [...Array(limit)].map((_, i) => (
//                                 <tr key={i} className="animate-pulse border-b">
//                                     <td className="px-4 py-5">
//                                         <div className="h-4 w-40 rounded bg-gray-200" />
//                                     </td>
//                                     <td className="px-4 py-5">
//                                         <div className="h-4 w-48 rounded bg-gray-200" />
//                                     </td>
//                                     <td className="px-4 py-5">
//                                         <div className="h-4 w-24 rounded bg-gray-200" />
//                                     </td>
//                                     <td className="px-4 py-5">
//                                         <div className="h-4 w-20 rounded bg-gray-200" />
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : bookings.length === 0 ? (
//                             <tr>
//                                 <td colSpan={4} className="py-6 text-center text-gray-500">
//                                     No bookings found
//                                 </td>
//                             </tr>
//                         ) : (
//                             bookings.map(booking => (
//                                 <tr
//                                     key={booking.id}
//                                     className="border-b hover:bg-gray-50"
//                                 >
//                                     <td className="px-4 py-5 font-medium capitalize">
//                                         {booking.client_name}
//                                     </td>

//                                     <td className="px-4 py-5">{booking.location}</td>

//                                     <td className="px-4 py-5 capitalize">
//                                         {booking.date}
//                                     </td>

//                                     <td className="px-4 py-5">
//                                         <span
//                                             className={`rounded-full px-3 py-1 text-xs font-medium ${booking.status === "completed"
//                                                     ? "bg-green-100 text-green-700"
//                                                     : "bg-yellow-100 text-yellow-700"
//                                                 }`}
//                                         >
//                                             {booking.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-4 py-5">
                                       
//                                             {booking.date ? "accepted" : "pending"}
                                      
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination Controls */}
//             {/* {pagination && (
//                 <div className="mt-4 flex items-center justify-between">
//                     <p className="text-sm text-gray-600">
//                         Page {pagination.page} of {pagination.totalPages}
//                     </p>

//                     <div className="flex gap-2">
//                         <button
//                             disabled={page === 1}
//                             onClick={() => setPage(p => p - 1)}
//                             className="rounded border px-3 py-1 text-sm disabled:opacity-50"
//                         >
//                             Previous
//                         </button>

//                         <button
//                             disabled={page >= pagination.totalPages}
//                             onClick={() => setPage(p => p + 1)}
//                             className="rounded border px-3 py-1 text-sm disabled:opacity-50"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             )} */}
//         </div>
//     );
// };

// export default DashboardBookingsTable;
