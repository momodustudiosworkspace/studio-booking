"use client";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import Link from "next/link";
import React from "react";
import { Field, Form, Formik } from "formik";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import Button from "./ui/Button";

const Footer = (): React.JSX.Element => {
  const FOOTER_LINKS = [
    {
      title: "Quick links",
      links: [
        {
          text: "home",
          href: "/web",
        },
        {
          text: "portfolio",
          href: "/web/portfolio/2",
        },
        {
          text: "about us",
          href: "/web",
        },
        {
          text: "Contact us",
          href: "/web/contact",
        },
      ],
    },
    {
      title: "contacts",
      links: [
        {
          text: "15 Adeyemi Street, Victoria Island, Lagos, Nigeria",
          href: "",
        },
        {
          text: "admin@momodustudios.com",
          href: "",
        },
        {
          text: "+234 800 123 4567",
          // call: true,
          href: "",
        },
      ],
    },
    {
      title: "stay connected",
      links: [
        {
          text: "Get photography tips, studio updates, and exclusive offers straight to your inbox",
          href: "",
        },
      ],
    },
  ];
  return (
    <div className='bg-black px-5 py-10 text-white'>
      <div>
        <div className='my-4 mb-5 flex flex-col items-center justify-center'>
          <Link href={"/"}>
            {" "}
            <BaseIcons value='logo-white' />
          </Link>
          <p className='font-semibold text-white'>Impossible is nothing</p>
        </div>
        <div>
          <div className='flex flex-col gap-8 py-3'>
            {FOOTER_LINKS?.map((link, key) => (
              <div key={key}>
                <h3 className='mb-4 text-lg font-semibold text-white/80 capitalize'>
                  {link?.title}
                </h3>

                <ul className='flex flex-col gap-4'>
                  {link?.links?.map((sublink, key) => (
                    <li key={key} className={`text-sm font-medium`}>
                      {sublink?.href != "" ? (
                        <Link
                          href={sublink.href}
                          className='font-semibold capitalize'
                        >
                          {sublink?.text}
                        </Link>
                      ) : (
                        sublink?.text
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-3 mb-20'>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={values => {
              console.log("email: ", values?.email);
            }}
          >
            {({ values }) => (
              <Form>
                <div className='flex h-[50px] items-center justify-between rounded-full bg-neutral-700 px-2'>
                  <Field
                    type='email'
                    name='email'
                    placeholder='Email address'
                    className='pl-4 text-[16px] outline-none'
                  />
                  <Button
                    text='Subscribe'
                    size='sm'
                    onClick={() => console.log(values.email)}
                    icon={<RedirectArrowWhite />}
                    iconPosition='right'
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div>
          <p className='w-full border-t-[1px] border-gray-800 py-4 text-xs text-[#AAAAAA]'>
            © 2025 momodu studios. All rights reserved.
          </p>
        </div>

        <div className='flex items-center gap-6'>
          <Link
            href={"/"}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white'
          >
            <BaseIcons value='instagram-black' />
          </Link>
          <Link
            href={"/"}
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white'
          >
            <BaseIcons value='x-black' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
