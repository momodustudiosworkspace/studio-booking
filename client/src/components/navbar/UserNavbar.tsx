'use client'
import { DashboardIcons } from '@/assets/icons/dashboard/DashboardIcons';
import React, { useState } from 'react'
import Modal from '../ui/Modal';
import DashboardNotifications from '../dashbord/DashboardNotifications';
import MenuBar from '@/assets/icons/MenuBar';


interface UserNavbarProps {
    email: string | undefined;
    accessToken: string | undefined;
    // refreshToken: string | undefined;
    isMember: boolean | undefined;
    isAdmin: boolean | undefined;
}

interface UserProps {
    user: UserNavbarProps
}
const UserNavbar = ({ user }: UserProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [openNotifications, setOpenNotification] = useState<boolean>(false)
    return (
        <div className='flex items-center gap-4 '>
            <button className='relative h-[40px] w-[40px] hover:cursor-pointer flex justify-center items-center bg-[#FAFAFA] rounded-full' onClick={() => {
                setOpenNotification(true)
                setOpen(true)
            }}>
                <DashboardIcons value='notification-solid-black' />
                {!openNotifications && <div className='absolute h-[15px] right-0 -top-1.5 w-[15px] flex justify-center rounded-full items-center bg-red-500'>
                    <span className='text-white text-xs'>2</span>
                </div>}
            </button>
            <div className='hidden sm:flex items-center gap-4'>
                <div className='h-[50px] w-[50px] flex justify-center items-center bg-black text-white uppercase rounded-full'>
                    {user.email?.[0]}{user.email?.[1]}
                </div>
                <div>
                    <p className='font-semibold'>{user.email}</p>
                    <small>{user.email}</small>
                </div>
            </div>
            <div className='sm:hidden flex'>
                <MenuBar />
            </div>

            <Modal isOpen={open} onClose={() => setOpen(false)} contentClassName='sm:right-10 sm:px-0 px-4'>
                <div className='sm:w-[383px] w-full px-5 py-5 bg-white rounded-md'>
                    <div className='flex items-center justify-between'>
                        <h3 className='font-semibold'>Notifications</h3>
                        <button className='h-[20px] w-[20px] flex justify-center rounded-full items-center bg-[#FAFAFA]' onClick={() => setOpen(false)}>
                            <DashboardIcons value='cancel-outlined-black' />
                        </button>
                    </div>
                    <div className='flex items-center text-sm justify-end gap-2 my-5'>
                        <p>Clear notifications</p>
                        <button className='h-[30px] w-[30px] flex justify-center rounded-full items-center bg-red-100/50'><DashboardIcons value='bin-outlined-danger' /></button>
                    </div>
                    <div className='max-h-[700px] overflow-y-scroll'>
                        <DashboardNotifications />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UserNavbar