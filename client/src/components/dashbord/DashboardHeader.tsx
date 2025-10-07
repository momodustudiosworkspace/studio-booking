import React from 'react'
import LinkButton from '../ui/LinkButton';
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite';


interface DashboardHeaderProps{
    headerText: string;
    paragraph: string;
    linkText?: string;
    badge?: string | undefined;
    badgeStatus?: number | undefined;
    badgeClass?: string | undefined; 
    href?: string;
}
const DashboardHeader = ({
    headerText, paragraph, linkText, href, badge,
    badgeStatus,
    badgeClass,
}: DashboardHeaderProps) => {

    const bagdeStatusStyle = badgeStatus === 0 ? "bg-red-200 text-red-500" : badgeStatus === 1 ? "bg-[#0362001A] text-[#036200]" : badgeStatus === 2 ? "bg-blue-300 text-blue-600" : badgeStatus === 3 ? "bg-[#E595001A] text-[#E59500]" : ""
  return (
      <div className='flex justify-between items-end w-full'>
          <div>
              <div className='flex items-center gap-3'>
                  <h1 className='text-[24px] capitalize font-bold'>{headerText}</h1>
                  {badge && <span className={`${badgeClass} ${bagdeStatusStyle} text-xs rounded-full px-2 py-1 flex items-center justify-center capitalize font-semibold`}>{badge}</span>}
              </div>
              <p className='capitalize'>{paragraph}</p>
          </div>
          {linkText && <div className='h-[40px]'>
              <LinkButton
                  href={href}
                  size="md"
                  text={linkText}
                  icon={<RedirectArrowWhite />}
                  iconPosition="right"
                  className="w-auto"
              />
          </div>}
    </div>
  )
}

export default DashboardHeader