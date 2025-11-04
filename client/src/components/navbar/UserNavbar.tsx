"use client";
import { DashboardIcons } from "@/assets/icons/dashboard/DashboardIcons";
import React, { useState } from "react";
import Modal from "../ui/Modal";
import DashboardNotifications from "../dashbord/DashboardNotifications";
import MenuBar from "@/assets/icons/MenuBar";
import { redirect } from "next/navigation";

interface UserNavbarProps {
  email: string | undefined;
  accessToken: string | undefined;
  // refreshToken: string | undefined;
  isMember: boolean | undefined;
  isAdmin: boolean | undefined;
}

interface UserProps {
  user: UserNavbarProps;
}
const UserNavbar = ({ user }: UserProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [openNotifications, setOpenNotification] = useState<boolean>(false);
  return (
    <div className='flex items-center gap-4'>
      <button
        className='relative flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#FAFAFA] hover:cursor-pointer'
        onClick={() => {
          setOpenNotification(true);
          setOpen(true);
        }}
      >
        <DashboardIcons value='notification-solid-black' />
        {!openNotifications && (
          <div className='absolute -top-1.5 right-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-red-500'>
            <span className='text-xs text-white'>2</span>
          </div>
        )}
      </button>
      <div className='hidden items-center gap-4 sm:flex'>
        <button className='flex h-[50px] w-[50px] items-center justify-center rounded-full bg-black text-white uppercase' onClick={() => redirect("/dashboard")}>
          {user.email?.[0]}
          {user.email?.[1]}
        </button>
        <div>
          <p className='font-semibold'>{user.email}</p>
          <small>{user.email}</small>
        </div>
      </div>
      <div className='flex sm:hidden'>
        <MenuBar />
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        contentClassName='sm:right-10 sm:px-0 px-4'
      >
        <div className='w-full rounded-md bg-white px-5 py-5 sm:w-[383px]'>
          <div className='flex items-center justify-between'>
            <h3 className='font-semibold'>Notifications</h3>
            <button
              className='flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#FAFAFA]'
              onClick={() => setOpen(false)}
            >
              <DashboardIcons value='cancel-outlined-black' />
            </button>
          </div>
          <div className='my-5 flex items-center justify-end gap-2 text-sm'>
            <p>Clear notifications</p>
            <button className='flex h-[30px] w-[30px] items-center justify-center rounded-full bg-red-100/50'>
              <DashboardIcons value='bin-outlined-danger' />
            </button>
          </div>
          <div className='max-h-[700px] overflow-y-scroll'>
            <DashboardNotifications />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserNavbar;
