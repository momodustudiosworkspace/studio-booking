// import { useEffect, useState } from "react";

import { BaseIcons } from "@/assets/icons/BaseIcons";
import ContactForm from "@/components/contact/ContactForm";
import Faqs from "@/components/Faqs";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

export default function Page() {
  return (
    <section className='flex min-h-screen w-full justify-center pt-5'>
      <section className='w-full'>
        <div className='flex flex-col gap-10 px-5 py-10'>
          {/* hero  */}
          <h1 className='mb-6 w-full text-left text-[34px] font-extrabold'>
            Contact Us
          </h1>

          <SectionHeader
            headerText='we are always ready to help you and answer your questions'
            paragraphText='Lorem ipsum dolor sit amet consectetur. Pharetra id ultricies amet non. Turpis amet facilisis sem sit. Elementum egestas pretium vitae quis justo.'
          />
          {/* call center  */}
          <div className='mt-10'>
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
          <ContactForm />
          <p>{`{{Google map API}}`}</p>
          <iframe
            width='600'
            height='450'
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAF8FFGQtsWR23-L-Qs6AdnH6sMDeZ8BLs&q=Space+Needle,Seattle+WA'
          ></iframe>
          <Faqs />
        </div>
      </section>
    </section>
  );
}
