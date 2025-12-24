"use client";

import { useGetAllStaffQuery } from "@/redux/services/admin/staff-management/adminStaffManagement.api";
import React, { useState } from "react";

const DashboardStaffManagementTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllStaffQuery({
    page,
    limit,
  });

  const staffList = data?.data ?? [];
  const pagination = data?.pagination;

  return (
    <div className='w-full rounded-xl bg-white p-4 shadow-md'>
      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b bg-gray-50'>
              <th className='px-4 py-5'>Name</th>
              <th className='px-4 py-5'>Email</th>
              <th className='px-4 py-5'>Role</th>
              <th className='px-4 py-5'>Status</th>
              <th className='px-4 py-5'>Invitation</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              [...Array(limit)].map((_, i) => (
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
            ) : staffList.length === 0 ? (
              <tr>
                <td colSpan={4} className='py-6 text-center text-gray-500'>
                  No staff members found
                </td>
              </tr>
            ) : (
              staffList.map(staff => (
                <tr key={staff._id} className='border-b hover:bg-gray-50'>
                  <td className='px-4 py-5 font-medium capitalize'>
                    {staff.first_name} {staff.last_name}
                  </td>

                  <td className='px-4 py-5'>{staff.email}</td>

                  <td className='px-4 py-5 capitalize'>{staff.role}</td>

                  <td className='px-4 py-5'>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        staff.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {staff.status}
                    </span>
                  </td>
                  <td className='px-4 py-5'>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        staff.isInvitationAccepted
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {staff.isInvitationAccepted ? "accepted" : "pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination && (
        <div className='mt-4 flex items-center justify-between'>
          <p className='text-sm text-gray-600'>
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className='flex gap-2'>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className='rounded border px-3 py-1 text-sm disabled:cursor-not-allowed bg-black disabled:opacity-55 text-white'
            >
              Previous
            </button>

            <button
              disabled={page >= pagination.totalPages}
              onClick={() => setPage(p => p + 1)}
              className='rounded border px-3 py-1 text-sm disabled:cursor-not-allowed bg-black disabled:opacity-55 text-white'
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStaffManagementTable;
