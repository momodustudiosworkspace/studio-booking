"use client";

import { formatDate } from "@/utils/dateFormatter";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import { UserTypesResponse } from "@/types/user.types";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

interface ClientTableProps {
  users: UserTypesResponse[];
  isLoading: boolean;
}

const DashboardClientsTable = ({ users, isLoading }: ClientTableProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] =
    useState<UserTypesResponse | null>(null);
  return (
    <div className='relative w-full rounded-xl bg-white'>
      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b bg-gray-50'>
              <th className='px-4 py-5'>Name</th>
              <th className='px-4 py-5'>Email</th>
              <th className='px-4 py-5'>Date joined</th>
              <th className='px-4 py-5'>Booking</th>
              <th className='px-4 py-5'>Status</th>
              <th className='px-4 py-5'>Action </th>
            </tr>
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
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className='py-6 text-center text-gray-500'>
                  No bookings found
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr
                  key={user._id}
                  className='border-b font-medium hover:bg-gray-50'
                >
                  <td className='max-w-[200px] truncate px-4 py-5 font-medium capitalize'>
                    {user.first_name?.toLowerCase()}{" "}
                    {user.last_name?.toLowerCase()}
                  </td>

                  <td className='max-w-[200px] truncate px-4 py-5'>
                    {user.email}
                  </td>

                  <td className='flex max-w-[200px] items-center gap-2 truncate px-4 py-5 capitalize'>
                    <div
                      className={`flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#FAFAFA]`}
                    >
                      <DashboardIcons value='calendar-grid-outlined-black' />
                    </div>
                    {/* {booking.date} */}
                    <div>
                      <p> {formatDate(user.createdAt)}</p>
                      {/* <p> {formatTime(user.createdAt)}</p> */}
                    </div>
                  </td>
                  <td className='px-4 py-5 text-center capitalize'>
                    {user.totalBookings}
                  </td>

                  <td className='px-4 py-5'>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        user.isMember
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.isMember ? "active" : "inactive"}
                    </span>
                  </td>
                  <td className='px-4 py-5'>
                    <button
                      onClick={() => {
                        setSelectedUserId(user);
                        setOpen(true);
                      }}
                      className='inline-block rounded-md bg-black px-6 py-2 text-center text-sm font-semibold text-white'
                    >
                      View
                    </button>

                    {/* {booking.assignedTo ? "Assigned" : "Not assigned"} */}
                    {/* {booking.assignedTo ? booking.assignedTo : "Not assigned"} */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* User  profile modal  */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        contentClassName='sm:right-10 sm:px-0 px-4 top-44'
      >
        <div className='flex w-full flex-col gap-10 rounded-md bg-white px-5 py-5 sm:w-[383px]'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>User profile</h3>
            <button
              className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#FAFAFA]'
              onClick={() => setOpen(false)}
            >
              <DashboardIcons value='cancel-outlined-black' />
            </button>
          </div>

          {/* Profile details  */}
          <div className='max-h-[700px] overflow-y-scroll'>
            <div className='mb-7 hidden items-center gap-4 sm:flex'>
              <div className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-black text-white uppercase'>
                {selectedUserId ? selectedUserId.first_name?.[0] : ""}
                {selectedUserId?.email?.[1]}
              </div>
              <div>
                <p className='font-semibold'>{selectedUserId?.email}</p>
                <small>
                  {selectedUserId?.isMember
                    ? "Premuim account"
                    : "Free account"}
                </small>
              </div>
            </div>
            {/* <LinkButton
                            href={`/admin/dashboard/bookings/${id}`}
                            size='md'
                            text={"View bookings"}
                            icon={<RedirectArrowWhite />}
                            iconPosition='right'
                            className='mb-7 w-auto'
                        /> */}

            {/* profile data  */}

            {/* Personal data  */}
            <div className='mb-5 rounded-md border-[1px] border-[#E5E5E5]'>
              <h2 className='rounded-tl-md rounded-tr-md bg-[#F9FAFB] p-4'>
                Personal Details
              </h2>
              <div className='flex flex-col gap-3 p-4'>
                <div className='flex items-center justify-between capitalize'>
                  <p>full name</p>
                  <p>
                    {selectedUserId?.first_name} {selectedUserId?.last_name}
                  </p>
                </div>
                <div className='flex items-center justify-between'>
                  <p className='capitalize'>email address</p>
                  <p className='max-w-[150px] truncate'>
                    {selectedUserId?.email}
                  </p>
                </div>
                <div className='flex items-center justify-between capitalize'>
                  <p>phone number</p>
                  <p>
                    {selectedUserId?.phoneNumber
                      ? selectedUserId.phoneNumber
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Account details  */}
            <div className='rounded-md border-[1px] border-[#E5E5E5]'>
              <h2 className='rounded-tl-md rounded-tr-md bg-[#F9FAFB] p-4'>
                Account details
              </h2>
              <div className='flex flex-col gap-3 p-4'>
                <div className='flex items-center justify-between capitalize'>
                  <p>join date</p>
                  <p>
                    {selectedUserId?.createdAt
                      ? formatDate(selectedUserId.createdAt)
                      : "N/A"}
                  </p>
                </div>
                <div className='flex items-center justify-between capitalize'>
                  <p>status</p>
                  <p className='flex items-center justify-center rounded-full bg-[#0362001A] px-4 py-1 text-sm font-semibold text-[#036200]'>
                    {selectedUserId?.totalBookings ? "Active" : "Inactive"}
                  </p>
                </div>
                <div className='flex items-center justify-between capitalize'>
                  <p>total booking</p>
                  <p className='font-semibold'>
                    {selectedUserId?.totalBookings} booking
                    {selectedUserId?.totalBookings &&
                    selectedUserId.totalBookings > 1
                      ? "s"
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

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

export default DashboardClientsTable;
