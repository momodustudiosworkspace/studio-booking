import React, { useState } from "react";
import {
  useGetAllSessionsQuery,
  useDeleteSessionsMutation,
} from "@/redux/services/admin/session-and-packages/adminSessionAndPackages.api";
// import PackagesForm from "./forms/PackagesForm";
import SessionPackages from "./DashBoardPackages/SessionPackages";
// import Button from "@/components/ui/Button";
// import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";

interface SelectedSessionProps {
  selectedSessionId: string;
  selectedSessionTitle?: string;
}
const DashboardSessionTable = () => {
  const { data, isLoading } = useGetAllSessionsQuery({
    page: 1,
    limit: 10,
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
  // const [page, setPage] = useState(1);
  // const pageSize = 5;

  // const filtered = useMemo(() => {
  //     if (!data?.sessions) return [];
  //     return data.sessions.filter((s: any) =>
  //         s.title.toLowerCase().includes(search.toLowerCase())
  //     );
  // }, [data, search]);

  // const sorted = useMemo(() => {
  //     return [...filtered].sort((a, b) =>
  //         sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  //     );
  // }, [filtered, sortAsc]);

  // const paginated = useMemo(() => {
  //     const start = (page - 1) * pageSize;
  //     return sorted.slice(start, start + pageSize);
  // }, [sorted, page]);

  // const totalPages = Math.ceil(sorted.length / pageSize);

  console.log("Session data: ", data);
  // console.log("Session sorted: ", sorted);
  // console.log("Session filtered: ", filtered);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this session?")) return;
    await deleteSession(id);
  };

  return (
    <div className='w-full rounded-xl bg-white p-4 shadow-md'>
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
              data?.data.map((session: any) => (
                <tr key={session._id} className='border-b hover:bg-gray-50'>
                  <td className='px-4 py-5 font-medium'>{session.title}</td>
                  <td className='px-4 py-5'>
                    {new Date(session.createdAt).toDateString()}
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        setSelectedSession({
                          selectedSessionId: session._id,
                          selectedSessionTitle: session.title,
                        });
                        setOpen(!open);
                      }}
                    >
                      View packages
                    </button>
                    <SessionPackages
                      selectedSession={selectedSession}
                      open={open}
                      setOpen={setOpen}
                    />
                    {/* <PackagesForm selectedSession={selectedSession} open={open} setOpen={setOpen} /> */}
                  </td>
                  <td className='flex gap-3 px-4 py-5'>
                    <button className='flex items-center gap-1 text-blue-600 hover:underline'>
                      Edit
                    </button>
                    <button
                      className='flex items-center gap-1 text-red-600 hover:underline'
                      onClick={() => handleDelete(session._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DashboardSessionTable;
