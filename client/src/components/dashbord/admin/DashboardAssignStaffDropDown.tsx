"use client";

import React, { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useGetAllStaffQuery } from "@/redux/services/admin/staff-management/adminStaffManagement.api";
import { useAssignStaffToBookingMutation } from "@/redux/services/admin/booking/adminBooking.api";

interface Staff {
  _id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface AssignStaffDropdownProps {
  bookingId: string;
  assignedStaffId?: string;
}

export default function DashboardAssignStaffDropDown({
  bookingId,
  assignedStaffId,
}: AssignStaffDropdownProps) {
  console.log("bookingId: ", bookingId);
  // Fetch staff list
  const { data, isLoading: isStaffLoading } = useGetAllStaffQuery({
    page: 1,
    limit: 50,
  });
  const staffList: Staff[] = React.useMemo(() => data?.data || [], [data]);

  // State for selected staff
  const [selected, setSelected] = useState<Staff | undefined>(undefined);

  // Mutation to assign staff
  const [assignStaff, { isLoading: isAssigning }] =
    useAssignStaffToBookingMutation();

  // Update selected once staff list is loaded
  useEffect(() => {
    if (!staffList.length) return;
    const staff =
      staffList.find(s => s._id === assignedStaffId) || staffList[0];
    setSelected(staff);
  }, [staffList, assignedStaffId]);

  const handleSelect = async (staff: Staff) => {
    console.log("selected staff: ", staff);
    console.log("bookingId: ", bookingId);

    setSelected(staff);
    try {
      await assignStaff({ bookingId, staffId: staff._id }).unwrap();
    } catch (err) {
      console.error("Failed to assign staff", err);
    }
  };

  if (isStaffLoading) return <p className='text-gray-400'>Loading staff...</p>;
  if (!staffList.length)
    return <p className='text-gray-400'>No staff available</p>;
  if (!selected) return null; // <-- ensures Listbox value is never undefined
  return (
    <Listbox value={selected} onChange={handleSelect}>
      <label className='block text-sm font-medium text-white'>
        Assigned to
      </label>
      <div className='relative -mt-4'>
        <ListboxButton className='grid w-full cursor-default rounded-md bg-black py-1.5 pr-2 pl-3 text-left text-white outline-none sm:text-sm'>
          <span className='col-start-1 row-start-1 flex items-center gap-3 pr-6'>
            {selected?.avatar && (
              <Image
                width={32}
                height={32}
                src={selected.avatar}
                alt={selected.first_name}
                className='rounded-full bg-gray-700'
              />
            )}
            <span className='block truncate'>
              {selected
                ? `${selected.first_name} ${selected.last_name}`
                : "Select Staff"}
            </span>
          </span>
          <ChevronUpDownIcon className='col-start-1 row-start-1 h-5 w-5 self-center justify-self-end text-gray-400' />
        </ListboxButton>

        <ListboxOptions className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md border-none bg-black py-1 text-base outline-none sm:text-sm'>
          {staffList.map(staff => (
            <ListboxOption
              key={staff._id}
              value={staff}
              className='relative cursor-default py-2 pr-9 pl-3 text-white select-none'
            >
              <div className='flex items-center gap-2'>
                {staff.avatar && (
                  <Image
                    width={32}
                    height={32}
                    src={staff.avatar}
                    alt=''
                    className='rounded-full'
                  />
                )}
                <span className='truncate'>
                  {staff.first_name} {staff.last_name}
                </span>
              </div>
              {selected?._id === staff._id && (
                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-white'>
                  <CheckIcon className='h-5 w-5' />
                  {isAssigning && (
                    <span className='ml-1 text-xs text-gray-200'>…</span>
                  )}
                </span>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
