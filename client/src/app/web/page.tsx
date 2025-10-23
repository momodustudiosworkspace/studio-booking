// import { useEffect, useState } from "react";

import AnytimeCapture from "@/assets/AnytimeCapture";
import CopyRight from "@/assets/icons/CopyRight";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import CardTwo from "@/components/cards/CardTwo";
import Faqs from "@/components/Faqs";
import Portfolio from "@/components/Portfolio";
import SectionHeader from "@/components/SectionHeader";
import Statistics from "@/components/Statistics";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";

export default function Page() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message))
  //     .catch((err) => console.error(err));
  // }, []);

  const BOOK_SESSION = [
    {
      title: "Book in minutes",
      description:
        "Choose your package, select a date, and book your session in just a few clicks.",
    },
    {
      title: "have your session",
      description:
        "Our professional photographers will capture your moments with creativity and precision.",
    },
    {
      title: "All Your Photos, One Place",
      description:
        "Easily view, download, and share your high-resolution images from your personal online gallery.",
    },
    {
      title: "Seamless Payments",
      description:
        "Pay securely online with multiple payment options for your convenience.",
    },
  ];

  const TESTIMONIES = [
    {
      title:
        "Momodu Studios didn’t just take pictures — they told our love story",
      subtitle: "newly wedded couples",
      description: "newly wedded couples",
      author: "amaka & ceasar",
      image: "",
    },
  ];

  return (
    <section className='flex min-h-screen w-full justify-center'>
      <section className='w-full flex justify-center items-center flex-col'>
        <div className="sm:w-[1440px] w-full flex flex-col">
          {/* Hero  */}
          <div className='mb-10 flex flex-col gap-6 sm:px-0 px-5'>
            <div className='flex items-start gap-3'>
              <h1 className='font-montserrat sm:text-[120px] text-[30px] font-extrabold uppercase'>
                Momodu studios
              </h1>
              <CopyRight />
            </div>
            <div className="flex sm:flex-row flex-col">

              <div>
                <p className='text-[18px] mb-10 sm:mb-0 w-full sm:w-[433px]'>
                  From booking to final delivery — Momodu Studios brings the entire
                  photography experience online.
                </p>
              </div>
              <div className='flex w-full justify-end sm:h-[48px] gap-4'>
                <LinkButton
                  href='/bookings'
                  size='md'
                  text='Book your session'
                  icon={<RedirectArrowWhite />}
                  iconPosition='right'
                  className='w-auto shrink-0'
                />

                <LinkButton
                  href='/web/portfolio'
                  variant='outline'
                  size='sm'
                  text='view portfolio'
                  className='px-3'
                />
              </div>
            </div>
          </div>

          {/* Grid of images mobile */}
          <div className='relative mb-30 flex sm:hidden items-center justify-between'>
            <Image
              src={"/home/hero-section-one.png"}
              alt='momodu studios'
              width={200}
              height={100}
            />
            <Image
              src={"/home/hero-section-two.png"}
              alt='momodu studios'
              width={178}
              height={100}
            />
            <div className='absolute right-5 -bottom-20'>
              <AnytimeCapture />
            </div>
          </div>

          {/* Gird of images desktop  */}
          <div className='relative mb-30 hidden sm:flex items-center justify-between'>
            <Image
              src={"/home/hero-image-three.jpg"}
              alt='momodu studios'
              width={471}
              height={100}
              // priority
              quality={100}
              loading="lazy"
            />
            <Image
              src={"/home/hero-image-one.jpg"}
              alt='momodu studios'
              width={471}
              height={100}
              // priority
              quality={100}
              loading="lazy"
            />
            <Image
              src={"/home/hero-image-two.jpg"}
              alt='momodu studios'
              width={471}
              height={100}
              // priority
              quality={100}
              loading="lazy"
            />
            <div className='absolute sm:right-20 right-5 -bottom-20 sm:-bottom-[130px]'>
              <AnytimeCapture />
            </div>
          </div>

          {/* About us  */}
          <div className='sm:mb-20 mb-10 flex sm:mt-20 sm:flex-row flex-col sm:justify-between gap-6 px-5'>
            <div className="sm:w-[415px]">
              <SectionHeader
                badgeText='About us'
                badgeWidth='w-[150px]'
                headerText='More Than Photos — We Capture Your Story'
              />
            </div>
            <div className="flex sm:w-[697px] flex-col gap-6 sm:text-[16px] text-[14px]">
              <p>
                At Momodu Studios, we believe photography isn’t just about pressing
                a shutter — it’s about preserving moments that matter.For over [X
                years], we’ve helped individuals, couples, and brands tell their
                stories through timeless, authentic, and breathtaking imagery.
              </p>

              <p>
                Now, we’ve taken our craft fully online — making the entire process
                effortless for you. From booking your shoot to making payments,
                reviewing your pictures, and downloading your final images,
                everything happens in one secure, beautiful platform.
              </p>

              <p>
                Whether it’s the warmth of a family portrait, the elegance of a
                wedding, the detail in a product shoot, or the vibrance of an event,
                we bring creativity, precision, and heart to every frame..
              </p></ div>
          </div>

          {/* Statictics counts  */}
          <div className='mb-14'>
            <Statistics />
          </div>
        </div>

        {/* Portfolio  */}
        <div className='bg-black w-full px-5 py-10 text-white flex items-center flex-col '>
          <Portfolio />
          <div className='mt-10 grid sm:grid-cols-4 grid-cols-1 sm:gap-x-20 gap-8 pr-24 pl-5 w-full sm:w-[1440px]'>
            {BOOK_SESSION.map((book, key) => (
              <div key={key} className='flex flex-col gap-2'>
                <h3 className='text-[16px] font-semibold capitalize'>
                  {book.title}
                </h3>
                <p className='sm:text-[16px] text-xs text-[#AAAAAA]'>{book.description}</p>
              </div>
            ))}

            <div>
              <LinkButton
                href='/bookings'
                size='md'
                variant='white'
                text='Book your session'
                icon={<RedirectArrowWhite />}
                iconPosition='right'
                className='w-[204px]'
              />
            </div>
          </div>
        </div>

        {/* Testimonials  */}
        <div className='flex flex-col items-center sm:px-0 w-full px-5 py-10'>
          <div className="flex flex-col gap-8 w-full sm:w-[1440px]">
            {/* mobile  */}
            <div className="sm:hidden flex flex-col">
              <SectionHeader
                badgeText='Testimonials'
                badgeWidth='w-[45%] sm:w-[170px]'
                headerText='Smiles, Stories, and Stunning Shots'

              />
              <p className="w-full">Our clients trust us with their most important moments — here’s what they have to say.</p>
            </div>

            {/* Desktop  */}
            <div className="hidden sm:flex justify-between items-center w-full">
              <div className="w-[300px]">
                <SectionHeader
                  badgeText='Testimonials'
                  badgeWidth='w-[45%] sm:w-[170px]'
                  headerText='Smiles, Stories, and Stunning Shots'

                // paragraphText=''
                />
              </div>
              <p className="w-[476px] text-[16px]">Our clients trust us with their most important moments — here’s what they have to say.</p>
            </div>
            {TESTIMONIES.map((testimony, key) => {
              return (
                <CardTwo
                  key={key}
                  title={testimony.title}
                  // subtitle={testimony.subtitle}
                  author={testimony.author}
                  // image={testimony.image}
                  // rating={4}
                  description={testimony.description}
                />
              );
            })}
          </div>
        </div>

        {/* Your next favorite photo is just one click away */}
        <div className='mb-20 w-full sm:w-[1440px] flex flex-col items-center justify-between'>
          <div className='sm:hidden flex w-full justify-start'>
            {" "}
            <Image
              src={"/home/next-photo-studio.jpg"}
              width={200}
              height={100}
              quality={100}
              loading='lazy'
              alt=''
            />
          </div>
          <div className='sm:flex hidden w-full justify-start'>
            {" "}
            <Image
              src={"/home/desktop-photo-studios.jpg"}
              width={500}
              height={100}
              quality={100}
              loading='lazy'
              alt=''
            />
          </div>
          <div className='mt-8 mb-8 flex items-center w-full flex-col gap-5 pr-10 pl-5'>
            <div className="w-full sm:w-[600px] flex justify-center">
              <SectionHeader
                badgeWidth='w-[100px]'
                headerText='Your Next Favorite Photo Is Just One Click Away'
                paragraphText='Book your shoot today and enjoy a fully online experience — from scheduling to final image delivery.'
              />
            </div>
            <div>
              {" "}
              <LinkButton
                href='/bookings'
                size='md'
                className='w-auto'
                text='Book your session'
                icon={<RedirectArrowWhite />}
                iconPosition='right'
              />
            </div>
          </div>
          <div className='flex sm:hidden w-full justify-end'>
            {" "}
            <Image
              src={"/home/next-photo-studio-shoot.jpg"}
              alt=''
              width={280}
              height={100}
              quality={100}
              loading='lazy'
            />
          </div>
          <div className='sm:flex w-full hidden justify-end'>
            {" "}
            <Image
              src={"/home/next-photo-studio-shoot.jpg"}
              alt=''
              width={480}
              height={100}
              quality={100}
              loading='lazy'
            />
          </div>
        </div>

        {/* FAQs  */}
        <div className='px-5 w-full sm:w-[1440px]'>
          <div className='mt-10 sm:mb-20 mb-10 '>
            <Faqs />
          </div>
        </div>
      </section>
    </section>
  );
}
