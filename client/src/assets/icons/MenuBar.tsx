import React from "react";

const MenuBar = () => {
  return (
    <button className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-50'>
      <svg
        width='16'
        height='13'
        viewBox='0 0 16 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.5 2.36619V0.699524H15.5V2.36619H0.5ZM0.5 12.3662V10.6995H15.5V12.3662H0.5ZM0.5 7.36619V5.69952H15.5V7.36619H0.5Z'
          fill='#1C1B1F'
        />
      </svg>
    </button>
  );
};

export default MenuBar;
