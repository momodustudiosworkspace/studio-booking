import React from 'react'
import LinkButton from '../ui/LinkButton';
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite';


interface DashboardHeaderProps{
    headerText: string;
    paragraph: string;
    linkText?: string;
    href?: string;
}
const DashboardHeader = ({headerText, paragraph,linkText, href}:DashboardHeaderProps) => {
  return (
      <div className='flex justify-between items-end w-full'>
          <div>
              <h1 className='text-[24px] capitalize font-bold'>{headerText}</h1>
              <p>{paragraph}</p>
          </div>
          {linkText && <div className='h-[40px]'>
              <LinkButton
                  href={href}
                  size="md"
                  text={linkText}
                  icon={<RedirectArrowWhite />}
                  iconPosition="right"
                  className="w-[200px]"
              />
          </div>}
    </div>
  )
}

export default DashboardHeader