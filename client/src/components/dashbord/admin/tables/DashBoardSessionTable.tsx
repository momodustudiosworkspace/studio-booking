import React, { useState } from "react";
import {
  useGetAllSessionsQuery,
  useDeleteSessionsMutation,
} from "@/redux/services/admin/session-and-packages/adminSessionAndPackages.api";
// import PackagesForm from "./forms/PackagesForm";
import SessionPackages from "../DashBoardPackages/SessionPackages";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/dateFormatter";
import { ISession } from "@/types/session.types";
// import Button from "@/components/ui/Button";
// import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";

interface SelectedSessionProps {
  selectedSessionId: string;
  selectedSessionTitle?: string;
}
const DashboardSessionTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllSessionsQuery({
    page: page,
    limit: limit,
    search: "",
  });
  const [deleteSession] = useDeleteSessionsMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<SelectedSessionProps>({
    selectedSessionId: "",
    selectedSessionTitle: "",
  });

  // const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const pagination = data?.pagination;

  console.log("Packages pagination: ", data?.pagination);
  // console.log("Session sorted: ", sorted);
  // console.log("Session filtered: ", filtered);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this session?")) return;
    await deleteSession(id);
  };

  return (
    <div className='w-full rounded-xl bg-white shadow-md'>
      {/* <div className="flex justify-between items-center mb-4">
                <div className="relative w-60">
                 <input
                        type="text"
                        placeholder="Search sessions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border rounded-md text-sm"
                    />
                </div>
            </div> */}

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full border-collapse text-left'>
          <thead>
            <tr className='border-b bg-gray-50'>
              <th
                className='cursor-pointer px-4 py-5'
                onClick={() => setSortAsc(!sortAsc)}
              >
                Title
                {/* Title {sortAsc ? "▲" : "▼"} */}
              </th>
              <th className='px-4 py-5'>Created At</th>
              <th className='px-4 py-5'>Packages</th>
              <th className='px-4 py-5'>Actions</th>
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
                    <div className='h-4 w-32 rounded bg-gray-200' />
                  </td>
                  <td className='px-4 py-5'>
                    <div className='h-4 w-20 rounded bg-gray-200' />
                  </td>
                </tr>
              ))
            ) : data?.data.length === 0 ? (
              <tr>
                <td colSpan={3} className='py-6 text-center text-gray-500'>
                  No sessions found
                </td>
              </tr>
            ) : (
              data?.data.map((session: ISession) => (
                <tr key={session._id} className='border-b hover:bg-gray-50'>
                  <td className='max-w-[200px] truncate px-4 py-5 font-medium'>
                    {session.title}
                  </td>
                  <td className='max-w-[200px] truncate px-4 py-5'>
                    {formatDate(session.createdAt)}
                  </td>

                  <td className='max-w-[200px] truncate px-4 py-5 capitalize'>
                    <p className='flex w-full flex-wrap gap-2'>
                      {session.packages?.map((pkg, key) => {
                        return (
                          <span key={key} className='font-semibold'>
                            {pkg.title} |{" "}
                          </span>
                        );
                      })}
                    </p>
                    {/* {session.packages?.length ? session.packages.} */}
                  </td>

                  <td className='my-4 flex items-center justify-start gap-3 px-4 py-5'>
                    <SessionPackages
                      selectedSession={selectedSession}
                      open={open}
                      setOpen={setOpen}
                    />
                    <button
                      className='inline-block rounded-md border-[1px] border-black bg-black px-4 py-2 text-center text-sm font-semibold text-white'
                      onClick={() => {
                        setSelectedSession({
                          selectedSessionId: session._id,
                          selectedSessionTitle: session.title,
                        });
                        setOpen(!open);
                      }}
                    >
                      <PencilIcon className='size-5 text-white' />
                    </button>
                    <button
                      className='flex items-center gap-3 rounded-md bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white'
                      onClick={() => handleDelete(session._id)}
                    >
                      <TrashIcon className='size-5 text-white' />
                    </button>
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
            Page {pagination.page} of {pagination.total}
          </p>

          <div className='flex gap-2'>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className='rounded border bg-black px-3 py-1 text-sm text-white disabled:cursor-not-allowed disabled:opacity-55'
            >
              Previous
            </button>

            <button
              disabled={page >= pagination.total}
              onClick={() => setPage(p => p + 1)}
              className='rounded border bg-black px-3 py-1 text-sm text-white disabled:cursor-not-allowed disabled:opacity-55'
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardSessionTable;
