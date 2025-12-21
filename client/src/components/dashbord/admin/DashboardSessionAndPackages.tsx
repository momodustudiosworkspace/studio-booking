"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "./DashboardLayout";
import BookingCardAnalytics from "./cards/BookingCardAnalytics";
// import SessionForm from './forms/SessionForm'
import Button from "@/components/ui/Button";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import SessionForm from "./forms/SessionForm";
import DashboardSessionTable from "./DashBoardSessionTable";
import { useGetSessionAndPackagesCountQuery } from "@/redux/services/admin/session-and-packages/adminSessionAndPackages.api";

const DashboardSessionAndPackages = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: stats, isLoading: isStatsLoading } = useGetSessionAndPackagesCountQuery();

  const analytics = useMemo(
    () => {
      // const total = bookings?.length || 2000;
      // const completed = bookings?.filter(b => b.status === "completed").length || 0;
      // const upcoming = bookings?.filter(b => b.status === "pending").length || 0;
      // const cancelled = bookings?.filter(b => b.status === "cancelled").length || 0;

      return [
        {
          title: "Total Sessions",
          count: isStatsLoading ? "Loading..." : stats?.data?.totalSessions || 0,
          linkText: "From 2025",
          href: "/bookings",
          dataType: 0,
        },
        {
          title: "Total Packages",
          count: isStatsLoading ? "Loading..." : stats?.data?.totalPackages || 0,
          linkText: "For all sessions",
          href: "/bookings",
          dataType: 0,
        },
        //    {
        //      title: "Total Revenue",
        //      count: 0,
        //      linkText: "Next session soon",
        //      href: "/bookings",
        //      dataType: 1,
        //    },
        //    {
        //      title: "Upcoming Sessions",
        //      count:  0,
        //      linkText: "View all",
        //      href: "/bookings",
        //      dataType: 0,
        //    },
      ];
    },
    [
      //  stats?.data.totalBookings,
      //  stats?.data.totalClients,
      //  stats?.data.totalRevenue,
    ]
  );
  return (
    <DashboardLayout
      headerProps={{
        headerText: "Sessions & Packages",
        paragraph: "Manage all sessions and packages offered to clients",
        linkText: "",
        href: "",
      }}
    >
      {/* Session & package analytics  */}
      <div className='mb-14 flex w-full flex-col items-center gap-4 sm:flex-row'>
        {analytics.map((card, key) => (
          <BookingCardAnalytics
            key={key}
            title={card.title}
            count={card.count || 0}
            text={card.linkText}
            dataType={card.dataType}
          />
        ))}
      </div>
      <div>
        {/* Additional content for sessions and packages can be added here */}
        <div className='flex items-start'>
          {/* Create Session  */}
          <div className='flex w-full items-center justify-between rounded-lg bg-white p-6 shadow'>
            <div>
              <h2 className='text-xl font-bold'>Manage Sessions</h2>
              <p className='mt-1 text-sm text-gray-400'>
                Create and manage studio session
              </p>
            </div>
            <Button
              text='+ Create session'
              onClick={() => setOpen(true)}
              icon={<RedirectArrowWhite />}
              iconPosition='right'
              className='w-[190px]'
              size='md'
              //   loading={isSubmitting}
              //   disabled={isSubmitting}
            />
          </div>

          {/* Modal Form */}
          <Dialog open={open} onClose={setOpen} className='relative z-50'>
            <DialogBackdrop
              transition
              className='fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-1000 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
            />

            <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
              <div className='flex h-screen items-center justify-center p-4 text-center sm:p-0'>
                <DialogPanel
                  transition
                  className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95'
                >
                  <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div className='mb-5 sm:flex sm:items-center'>
                      <div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-black/30 sm:mx-0 sm:size-10'>
                        <PlusCircleIcon
                          aria-hidden='true'
                          className='size-6 text-black'
                        />
                      </div>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <DialogTitle
                          as='h3'
                          className='text-base font-semibold text-black'
                        >
                          <p>Session creation form</p>
                          <small>
                            {" "}
                            Enter session title in the form below to create a
                            new session.
                          </small>
                        </DialogTitle>
                      </div>
                    </div>
                    <SessionForm setOpen={setOpen} />
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
        <div className='mt-8'>
          {/* Session Table  */}
          <DashboardSessionTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSessionAndPackages;
