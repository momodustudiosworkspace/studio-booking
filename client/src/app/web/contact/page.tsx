// import { useEffect, useState } from "react";

import { BaseIcons } from "@/assets/icons/BaseIcons";
import ContactForm from "@/components/contact/ContactForm";
import Faqs from "@/components/Faqs";
import SectionHeader from "@/components/SectionHeader";
import Link from "next/link";


export default function Page() {


    return (
        <section className="flex min-h-screen justify-center pt-5 w-full">
            <section className="w-full">

                <div className="px-5 py-10 flex flex-col gap-10">
                    {/* hero  */}
                    <h1 className="font-extrabold text-[34px] text-left w-full mb-6">Contact Us</h1>

                    <SectionHeader headerText="we are always ready to help you and answer your questions" paragraphText="Lorem ipsum dolor sit amet consectetur. Pharetra id ultricies amet non. Turpis amet facilisis sem sit. Elementum egestas pretium vitae quis justo." />
                    {/* call center  */}
                    <div className="mt-10">
                        <div className="mb-8">
                            <span className="text-[#414141]">call center</span>
                            <p className="text-[19px] font-medium">09169305000</p>
                            <p className="text-[19px] font-medium">09169305000</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-[#414141]">Email address</span>
                            <p className="text-[19px] font-medium">admin@momodustudios.com</p>
                            <p className="text-[19px] font-medium">scoails@momodustudios.com</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-[#414141]">Social network</span>
                            <div className='flex items-center gap-4 mt-2'>
                                <Link href={'/'} className='h-10 w-10 bg-[#F3F3F3] rounded-full flex items-center justify-center'>
                                    <BaseIcons value='instagram-black' />
                                </Link>
                                <Link href={'/'} className='h-10 w-10 bg-[#F3F3F3] rounded-full flex items-center justify-center'>
                                    <BaseIcons value='x-black' />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ContactForm />
                    <p>{`{{Google map API}}`}</p>
                    <iframe
                        width="600"
                        height="450"

                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAF8FFGQtsWR23-L-Qs6AdnH6sMDeZ8BLs&q=Space+Needle,Seattle+WA">
                    </iframe>
                    <Faqs/>
                </div>

            </section>
        </section>
    );
}
