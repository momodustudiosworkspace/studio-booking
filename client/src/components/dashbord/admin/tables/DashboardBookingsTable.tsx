"use client";

import { BookingType } from "@/types/booking.types";
import { formatDate } from "@/utils/dateFormatter";
import Link from "next/link";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import { formatTime } from "@/utils/timeFormatter";
import DashboardAssignStaffDropDown from "../DashboardAssignStaffDropDown";
import { usePathname } from "next/navigation";

interface BookingTableProps {
  bookings: BookingType[];
  isLoading: boolean;
  role?: "admin" | "user";
}

const DashboardBookingsTable = ({ bookings, isLoading, role = "admin" }: BookingTableProps) => {
  const bookingLocation = "C1 Melita Plaze, Gimbiya street, Garki";
  const pathName = usePathname();

  return (
    <div className='w-full rounded-xl bg-white'>
      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            {role === "admin" ? <tr className='border-b bg-gray-50'>
              <th className='px-4 py-5'>Client Name</th>
              <th className='px-4 py-5'>Location</th>
              <th className='px-4 py-5'>Date Book</th>
              <th className='px-4 py-5'>Status</th>
              <th className='px-4 py-5'>Action</th>
            </tr> : <tr className='border-b bg-gray-50'>
              <th className='px-4 py-5'>Booking Id</th>
              <th className='px-4 py-5'>Location</th>
              <th className='px-4 py-5'>Date Book</th>
              <th className='px-4 py-5'>Status</th>
              <th className='px-4 py-5'>Action</th>
            </tr>}
          </thead>

          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <tr key={i} className='animate-pulse border-b'>
                  <td className='px-4 py-5'>
                    <div className='h-4 w-40 rounded bg-gray-200' />
                  </td>
                  <td className='px-4 py-5'>
                    <div className='h-4 w-48 rounded bg-gray-200' />
                  </td>
                  <td className='px-4 py-5'>
                    <div className='h-4 w-24 rounded bg-gray-200' />
                  </td>
                  <td className='px-4 py-5'>
                    <div className='h-4 w-20 rounded bg-gray-200' />
                  </td>
                </tr>
              ))
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={4} className='py-6 text-center text-gray-500'>
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map(booking => (
                <tr key={booking._id} className='border-b hover:bg-gray-50'>
                  <td className='px-4 py-5 font-medium capitalize'>
                    {booking.user_fullnames}
                  </td>

                  <td className='px-4 py-5 capitalize'>
                    {role === "admin" ? booking.location?.address === bookingLocation
                      ? "indoor"
                      : "outdoor" : booking.location?.address}
                  </td>

                  <td className='flex items-center gap-2 px-4 py-5 capitalize'>
                    <div
                      className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
                    >
                      <DashboardIcons value='calendar-grid-outlined-black' />
                    </div>
                    {/* {booking.date} */}
                    <div>
                      <p> {formatDate(booking.date)}</p>
                      <p> {formatTime(booking.startTime)}</p>
                    </div>
                  </td>

                  <td className='px-4 py-5'>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        booking.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className='px-4 py-5'>
                    {pathName === "/admin/dashboard/bookings" ? (
                      <DashboardAssignStaffDropDown
                        bookingId={booking._id || ""}
                        assignedStaffId={`${booking.assignedTo || ""}`}
                      />
                    ) : (
                      <Link
                        href={`/admin/dashboard/bookings/${booking._id}`}
                        className='inline-block rounded-md bg-black px-6 py-2 text-center text-sm font-semibold text-white'
                      >
                        View
                      </Link>
                    )}

                    {/* {booking.assignedTo ? "Assigned" : "Not assigned"} */}
                    {/* {booking.assignedTo ? booking.assignedTo : "Not assigned"} */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {/* {pagination && (
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Page {pagination.page} of {pagination.totalPages}
                    </p>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <button
                            disabled={page >= pagination.totalPages}
                            onClick={() => setPage(p => p + 1)}
                            className="rounded border px-3 py-1 text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )} */}
    </div>
  );
};

export default DashboardBookingsTable;
