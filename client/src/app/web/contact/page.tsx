// import { useEffect, useState } from "react";

import { BaseIcons } from "@/assets/icons/BaseIcons";
import ContactForm from "@/components/contact/ContactForm";
import Faqs from "@/components/Faqs";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";

export default function Page() {
  return (
    <section className='flex min-h-screen w-full bg-black text-white justify-center pt-40 '>
      <section className='w-full mx-auto max-w-7xl lg:px-8'>
        <div className='flex flex-col gap-10 px-5 py-10 sm:px-0'>
          <div className='flex flex-col items-end sm:flex-row sm:justify-between'>
            <div>
              {/* hero  */}
              <h1 className='mb-6 w-full text-left text-[24px] font-extrabold sm:text-[90px]'>
                Contact Us
              </h1>

              <div className='w-full sm:w-[560px]'>
                <SectionHeader
                  headerText='Get in touch with us for all your studio booking needs'
                  paragraphText='Have questions about our services, need to book a session, or want to collaborate? Our team is here to help. Reach out via phone, email, or our social channels, and we&apos;ll get back to you promptly to ensure your experience is seamless and enjoyable.'
                />
              </div>
              {/* call center  */}
              <div className='mt-10'>
                <div className='flex flex-col sm:flex-row sm:gap-20'>
                  <div className='mb-8'>
                    <span className='text-gray-500'>call center</span>
                    <p className='text-[16px] font-medium'>+234 816 524 7800</p>
                    <p className='text-[16px] font-medium'>+234 816 524 7800</p>
                  </div>
                  <div className='mb-8'>
                    <span className='text-gray-500'>Email address</span>
                    <p className='text-[16px] font-medium'>
                      admin@momodustudios.com
                    </p>
                    <p className='text-[16px] font-medium'>
                      socials@momodustudios.com
                    </p>
                  </div>
                </div>
                <div className='mb-8'>
                  <span className='text-gray-500'>Social network</span>
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
            <div className='w-full sm:w-[496px]'>
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
