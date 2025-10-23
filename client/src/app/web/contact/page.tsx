// import { useEffect, useState } from "react";

import { BaseIcons } from "@/assets/icons/BaseIcons";
import ContactForm from "@/components/contact/ContactForm";
import Faqs from "@/components/Faqs";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

export default function Page() {
  return (
    <section className='flex min-h-screen w-full justify-center sm:pt-5'>
      <section className='w-full sm:w-[1440px]'>
        <div className='flex flex-col gap-10 sm:px-0 px-5 py-10'>
          <div className="flex sm:flex-row flex-col items-end sm:justify-between">
            <div>
              {/* hero  */}
              <h1 className='mb-6 w-full text-left sm:text-[120px] text-[34px] font-extrabold'>
                Contact Us
              </h1>

              <div className="w-full sm:w-[560px]">
                <SectionHeader
                  headerText='we are always ready to help you and answer your questions'
                  paragraphText='Lorem ipsum dolor sit amet consectetur. Pharetra id ultricies amet non. Turpis amet facilisis sem sit. Elementum egestas pretium vitae quis justo.'
                />
              </div>
              {/* call center  */}
              <div className='mt-10'>
                <div className="flex flex-col sm:flex-row sm:gap-20">
                  <div className='mb-8'>
                    <span className='text-[#414141]'>call center</span>
                    <p className='text-[19px] font-medium'>09169305000</p>
                    <p className='text-[19px] font-medium'>09169305000</p>
                  </div>
                  <div className='mb-8'>
                    <span className='text-[#414141]'>Email address</span>
                    <p className='text-[19px] font-medium'>admin@momodustudios.com</p>
                    <p className='text-[19px] font-medium'>
                      scoails@momodustudios.com
                    </p>
                  </div>
                </div>
                <div className='mb-8'>
                  <span className='text-[#414141]'>Social network</span>
                  <div className='mt-2 flex items-center gap-4'>
                    <Link
                      href={"/"}
                      className='flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F3]'
                    >
                      <BaseIcons value='instagram-black' />
                    </Link>
                    <Link
                      href={"/"}
                      className='flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F3F3]'
                    >
                      <BaseIcons value='x-black' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:w-[596px] w-full">
              <ContactForm />
            </div>
          </div>
          <p>{`{{Google map API}}`}</p>
          {/* <iframe
            width='600'
            height='450'
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAF8FFGQtsWR23-L-Qs6AdnH6sMDeZ8BLs&q=Space+Needle,Seattle+WA'
          ></iframe> */}
          <Faqs />
        </div>
      </section>
    </section>
  );
}
