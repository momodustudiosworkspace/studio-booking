import { DashboardIcons } from '@/assets/icons/DashboardIcons';
import React from 'react'


interface UserNavbarProps{
    email: string | undefined;
    accessToken: string | undefined;
    // refreshToken: string | undefined;
    isMember: boolean | undefined;
    isAdmin: boolean | undefined;
}

interface UserProps{
    user: UserNavbarProps
}
const UserNavbar = ({user}:UserProps) => {
  return (
      <div className='flex items-center gap-4 '>
          <button className='h-[40px] w-[40px] flex justify-center items-center bg-[#FAFAFA] rounded-full'>
              <DashboardIcons value='notification-solid-black'/>
          </button>
          <div>
              <p className='font-semibold'>{user.email}</p>
              <small>{user.email}</small>
          </div>
    </div>
  )
}

export default UserNavbar