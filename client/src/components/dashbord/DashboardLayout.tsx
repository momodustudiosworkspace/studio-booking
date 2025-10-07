import React from 'react'
import DashboardHeader from './DashboardHeader';


interface DashboardLayoutProps {
  children: React.ReactNode,
  headerProps: {
    headerText: string;
    paragraph: string;
    linkText: string;
    badge?: string;
    badgeStatus?: number;
    badgeClass?: string;
    href: string;
  }
}
const DashboardLayout = ({ children, headerProps }: DashboardLayoutProps) => {
  return (
    <section className='w-full flex flex-col gap-10'>
      <DashboardHeader badge={headerProps.badge} badgeStatus={headerProps.badgeStatus} badgeClass={headerProps.badgeClass} headerText={headerProps.headerText} paragraph={headerProps.paragraph} linkText={headerProps.linkText} href={headerProps.href} />
      {children}
    </section>
  )
}

export default DashboardLayout