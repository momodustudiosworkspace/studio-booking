// import { useEffect, useState } from "react";

import AnytimeCapture from "@/assets/AnytimeCapture";
import CopyRight from "@/assets/icons/CopyRight";
import RedirectArrowBlackSolid from "@/assets/icons/RedirectArrowBlackSolid";
import RedirectArrowWhite from "@/assets/icons/RedirectArrowWhite";
import CardTwo from "@/components/cards/CardTwo";
import Portfolio from "@/components/Portfolio";
import SectionHeader from "@/components/SectionHeader";
import Statistics from "@/components/Statistics";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";

export default function Home() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/hello")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message))
  //     .catch((err) => console.error(err));
  // }, []);

  const BOOK_SESSION=[
    {
      title:"Book in minutes",
      description:"Choose your package, select a date, and book your session in just a few clicks."
    },
    {
      title:"have your session",
      description:"Our professional photographers will capture your moments with creativity and precision."
    },
    {
      title:"All Your Photos, One Place",
      description:"Easily view, download, and share your high-resolution images from your personal online gallery."
    },
    {
      title:"Seamless Payments",
      description:"Pay securely online with multiple payment options for your convenience."
    },
  ]

  const TESTIMONIES=[
    {
      title:'Momodu Studios didn’t just take pictures — they told our love story',
      subtitle:'newly wedded couples',
      description:'',
      author:'amaka & ceasar',
      image:'',
    }
  ]

  return (
    <main className="flex min-h-screen justify-center pt-14 w-full">
      <section className="w-full">
        <div className="flex px-5 flex-col gap-6 mb-10">
          <div className="flex items-start gap-3">
            <h1 className="text-[36px] uppercase font-bold font-sans">
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
              href="/book-session"
              size="lg"
              text="Book your session"
              icon={<RedirectArrowWhite />}
              iconPosition="right"
            />

            <LinkButton
              href="/book-session"
              variant="outline"
              size="lg"
              text="view portfolio"
            />
          </div>
        </div>
        <div className="relative flex items-center justify-between mb-30">
          <Image
            src={"/home/hero-section-one.png"}
            alt="momodu studios"
            width={218}
            height={100}
          />
          <Image
            src={"/home/hero-section-two.png"}
            alt="momodu studios"
            width={195}
            height={100}
          />
          <div className="absolute right-5 -bottom-20">
            <AnytimeCapture />
          </div>
        </div>

        <div className="px-5 flex flex-col gap-6 mb-10">
          <SectionHeader
            badgeText="About us"
            badgeWidth="w-[35%]"
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
        <div className="mb-14">
          <Statistics />
        </div>
        <div className="bg-black px-5 py-10 text-white">
          <Portfolio />
          <div
          className="mt-10 flex flex-col gap-8 pr-24 pl-5">
            {BOOK_SESSION.map((book, key)=>(
              <div key={key} className="flex flex-col gap-2">
                <h3 className="text-[16px] font-semibold capitalize">{book.title}</h3>
                <p className="text-[#AAAAAA] text-xs">{book.description}</p>
              </div>
            ))}

            
          <LinkButton href="/" text="Book your session" variant="white"  className="w-[185px]" icon={<RedirectArrowBlackSolid/>} iconPosition="right"/>
          </div>
        </div>
        <div className="px-5 py-10">
           <SectionHeader
            badgeText="Testimonials"
            badgeWidth="w-[45%]"
            headerText="Smiles, Stories, and Stunning Shots"
            paragraphText="Our clients trust us with their most important moments — here’s what they have to say."
          />
          {TESTIMONIES.map((testimony, key)=>{
                return <CardTwo key={key} title={testimony.title}
                  subtitle={testimony.subtitle}
                  author={testimony.author}
                  image={testimony.image} rating = {4}/>
                  
          })}
        </div>
        <p>Jemila hi</p>
      </section>
      
    </main>
  );
}
