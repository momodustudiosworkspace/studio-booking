"use client"
import { BaseIcons } from '@/assets/icons/BaseIcons'
import Link from 'next/link'
import React from 'react'
import { Field, Form, Formik } from 'formik'
import RedirectArrowWhite from '@/assets/icons/RedirectArrowWhite'
import Button from './ui/Button'

const Footer = (): React.JSX.Element => {

  const FOOTER_LINKS = [

    {
      title: "Quick links",
      links: [
        {
          text: 'home',
          href: '/web',
        },
        {
          text: 'portfolio',
          href: '/web/portfolio/2',
        },
        {
          text: 'about us',
          href: '/web',
        },
        {
          text: 'Contact us',
          href: '/web/contact',
        },
      ]
    },
    {
      title: "contacts",
      links: [
        {
          text: '15 Adeyemi Street, Victoria Island, Lagos, Nigeria',
          href: '',
        },
        {
          text: 'admin@momodustudios.com',
          href: '',
        },
        {
          text: '+234 800 123 4567',
          // call: true,
          href: '',
        },
      ]
    },
    {
      title: "stay connected",
      links: [
        {
          text: 'Get photography tips, studio updates, and exclusive offers straight to your inbox',
          href: '',
        },

      ]
    }
  ]
  return (
    <div className='bg-black text-white px-5 py-10'>

      <div>
        <div className='flex justify-center flex-col items-center my-4 mb-5'>
          <Link href={'/'}> <BaseIcons value='logo-white' /></Link>
          <p className='text-white font-semibold'>Impossible is nothing</p>
        </div>
        <div>
          <div className='flex flex-col gap-8 py-3'>
            {FOOTER_LINKS?.map((link, key) => (
              <div key={key}>
                <h3 className='font-semibold text-white/80 capitalize mb-4 text-lg'>{link?.title}</h3>

                <ul className='flex flex-col gap-4'>
                  {link?.links?.map((sublink, key) => (
                    <li key={key} className={`text-sm font-medium`}>
                      {sublink?.href != '' ? <Link href={sublink.href} className='font-semibold capitalize'>{sublink?.text}</Link> : sublink?.text}

                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-3 mb-20'>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={values => {
              console.log("email: ", values?.email);

            }}>
            {({ values, }) => (
              <Form>

                <div className='rounded-full bg-neutral-700 px-2 h-[50px] flex justify-between items-center'>
                  <Field type="email" name="email" placeholder="Email address" className='outline-none text-[16px] pl-4' />
                  <Button text='Subscribe' size='sm' onClick={() => console.log(values.email)} icon={< RedirectArrowWhite />}
                    iconPosition="right" />

                </div>

              </Form>
            )}

          </Formik>
        </div>

        <div>
          <p className='text-[#AAAAAA] text-xs border-t-[1px] border-gray-800 w-full py-4'>© 2025 momodu studios. All rights reserved.</p>
        </div>

        <div className='flex items-center gap-6'>
          <Link href={'/'} className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
            <BaseIcons value='instagram-black' />
          </Link>
          <Link href={'/'} className='h-10 w-10 bg-white rounded-full flex items-center justify-center'>
            <BaseIcons value='x-black' />
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Footer