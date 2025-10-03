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
      description: "Choose your package, select a date, and book your session in just a few clicks."
    },
    {
      title: "have your session",
      description: "Our professional photographers will capture your moments with creativity and precision."
    },
    {
      title: "All Your Photos, One Place",
      description: "Easily view, download, and share your high-resolution images from your personal online gallery."
    },
    {
      title: "Seamless Payments",
      description: "Pay securely online with multiple payment options for your convenience."
    },
  ]

  const TESTIMONIES = [
    {
      title: 'Momodu Studios didn’t just take pictures — they told our love story',
      subtitle: 'newly wedded couples',
      description: 'newly wedded couples',
      author: 'amaka & ceasar',
      image: '',
    }
  ]

  return (
    <section className="flex min-h-screen justify-center w-full">
      <section className="w-full">

        {/* Hero  */}
        <div className="flex px-5 flex-col gap-6 mb-10">
          <div className="flex items-start gap-3">
            <h1 className="text-[30px] uppercase font-extrabold font-montserrat">
              Momodu studios
            </h1>
            <CopyRight />
          </div>
          <div>
            <p className="text-[18px]">
              From booking to final delivery — Momodu Studios brings the entire
              photography experience online.
            </p>
          </div>
          <div className="flex w-full justify-between">
            <LinkButton
              href="/bookings"
              size="md"
              text="Book your session"
              icon={<RedirectArrowWhite />}
              iconPosition="right"
              className="w-[200px]"
            />

            <LinkButton
              href="/web/portfolio/1"
              variant="outline"
              size="sm"
              text="view portfolio"
              className="px-3"
            />
          </div>
        </div>
        <div className="relative flex items-center justify-between mb-30">
          <Image
            src={"/home/hero-section-one.png"}
            alt="momodu studios"
            width={200}
            height={100}
          />
          <Image
            src={"/home/hero-section-two.png"}
            alt="momodu studios"
            width={178}
            height={100}
          />
          <div className="absolute right-5 -bottom-20">
            <AnytimeCapture />
          </div>
        </div>

        {/* About us  */}
        <div className="px-5 flex flex-col gap-6 mb-10">
          <SectionHeader
            badgeText="About us"
            badgeWidth="w-[150px]"
            headerText="More Than Photos — We Capture Your Story"
          />
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

          <p>Whether it’s the warmth of a family portrait, the elegance of a wedding, the detail in a product shoot, or the vibrance of an event, we bring creativity, precision, and heart to every frame..</p>
        </div>

        {/* Statictics counts  */}
        <div className="mb-14">
          <Statistics />
        </div>


        {/* Portfolio  */}
        <div className="bg-black px-5 py-10 text-white">
          <Portfolio />
          <div
            className="mt-10 flex flex-col gap-8 pr-24 pl-5">
            {BOOK_SESSION.map((book, key) => (
              <div key={key} className="flex flex-col gap-2">
                <h3 className="text-[16px] font-semibold capitalize">{book.title}</h3>
                <p className="text-[#AAAAAA] text-xs">{book.description}</p>
              </div>
            ))}


            <LinkButton
              href="/bookings"
              size="md"
              variant="white"
              className="w-[215px]"
              text="Book your session"
              icon={<RedirectArrowWhite />}
              iconPosition="right"
            />
          </div>
        </div>

        {/* Testimonials  */}
        <div className="px-5 py-10 flex flex-col gap-8">
          <SectionHeader
            badgeText="Testimonials"
            badgeWidth="w-[45%]"
            headerText="Smiles, Stories, and Stunning Shots"
            paragraphText="Our clients trust us with their most important moments — here’s what they have to say."
          />
          {TESTIMONIES.map((testimony, key) => {
            return <CardTwo key={key} title={testimony.title}
              subtitle={testimony.subtitle}
              author={testimony.author}
              image={testimony.image} rating={4} description={
                testimony.description
              } />

          })}
        </div>

        {/* Your next favorite photo is just one click away */}
        <div className="mb-20 flex flex-col items-center justify-between">
          <div className="w-full flex justify-start">  <Image src={'/home/next-photo-studio.jpg'} width={200} height={100} quality={100} loading="lazy" alt="" /></div>
          <div className=" flex flex-col w-full pl-5 pr-10 gap-5 mt-8 mb-8">
            <SectionHeader

              badgeWidth="w-[100px]"
              headerText="Your Next Favorite Photo Is Just One Click Away"
              paragraphText="Book your shoot today and enjoy a fully online experience — from scheduling to final image delivery."
            />
            <LinkButton
              href="/bookings"
              size="md"
              className="w-[200px]"
              text="Book your session"
              icon={<RedirectArrowWhite />}
              iconPosition="right"
            />
          </div>
          <div className="w-full flex justify-end"> <Image src={'/home/next-photo-studio-shoot.jpg'} alt="" width={280} height={100} quality={100} loading="lazy" /></div>
        </div>

        {/* FAQs  */}
        <div className="px-5">


          <div className="mt-10 mb-10">
            <Faqs />
          </div>

        </div>

      </section>

    </section>
  );
}
