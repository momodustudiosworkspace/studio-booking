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
// import DashboardSessionTable from "./DashBoardSessionTable";
import StaffForm from "./forms/StaffForm";
import DashboardStaffManagementTable from "./tables/DashboardStaffManagementTable";

const DashboardStaffManagement = () => {
  const [open, setOpen] = useState<boolean>(false);

  const analytics = useMemo(() => {
    return [
      {
        title: "Total Sessions",
        count: 12,
        linkText: "Active sessions",
        href: "/admin/sessions",
        dataType: 0,
      },
      {
        title: "Total Packages",
        count: 28,
        linkText: "All packages",
        href: "/admin/packages",
        dataType: 0,
      },
      {
        title: "Team Members",
        count: 8,
        linkText: "View all staff",
        href: "/admin/staff",
        dataType: 0,
      },
      {
        title: "Pending Approvals",
        count: 2,
        linkText: "Review now",
        href: "/admin/approvals",
        dataType: 0,
      },
    ];
  }, []);
  return (
    <DashboardLayout
      headerProps={{
        headerText: "Staff Management",
        paragraph: "Manage studio staff, sessions, and team members",
        linkText: "View all staff",
        href: "/admin/staff",
      }}
    >
      {/* Staff & Sessions Analytics  */}
      <div className='mb-14 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
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
      <div className='space-y-8'>
        {/* Manage Sessions Section */}
        <div className='rounded-lg'>
          <div className='mb-6 flex items-center justify-between rounded-lg bg-white p-6 shadow'>
            <div>
              <h2 className='text-xl font-bold text-black'>Manage Staff</h2>
              <p className='mt-1 text-sm text-gray-600'>
                Create and manage your studio team members
              </p>
            </div>
            <Button
              text='+ Add new staff'
              onClick={() => setOpen(true)}
              icon={<RedirectArrowWhite />}
              iconPosition='right'
              className='w-[190px]'
              size='md'
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
                          <p>Add New Staff Member</p>
                          <small>
                            Enter staff details to add a new team member to your
                            studio.
                          </small>
                        </DialogTitle>
                      </div>
                    </div>
                    <StaffForm setOpen={setOpen} />
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>

          {/* Staff Table  */}
          <div className='mt-6 overflow-hidden rounded-lg shadow'>
            <DashboardStaffManagementTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardStaffManagement;
