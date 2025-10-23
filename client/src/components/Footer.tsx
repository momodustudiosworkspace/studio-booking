"use client";
import { BaseIcons } from "@/assets/icons/BaseIcons";
import Link from "next/link";
import React from "react";
import { Field, Form, Formik } from "formik";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import Button from "./ui/Button";
import { FooterIcons } from "@/assets/icons/footer/FooterIcons";

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
    <div className='relative bg-black sm:px-0 px-5 py-10 text-white'>
      <div className="relative flex flex-col items-center">
        <div className='my-4 sm:mb-20 mb-5 flex flex-col items-center justify-center'>
          <Link href={"/"} className="sm:hidden flex">
            {" "}
            <BaseIcons value='logo-white' />
          </Link>
          <Link href={"/"} className="hidden sm:flex">
            {" "}
            <FooterIcons value='desktop-logo-white' />
          </Link>
          <p className='font-semibold text-white'>Impossible is nothing</p>
        </div>
        <div className="w-full sm:mb-20 flex justify-center">
          <div className='flex sm:flex-row sm:w-[1440px] flex-col sm:justify-between gap-8 py-3'>
            {FOOTER_LINKS?.map((link, key) => (
              <div key={key} className="w-full sm:w-[320px]">
                <h3 className='mb-4 text-lg font-semibold text-white/80 capitalize'>
                  {link?.title}
                </h3>

                <ul className='flex flex-col gap-4'>
                  {link?.links?.map((sublink, key) => (
                    <li key={key} className={`sm:text-[16px] text-sm font-medium`}>
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


        {/* Mobile footer form  */}
        <div className='mt-3 mb-20 sm:hidden flex'>
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

        {/* Desktop footer form  */}
        <div className='absolute right-[230px] bottom-40 hidden sm:flex'>
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

        <div className="flex sm:flex-row flex-col w-full border-t-[1px] border-gray-800 sm:justify-between items-center sm:w-[1440px] sm:pt-5">
          <div>
            <p className='w-full  py-4 sm:text-[16px] text-xs text-[#AAAAAA]'>
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
    </div>
  );
};

export default Footer;
